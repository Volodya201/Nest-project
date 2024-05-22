import { Module } from '@nestjs/common'
import { SequelizeModule } from "@nestjs/sequelize"
import { Category } from "src/categories/entities/category.entity"
import { Product } from "./entities/product.entity"
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateProductHandler } from './handlers/createProduct.handler'
import { GetProductsHandler } from './handlers/getProducts.handler'
import { GetProductHandler } from './handlers/getProduct.handler'
import { UpdateProductHandler } from './handlers/updateProduct.handler'
import { RemoveProductHandler } from './handlers/removeProduct.handler'
import { GetProductsByIlikeHandler } from './handlers/getProductsByIlike.handler'


const handlers = [
  GetProductsHandler,
  GetProductHandler,
  GetProductsByIlikeHandler,
  CreateProductHandler,
  UpdateProductHandler,
  RemoveProductHandler
]

@Module({
  imports: [SequelizeModule.forFeature([Category, Product]), CqrsModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...handlers],
})
export class ProductsModule {}
