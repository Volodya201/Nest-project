import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Product } from "../entities/product.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetProductsByIlikeQuery } from "../queries/getProductsByIlike.query"
import { Op } from 'sequelize'

@QueryHandler(GetProductsByIlikeQuery)
export class GetProductsByIlikeHandler implements IQueryHandler {
    constructor (@InjectModel(Product) private readonly productRepo:typeof Product) {}

    async execute(query: GetProductsByIlikeQuery): Promise<Product[]> {
        return this.productRepo.findAll({include: {all: true}, where: {title: {[Op.iLike]: `%${query.searchingText}%`}}})
    }
}