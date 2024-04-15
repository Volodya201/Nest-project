import { CreateProductDto } from "../dto/create-product.dto"

export class CreateProductCommand {
    constructor(public product:CreateProductDto) {}
}