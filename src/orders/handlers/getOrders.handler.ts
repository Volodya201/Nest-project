import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { Order } from "../entities/order.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetOrdersQuery } from "../queries/getOrders.query"
import { OrderItem } from "../../order-items/entities/order-item.entity"
import { Product } from "src/products/entities/product.entity"
import { User } from "src/users/entities/user.entity"

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler {
    constructor (@InjectModel(Order) private readonly orderRepo:typeof Order) {}

    async execute(query: GetOrdersHandler): Promise<Order[]> {
        return this.orderRepo.findAll({include: [
            {
                model: OrderItem,
                include: [{model: Product}]
            },
            {
                model: User
            }
        ]})
    }
}