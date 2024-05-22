import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GetProductsQuery } from './queries/getProducts.query'
import { GetProductQuery } from './queries/getProduct.query'
import { GetProductsByIlikeQuery } from "./queries/getProductsByIlike.query"
import { CreateProductCommand } from './commands/createProduct.command'
import { UpdateProductCommand } from './commands/updateProduct.command'
import { RemoveProductCommand } from './commands/removeProduct.command'

@Controller('products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() CreateProductDto: CreateProductDto) {
    console.log(CreateProductDto)
    return this.commandBus.execute(new CreateProductCommand(CreateProductDto))
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetProductsQuery())
  }

  @Get('ilike/:searchingText')
  findOneByIlike(@Param('searchingText') searchingText: string) {
    return this.queryBus.execute(new GetProductsByIlikeQuery(searchingText))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductQuery(+id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return this.commandBus.execute(new UpdateProductCommand(+id, product))
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new RemoveProductCommand(+id))
  }
}
