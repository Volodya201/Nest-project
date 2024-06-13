import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ValidateAccessTokenCommand } from 'src/tokens/commands/ValidateAccessToken.command'
import { GetUserQuery } from 'src/users/queries/getUser.query'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly CommandBus: CommandBus,
        private readonly QueryBus: QueryBus
    ) {}
    async use(request: Request, response: Response, next: NextFunction) {   
        try {
            const headers = request.headers.authorization

            if (!headers) throw new Error("")

            const token = headers.split(" ")[1]

            const userData = await this.CommandBus.execute(new ValidateAccessTokenCommand(token))

            if (!userData.id) throw new Error("")

            const user = await this.QueryBus.execute(new GetUserQuery(userData.id))

            //@ts-ignore
            request.user = user

            next()
        } catch (error) {
            response.status(401).json("Пользователь неавторизован")
        }
    }
}
