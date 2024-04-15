import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Order } from "../entities/order.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetOrdersQuery } from "../queries/getOrders.query"

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler {
    constructor (@InjectModel(Order) private readonly orderRepo:typeof Order) {}

    async execute(query: GetOrdersHandler): Promise<Order[]> {
        return this.orderRepo.findAll({include: {all: true}})
    }
}