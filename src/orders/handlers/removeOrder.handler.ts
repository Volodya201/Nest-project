import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Order } from "../entities/order.entity"
import { RemoveOrderCommand } from "../commands/removeOrder.command"


@CommandHandler(RemoveOrderCommand)
export class RemoveOrderHandler implements ICommandHandler<RemoveOrderCommand> {
    constructor( @InjectModel(Order) private readonly orderRepo:typeof Order ) {}

    async execute(command: RemoveOrderCommand) {
        await this.orderRepo.destroy({where: {id: command.orderId}})
        return {id: command.orderId}
    }
}