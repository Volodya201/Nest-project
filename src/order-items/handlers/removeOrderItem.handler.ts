import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { OrderItem } from "../entities/order-item.entity"
import { RemoveOrderItemCommand } from "../commands/removeOrderItem.command"


@CommandHandler(RemoveOrderItemCommand)
export class RemoveOrderItemHandler implements ICommandHandler<RemoveOrderItemCommand> {
    constructor( @InjectModel(OrderItem) private readonly orderItemModel:typeof OrderItem ) {}

    async execute(command: RemoveOrderItemCommand) {
        await this.orderItemModel.destroy({where: {id: command.orderItemId}})
        return {id: command.orderItemId}
    }
}