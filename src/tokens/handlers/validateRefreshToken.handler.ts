import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { ValidateRefreshTokenCommand } from "../commands/ValidateRefreshToken.command"
import * as JWT from 'jsonwebtoken'


@CommandHandler(ValidateRefreshTokenCommand)
export class ValidateRefreshTokenHandler implements ICommandHandler<ValidateRefreshTokenCommand> {

    async execute(command: ValidateRefreshTokenCommand) {
        try {
            return JWT.verify(command.refreshToken, "refreshToken")
        } catch (error) {
            return {}
        }
    }
}