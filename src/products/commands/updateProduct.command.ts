import { UpdateProductDto } from "../dto/update-product.dto"

export class UpdateProductCommand {
    constructor(public productId:number, public product:UpdateProductDto) {}
}