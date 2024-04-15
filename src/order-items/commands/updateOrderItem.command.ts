import { UpdateOrderItemDto } from "../dto/update-order-item.dto"

export class UpdateOrderItemCommand {
    constructor(public id:number, public orderItem:UpdateOrderItemDto) {}
}