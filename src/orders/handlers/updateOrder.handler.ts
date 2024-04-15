import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Order } from "../entities/order.entity"
import { UpdateOrderCommand } from "../commands/updateOrder.command"


@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
    constructor( @InjectModel(Order) private readonly orderRepo:typeof Order ) {}

    async execute(command: UpdateOrderCommand) {
        await this.orderRepo.update({...command.order}, {where: {id: command.orderId}})

        return await this.orderRepo.findOne({where: {id: command.orderId}})
    }
}