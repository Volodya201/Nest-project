import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Category } from "../entities/category.entity"
import { RemoveCategoryCommand } from "../commands/removeCategory.command"
import { HttpException } from "@nestjs/common"


@CommandHandler(RemoveCategoryCommand)
export class RemoveCategoryHandler implements ICommandHandler<RemoveCategoryCommand> {
    constructor( @InjectModel(Category) private readonly categoryModel:typeof Category ) {}

    async execute(command: RemoveCategoryCommand) {
        try {
            await this.categoryModel.destroy({where: {id: command.categoryId}})
            return {id: command.categoryId}
        } catch (error) {
            throw new HttpException("Ошибка сервера, повторите попытку позже", 500)
        }
    }
}