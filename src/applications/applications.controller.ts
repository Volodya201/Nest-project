import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { GetApplicationsQuery } from './queries/getApplications.query'
import { GetAllApplicationsQuery } from './queries/getAllApplications.query'
import { CreateApplicationDto } from './dto/create-application.dto'
import { SetCheckValueCommand } from './commands/SetCheckValue.command'
import { CreateApplicationCommand } from './commands/CreateApplication.command'

@Controller("applications")
export class ApplicationsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Get("/")
    async getUnchecked() {
        try {
            return this.queryBus.execute(new GetApplicationsQuery())
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }

    @Get("/all")
    async getAll() {
        try {
            return this.queryBus.execute(new GetAllApplicationsQuery())
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }

    @Post()
    async create(@Body() application:CreateApplicationDto) {
        try {
            console.log(application)
            return this.commandBus.execute(new CreateApplicationCommand(application))
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }

    @Patch("/:id")
    async setCheckValue(@Param("id") id:string) {
        try {
            return this.commandBus.execute(new SetCheckValueCommand(Number(id)))
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }
}