import { UpdateOrderDto } from "../dto/update-order.dto"

export class UpdateOrderCommand {
    constructor(public orderId:number, public order:UpdateOrderDto) {}
}