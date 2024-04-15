import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Order } from "../entities/order.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetOrderQuery } from "../queries/getOrder.query"

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler {
    constructor (@InjectModel(Order) private readonly orderRepo:typeof Order) {}

    async execute(query: GetOrderQuery): Promise<Order> {
        return this.orderRepo.findOne({where: {id: query.orderId}, include: {all: true}})
    }
}