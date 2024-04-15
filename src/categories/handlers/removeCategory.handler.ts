import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Category } from "../entities/category.entity"
import { RemoveCategoryCommand } from "../commands/removeCategory.command"


@CommandHandler(RemoveCategoryCommand)
export class RemoveCategoryHandler implements ICommandHandler<RemoveCategoryCommand> {
    constructor( @InjectModel(Category) private readonly categoryModel:typeof Category ) {}

    async execute(command: RemoveCategoryCommand) {
        await this.categoryModel.destroy({where: {id: command.categoryId}})
        return {id: command.categoryId}
    }
}