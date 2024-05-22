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


@Controller("auth")
export class AuthController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Post("/register")
    async register(@Body() user, @Res() res:Response) {
        try {

            const { email, username, password } = user

            const foundUser = await this.queryBus.execute(new GetUserByEmailQuery(email))

            if (foundUser.id) throw new Error("554314351513")

            const hashPassword = await bcrypt.hash(password, 5)
            const activationKey = uuidv4()


            const tokens = await this.commandBus.execute(new RegisterCommand({email, username, password: hashPassword, activationKey}))


            const emailOptions = {
                from: "yt.volodyago@gmail.com",
                to: email,
                subject: "Активируйте свой аккаунт в crm-flowers",
                html: `<div>
                    <h1>Просто перейдите по этой <a href="http://localhost:8080/auth/${activationKey}">ссылке</a></h1>
                </div>`
            }


            transporter.sendMail(emailOptions, (error, info) => {
                console.log("error", error)
                console.log("info", info)
                if (error) {
                    throw new Error()
                } else {
                    res.status(201)
                    res.cookie("ggg", "gggg")
                    return "123"
                }
            })

            res.status(201)
            res.cookie("ggg", "gggg")
            return "123"

            // return this.commandBus.execute(new RegisterCommand(user))
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }


    @Post("/login")
    async login(@Body() user) {
        try {
            return this.commandBus.execute(new LoginCommand(user))
            //res.cookie("refreshToken", tokens.refreshToken, {httpOnly: true})
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }

    @Patch("/activate/:key")
    async activateUser(@Param("key") key:string) {
        try {
            return this.commandBus.execute(new ActivateUserCommand(key))
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }

    @Post("/reset-password")
    async resetPassword() {

    }

}