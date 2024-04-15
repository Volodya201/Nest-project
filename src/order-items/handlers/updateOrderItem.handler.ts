import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { OrderItem } from "../entities/order-item.entity"
import { UpdateOrderItemCommand } from "../commands/updateOrderItem.command"


@CommandHandler(UpdateOrderItemCommand)
export class UpdateOrderItemHandler implements ICommandHandler<UpdateOrderItemCommand> {
    constructor( @InjectModel(OrderItem) private readonly orderItemModel:typeof OrderItem ) {}

    async execute(command: UpdateOrderItemCommand) {
        await this.orderItemModel.update({...command.orderItem}, {where: {id: command.id}})

        return await this.orderItemModel.findOne({where: {id: command.id}})
    }
}