import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { GenerateTokensCommand } from "../commands/generateTokens.command"
import * as JWT from 'jsonwebtoken'


@CommandHandler(GenerateTokensCommand)
export class GenerateTokensHandler implements ICommandHandler<GenerateTokensCommand> {

    async execute(command: GenerateTokensCommand) {
        const { userDTO } = command

        const accessToken = JWT.sign(userDTO, "accessToken", {expiresIn: "3m"})
        const refreshToken = JWT.sign(userDTO, "refreshToken", {expiresIn: "1h"})

        return {
            accessToken,
            refreshToken,
            userDTO
        }      
    }
}