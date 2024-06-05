import { Module } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { GenerateTokensHandler } from "./handlers/generateTokens.handler"
import { ValidateRefreshTokenHandler } from "./handlers/validateRefreshToken.handler"
import { ValidateAccessTokenHandler } from "./handlers/validateAccessToken.handler"

const handlers = [
    GenerateTokensHandler,
    ValidateRefreshTokenHandler,
    ValidateAccessTokenHandler
]

@Module({
    imports: [CqrsModule],
    controllers: [],
    providers: [...handlers],
    exports: [TokensModule]
})
export class TokensModule {}