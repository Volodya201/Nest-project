import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "src/users/entities/user.entity"
import { HttpException, HttpStatus } from "@nestjs/common"
import { LoginCommand } from "../commands/login.command"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { GetUserByEmailQuery } from "src/users/queries/getUserByEmail.query"
import { CreateUserCommand } from "src/users/commands/createUser.command"
import { v4 as uuidv4 } from 'uuid'
import transporter from "../../../config/nodemailer"
import { GenerateTokensCommand } from "src/tokens/commands/generateTokens.command"
import { LoginDto } from "../dto/login.dto"
//import { TokenService } from "src/tokens/tokens.service"



@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor( 
        @InjectModel(User) private readonly userModel:typeof User,
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(command: LoginCommand) {
        const userDTO = {
            id: command.user.id,
            email: command.user.email,
            username: command.user.username
        }

        const tokens:LoginDto = await this.commandBus.execute(new GenerateTokensCommand(userDTO))

        return tokens
    }
}