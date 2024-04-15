import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetOrderItemsQuery } from "../queries/getOrderItems.query"
import { InjectModel } from "@nestjs/sequelize"
import { OrderItem } from "../entities/order-item.entity"


@QueryHandler(GetOrderItemsQuery)
export class GetOrderItemsHandler implements IQueryHandler<GetOrderItemsQuery> {
    constructor( @InjectModel(OrderItem) private readonly orderItemModel:typeof OrderItem ) {}

    async execute(query: GetOrderItemsQuery) {
        return this.orderItemModel.findAll({include: {all: true}})
    }
}