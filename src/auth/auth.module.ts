import { Module, RequestMethod, MiddlewareConsumer } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "src/users/entities/user.entity"
import { AuthController } from "./auth.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { RegisterHandler } from "./handlers/register.handler"
import { LoginHandler } from "./handlers/login.handler"
import { ActivateUserHandler } from "./handlers/activateUser.handler"
import { UsersModule } from "src/users/users.module"
import {TokensModule} from "../tokens/tokens.module"
import { RefreshHandler } from "./handlers/refresh.handler"
import { AuthMiddleware } from "../common/middlewares/auth.middleware"


const handlers = [
    RegisterHandler,
    LoginHandler,
    ActivateUserHandler,
    RefreshHandler
]

@Module({
    // Добавил сюда импорт модуля TokensModule, чтобы в модуле auth можно было использовать всё содержимое TokensModule
    imports: [SequelizeModule.forFeature([User]), CqrsModule, UsersModule, TokensModule],
    controllers: [AuthController],
    providers: [...handlers],
    exports: []
})


export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes("auth/check-login")
    }
}