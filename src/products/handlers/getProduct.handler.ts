import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Product } from "../entities/product.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetProductQuery } from "../queries/getProduct.query"

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler {
    constructor (@InjectModel(Product) private readonly productRepo:typeof Product) {}

    async execute(query: GetProductQuery): Promise<any> {
        return this.productRepo.findOne({where: {id: query.productId}, include: {all: true}})
    }
}