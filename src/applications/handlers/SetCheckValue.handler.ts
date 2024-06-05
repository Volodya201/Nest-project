import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Application } from "../entities/applications.entity"
import { SetCheckValueCommand } from "../commands/SetCheckValue.command"
import { HttpException } from "@nestjs/common"


@CommandHandler(SetCheckValueCommand)
export class SetCheckValueHandler implements ICommandHandler<SetCheckValueCommand> {
    constructor( @InjectModel(Application) private readonly applicationModel:typeof Application ) {}

    async execute(command: SetCheckValueCommand) {
        try {
            const foundApplication = await this.applicationModel.findOne({where: {id: command.id}})

            if (!foundApplication) throw new Error("Что-то пошло не так, повторите попытку позже")

            foundApplication.checked = !foundApplication.checked

            await foundApplication.save()

            return foundApplication
        } catch (error) {
            throw new HttpException("Ошибка сервера, повторите попытку позже", 500)
        }

    }
}