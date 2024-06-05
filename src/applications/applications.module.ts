import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ApplicationsController } from "./applications.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { GetApplicationsHandler } from "./handlers/getApplications.handler"
import { GetAllApplicationsHandler } from "./handlers/GetAllApplications.handler"
import { SetCheckValueHandler } from "./handlers/SetCheckValue.handler"
import { Application } from "./entities/applications.entity"
import { CreateApplicationHandler } from "./handlers/CreateApplication.handler"

const handlers = [
    GetApplicationsHandler,
    GetAllApplicationsHandler,
    CreateApplicationHandler,
    SetCheckValueHandler
]


@Module({
    imports: [SequelizeModule.forFeature([Application]), CqrsModule],
    controllers: [ApplicationsController],
    providers: [...handlers]
})


export class ApplicationsModule {}

