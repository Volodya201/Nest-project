import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "src/users/entities/user.entity"
import { HttpException, HttpStatus } from "@nestjs/common"
import { RegisterCommand } from "../commands/register.command"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateUserCommand } from "src/users/commands/createUser.command"


@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
    constructor( 
        @InjectModel(User) private readonly userModel:typeof User,
        private readonly commandBus: CommandBus,
        //private TokenService: TokenService
    ) {}

    async execute(command: RegisterCommand) {

        const { email, password, username, activationKey } = command.user

        const createdUser = await this.commandBus.execute(new CreateUserCommand({email, username, password, activationKey}))

        const userDTO = {
            id: createdUser.id,
            email: createdUser.email,
            username: createdUser.username
        }

        return userDTO
        
    }
}