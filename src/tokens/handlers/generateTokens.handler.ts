import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { GenerateTokensCommand } from "../commands/generateTokens.command"
import * as JWT from 'jsonwebtoken'


@CommandHandler(GenerateTokensCommand)
export class GenerateTokensHandler implements ICommandHandler<GenerateTokensCommand> {
    constructor(
        public readonly JWT
    ) {}

    async execute(command: GenerateTokensCommand) {
        const { userDTO } = command

        const accessToken = this.JWT.sign(userDTO, "accessToken", {expiresIn: "10s"})
        const refreshToken = this.JWT.sign(userDTO, "refreshToken", {expiresIn: "1h"})

        return {
            accessToken,
            refreshToken,
            userDTO
        }      
    }
}