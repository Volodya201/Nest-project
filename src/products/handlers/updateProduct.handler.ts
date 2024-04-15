import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Product } from "../entities/product.entity"
import { UpdateProductCommand } from "../commands/updateProduct.command"


@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
    constructor( @InjectModel(Product) private readonly productRepo:typeof Product ) {}

    async execute(command: UpdateProductCommand) {
        await this.productRepo.update({...command.product}, {where: {id: command.productId}})    

        return await this.productRepo.findOne({where: {id: command.productId}})
    }
}