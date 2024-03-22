import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { Category } from "./entities/category.entity"
import { Product } from "src/products/entities/product.entity"
import { CategoryController } from "./categories.controller"
import { CategoryService } from "./categories.service"


@Module({
    imports: [SequelizeModule.forFeature([Category, Product])],
    controllers: [CategoryController],
    providers: [CategoryService]
})


export class CategoryModule {}

