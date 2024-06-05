import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common'
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { RegisterCommand } from './commands/register.command'
import { LoginCommand } from './commands/login.command'
import { ActivateUserCommand } from './commands/activateUser.command'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { GetUserByEmailQuery } from "src/users/queries/getUserByEmail.query"
import transporter from "../../config/nodemailer"
import { Request, Response } from 'express'
import { RemoveUserCommand } from 'src/users/commands/removeUser.command'
import { GetUserByUsernameQuery } from 'src/users/queries/getUserByUsername.query'
import { LoginDto } from "./dto/login.dto"
import { GetUserByConfirmKeyQuery } from 'src/users/queries/getUserByConfirmKey.query'
import { RefreshCommand } from './commands/refresh.command'


@Controller("auth")
export class AuthController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Post("/register")
    async register(@Body() user, @Res() response: Response) {
        let status = 201

        try {
            const { email, username, password } = user

            const foundUserByEmail = await this.queryBus.execute(new GetUserByEmailQuery(email))
            const foundUserByUsername = await this.queryBus.execute(new GetUserByUsernameQuery(username))

            if (foundUserByEmail.id || foundUserByUsername.id) {
                status = 400
                throw new Error("Пользователь с таким имейлом или именем уже существует")
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const activationKey = uuidv4()


            const userDTO = await this.commandBus.execute(new RegisterCommand({email, username, password: hashPassword, activationKey}))


            const emailOptions = {
                from: "yt.volodyago@gmail.com",
                to: email,
                subject: "Активируйте свой аккаунт в crm-flowers",
                html: `<div>
                    <h1>Просто перейдите по этой <a href="http://localhost:8080/auth/${activationKey}">ссылке</a></h1>
                </div>`
            }


            transporter.sendMail(emailOptions, async (error, info) => {
                if (error) {
                    await this.commandBus.execute(new RemoveUserCommand(userDTO.id))

                    status = 500
                    throw new Error("Не удалось отправить письмо подтверждения, попробуйте позже")
                } else {
                    response.status(status).json(userDTO)
                }
            })
        } catch (error) {          
            if (error) {
                response.status(status).json(error.message)
            } else {
                response.status(500).json("Ошибка сервера, попробуйте позже")
            }
        }
    }


    @Post("/login")
    async login(@Body() user, @Res() response: Response) {
        let status = 200

        try {
            
            const { email, password } = user

            const candidate = await this.queryBus.execute(new GetUserByEmailQuery(email))

            if (!candidate.id) {
                status = 400
                throw new Error("Пользователя с таким имейлом не существует!")
            }

            const isCompare = await bcrypt.compare(password, candidate.password)

            if (!isCompare) {
                status = 400
                throw new Error("Имейл или пароль неверен")
            } else if (!candidate.isActivated) {
                status = 400
                throw new Error("Ваш аккаунт не активирован, зайдите на почту и активируйте его и попробуйте снова")
            }

            const tokens:LoginDto = await this.commandBus.execute(new LoginCommand({
                id: candidate.id,
                username: candidate.username,
                email: candidate.email
            }))
        
            response.cookie("refreshToken", tokens.refreshToken, {httpOnly: true})
            response.status(status).json({
                accessToken: tokens.accessToken,
                userDTO: tokens.userDTO
            })

        } catch (error) {
            if (error) {
                response.status(status).json(error.message)
            } else {
                response.status(500).json("Ошибка сервера, попробуйте позже")
            }
        }
    }

    @Patch("/activate/:key")
    async activateUser(@Param("key") key:string, @Res() response: Response) {
        const activationResult:{status: number, message: string} = await this.commandBus.execute(new ActivateUserCommand(key))

        response.status(activationResult.status).json(activationResult.message)
    }

    @Post("/reset-password")
    async resetPassword(@Body() userData, @Res() response: Response) {
        try {
            const { email, newPassword } = userData

            const candidate = await this.queryBus.execute(new GetUserByEmailQuery(email))
            if (!candidate) throw new Error("Пользователя с таким имейлом не существует!")

            const confirmKey = uuidv4()

            const hashPassword = await bcrypt.hash(newPassword, 5)

            await candidate.update({newPassword: hashPassword, confirmKey})

            const emailOptions = {
                from: "yt.volodyago@gmail.com",
                to: email,
                subject: "Попытка обновления пароля в аккаунте crm-flowers",
                html: `<div>
                    <h1><a href="http://localhost:8080/confirm-password/${confirmKey}">Сcылка на подтверждение действия</a>.</h1>
                    <h1>Ваш новый пароль: ${newPassword}</h1>
                    <p style="color: red; font-weight: bold">Если это были не Вы, то ничего не делайте</p>
                </div>`
            }
            
            transporter.sendMail(emailOptions, (error, info) => {
                if (error) {
                    response.status(500).json("Произошла непредвиденная ошибка")
                } else {
                    response.status(200).json("Подтвердите действие на имейле")
                }
            })
        } catch (error) {
            response.status(404).json(error.message)
        }
        
    }


    @Post("/confirm-password/:key")
    async confirmPassword(@Param("key") key, @Res() response: Response) {
        try {
            const candidate = await this.queryBus.execute(new GetUserByConfirmKeyQuery(key))
            if (!candidate) throw new Error("Пользователь не найден")

            await candidate.update({password: candidate.newPassword, newPassword: "", confirmKey: ""})

            response.status(200).json("Пароль успешно изменен")
        } catch (error) {
            response.status(404).json(error.message)
        }
    }

    @Get("/refresh")
    async refreshTokens(@Req() request: Request, @Res() response: Response) {
        try {
            const { refreshToken } = request.cookies

            if (!refreshToken) throw new Error("")

            const tokens = await this.commandBus.execute(new RefreshCommand(refreshToken))

            if (!tokens) throw new Error("")

            console.log("tokens", tokens)

            response.cookie("refreshToken", tokens.refreshToken, {httpOnly: true})

            response.status(200).json({
                accessToken: tokens.accessToken,
                userDTO: tokens.userDTO
            })
        } catch (error) {
            response.status(400).json("Истек refresh token")
        }
    }

    @Get("/check-login")
    async checkLogin(@Res() response: Response) {
        try {
            response.status(200).json("Успешно")
        } catch (error) {
            response.status(500).json("Ошибка сервера")
        }
    }

    @Get("/logout")
    async logout(@Res() response: Response) {
        try {
            response.cookie("refreshToken", "", {httpOnly: true, maxAge: 1})
            response.status(200).json("Успешно")
        } catch (error) {
            response.status(500).json("Ошибка сервера")
        }
    }
}