import { CreateOrderItemDto } from "../dto/create-order-item.dto"

export class CreateOrderItemCommand {
    constructor(public orderItem:CreateOrderItemDto) {}
}