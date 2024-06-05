import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Application } from "../entities/applications.entity"
import { CreateApplicationCommand } from "../commands/CreateApplication.command"
import { HttpException } from "@nestjs/common"


@CommandHandler(CreateApplicationCommand)
export class CreateApplicationHandler implements ICommandHandler<CreateApplicationCommand> {
    constructor( @InjectModel(Application) private readonly applicationModel:typeof Application ) {}

    async execute(command: CreateApplicationCommand) {
        try {
            const data = this.applicationModel.create({...command.application})

            return this.applicationModel.findOne({where: {id: (await data).id}, include: {all: true}})
        } catch (error) {
            throw new HttpException("Ошибка сервера, повторите попытку позже", 500)
        }
    }
}