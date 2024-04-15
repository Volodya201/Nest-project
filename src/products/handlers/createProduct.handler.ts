import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Product } from "../entities/product.entity"
import { CreateProductCommand } from "../commands/createProduct.command"


@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor( @InjectModel(Product) private readonly productRepo:typeof Product ) {}

    async execute(command: CreateProductCommand) {
        return this.productRepo.create({...command.product})
    }
}