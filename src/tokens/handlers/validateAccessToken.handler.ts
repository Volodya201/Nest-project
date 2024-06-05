import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { ValidateAccessTokenCommand } from "../commands/ValidateAccessToken.command"
import * as JWT from 'jsonwebtoken'


@CommandHandler(ValidateAccessTokenCommand)
export class ValidateAccessTokenHandler implements ICommandHandler<ValidateAccessTokenCommand> {

    async execute(command: ValidateAccessTokenCommand) {
        try {
            return JWT.verify(command.accessToken, "accessToken")
        } catch (error) {
            return {}
        }    
    }
}