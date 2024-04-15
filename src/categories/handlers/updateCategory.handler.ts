import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Category } from "../entities/category.entity"
import { UpdateCategoryCommand } from "../commands/updateCategory.command"
import { HttpException } from "@nestjs/common"


@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
    constructor( @InjectModel(Category) private readonly categoryModel:typeof Category ) {}

    async execute(command: UpdateCategoryCommand) {
        try {
            await this.categoryModel.update({...command.category}, {where: {id: command.id}})
        return await this.categoryModel.findOne({where: {id: command.id}})
        } catch (error) {
            throw new HttpException("Ошибка сервера, повторите попытку позже", 500)
        }

    }
}