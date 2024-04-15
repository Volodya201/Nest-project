import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Category } from "../entities/category.entity"
import { CreateCategoryCommand } from "../commands/createCategory.command"
import { HttpException, HttpStatus } from "@nestjs/common"


@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor( @InjectModel(Category) private readonly categoryModel:typeof Category ) {}

    async execute(command: CreateCategoryCommand) {1
        try {
            return this.categoryModel.create({...command.category})
        } catch (error) {
            throw new HttpException("Ошибка сервера, повторите попытку позже", 500)
        }
        
    }
}