import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { OrderItem } from "../entities/order-item.entity"
import { CreateOrderItemCommand } from "../commands/createOrderItem.command"


@CommandHandler(CreateOrderItemCommand)
export class CreateOrderItemHandler implements ICommandHandler<CreateOrderItemCommand> {
    constructor( @InjectModel(OrderItem) private readonly orderItemModel:typeof OrderItem ) {}

    async execute(command: CreateOrderItemCommand) {
        return this.orderItemModel.bulkCreate(command.orderItems)
    }
}