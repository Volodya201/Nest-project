import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Product } from "../entities/product.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetProductsQuery } from "../queries/getProducts.query"

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler {
    constructor (@InjectModel(Product) private readonly productRepo:typeof Product) {}

    async execute(query: GetProductsHandler): Promise<Product[]> {
        return this.productRepo.findAll({include: {all: true}})
    }
}