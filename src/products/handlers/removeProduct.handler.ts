import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { Product } from "../entities/product.entity"
import { RemoveProductCommand } from "../commands/removeProduct.command"


@CommandHandler(RemoveProductCommand)
export class RemoveProductHandler implements ICommandHandler<RemoveProductCommand> {
    constructor( @InjectModel(Product) private readonly productRepo:typeof Product ) {}

    async execute(command: RemoveProductCommand) {
        await this.productRepo.destroy({where: {id: command.productId}})
        return {id: command.productId}
    }
}