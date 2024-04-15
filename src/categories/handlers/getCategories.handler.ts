import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetCategories } from "../queries/getCategories.query"
import { InjectModel } from "@nestjs/sequelize"
import { Category } from "../entities/category.entity"
import { HttpException } from "@nestjs/common"


@QueryHandler(GetCategories)
export class GetCategoriesHandler implements IQueryHandler<GetCategories> {
    constructor( @InjectModel(Category) private readonly categoryModel:typeof Category ) {}

    async execute(query: GetCategories) {
        try {
            return this.categoryModel.findAll({include: {all: true}})
        } catch (error) {
            throw new HttpException("Ошибка сервера, повторите попытку позже", 500)
        }
    }
}