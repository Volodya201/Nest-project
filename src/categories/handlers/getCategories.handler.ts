import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetCategories } from "../queries/getCategories.query"
import { InjectModel } from "@nestjs/sequelize"
import { Category } from "../entities/category.entity"


@QueryHandler(GetCategories)
export class GetCategoriesHandler implements IQueryHandler<GetCategories> {
    constructor( @InjectModel(Category) private readonly categoryModel:typeof Category ) {}

    async execute(query: GetCategories) {
        return this.categoryModel.findAll({include: {all: true}})
    }
}