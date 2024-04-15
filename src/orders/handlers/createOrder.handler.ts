import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Order } from "../entities/order.entity"
import { CreateOrderCommand } from "../commands/createOrder.command"


@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    constructor( @InjectModel(Order) private readonly orderRepo:typeof Order ) {}

    async execute(command: CreateOrderCommand) {
        return this.orderRepo.create({...command.order})
    }
}