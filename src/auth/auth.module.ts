import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "src/users/entities/user.entity"
import { AuthController } from "./auth.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { RegisterHandler } from "./handlers/register.handler"
import { LoginHandler } from "./handlers/login.handler"
import { ActivateUserHandler } from "./handlers/activateUser.handler"
import { UsersModule } from "src/users/users.module"

const handlers = [
    RegisterHandler,
    LoginHandler,
    ActivateUserHandler
]

@Module({
    imports: [SequelizeModule.forFeature([User]), CqrsModule, UsersModule],
    controllers: [AuthController],
    providers: [...handlers],  //TokenService
    exports: []
})


export class AuthModule {}