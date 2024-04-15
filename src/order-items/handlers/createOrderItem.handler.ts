import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Category } from "../entities/category.entity"
import { CreateCategoryCommand } from "../commands/createCategory.command"


@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor( @InjectModel(Category) private readonly categoryModel:typeof Category ) {}

    async execute(command: CreateCategoryCommand) {
        return this.categoryModel.create({...command.category})
    }
}