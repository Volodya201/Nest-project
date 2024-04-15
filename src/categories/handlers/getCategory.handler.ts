import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetCategoryQuery } from "../queries/getCategory.query"
import { InjectModel } from "@nestjs/sequelize"
import { Category } from "../entities/category.entity"


@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
    constructor( @InjectModel(Category) private readonly categoryModel:typeof Category ) {}

    async execute(query: GetCategoryQuery) {
        return this.categoryModel.findOne({where: {id: query.categoryId}})
    }
}