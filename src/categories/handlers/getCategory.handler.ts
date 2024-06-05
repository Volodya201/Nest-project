import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetCategoryQuery } from "../queries/getCategory.query"
import { InjectModel } from "@nestjs/sequelize"
import { Category } from "../entities/category.entity"
import { HttpException } from "@nestjs/common"


@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
    constructor( @InjectModel(Category) private readonly categoryModel:typeof Category ) {}

    async execute(query: GetCategoryQuery) {
        try {
            return this.categoryModel.findOne({where: {id: query.categoryId}, include: {all: true}})
        } catch (error) {
            throw new HttpException("Ошибка сервера, повторите попытку позже", 500)
        }
    }
}