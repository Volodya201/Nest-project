import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "src/users/entities/user.entity"
import { HttpException, HttpStatus } from "@nestjs/common"
import { LoginCommand } from "../commands/login.command"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { GetUserByEmailQuery } from "src/users/queries/getUserByEmail.query"
import { CreateUserCommand } from "src/users/commands/createUser.command"
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import transporter from "../../../config/nodemailer"
//import { TokenService } from "src/tokens/tokens.service"



@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor( 
        @InjectModel(User) private readonly userModel:typeof User,
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        //private readonly tokenService: TokenService
    ) {}

    async execute(command: LoginCommand) {1
        try {
            
            const { email, password } = command.user

            const candidate = await this.queryBus.execute(new GetUserByEmailQuery(email)) 

            if (!candidate.id) throw new Error("Пользователя с таким имейлом не существует!")

            const isCompare = await bcrypt.compare(password, candidate.password)

            if (!isCompare || !candidate.isActivated) throw new Error("Имейл или пароль неверен")

            const userDTO = {
                id: candidate.id,
                email: candidate.email,
                username: candidate.username
            }
        
            const response = ""//this.tokenService.generateTokens(userDTO)
        
            return response
            //send response
        } catch (error) {
            throw new HttpException("Пользователь с таким имейлом уже соществует", 409)
        }
        
    }
}