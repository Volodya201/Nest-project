import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetOrderItemQuery } from "../queries/getOrderItem.query"
import { InjectModel } from "@nestjs/sequelize"
import { OrderItem } from "../entities/order-item.entity"


@QueryHandler(GetOrderItemQuery)
export class GetOrderItemHandler implements IQueryHandler<GetOrderItemQuery> {
    constructor( @InjectModel(OrderItem) private readonly orderItemModel:typeof OrderItem ) {}

    async execute(query: GetOrderItemQuery) {
        return this.orderItemModel.findOne({where: {id: query.orderItemId}})
    }
}