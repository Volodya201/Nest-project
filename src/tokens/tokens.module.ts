import { Module } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { GenerateTokensHandler } from "./handlers/generateTokens.handler"

const handlers = [
    GenerateTokensHandler
]

@Module({
    imports: [CqrsModule],
    controllers: [],
    providers: [...handlers],
    exports: []
})


export class TokensModule {}