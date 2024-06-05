import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "src/users/entities/user.entity"
import { HttpException, HttpStatus } from "@nestjs/common"
import { RefreshCommand } from "../commands/refresh.command"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { GetUserByEmailQuery } from "src/users/queries/getUserByEmail.query"
import { CreateUserCommand } from "src/users/commands/createUser.command"
import { v4 as uuidv4 } from 'uuid'
import transporter from "../../../config/nodemailer"
import { GenerateTokensCommand } from "src/tokens/commands/generateTokens.command"
import { LoginDto } from "../dto/login.dto"
import { ValidateRefreshTokenCommand } from "src/tokens/commands/ValidateRefreshToken.command"



@CommandHandler(RefreshCommand)
export class RefreshHandler implements ICommandHandler<RefreshCommand> {
    constructor( 
        @InjectModel(User) private readonly userModel:typeof User,
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(command: RefreshCommand) {
        const {id, email, username} = await this.commandBus.execute(new ValidateRefreshTokenCommand(command.refreshToken))

        if (!id) return false

        const tokens = await this.commandBus.execute(new GenerateTokensCommand({id, email, username}))

        return tokens
    }
}