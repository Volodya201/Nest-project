import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GetOrderQuery } from './queries/getOrder.query'
import { GetOrdersQuery } from './queries/getOrders.query'
import { CreateOrderCommand } from './commands/createOrder.command'
import { UpdateOrderCommand } from './commands/updateOrder.command'
import { RemoveOrderCommand } from './commands/removeOrder.command'

@Controller('orders')
export class OrderController {
  constructor(
    private readonly QueryBus:QueryBus,
    private readonly CommandBus:CommandBus
  ) {}

  @Post()
  create(@Body() order: CreateOrderDto) {
    return this.CommandBus.execute(new CreateOrderCommand(order))
  }

  @Get()
  findAll() {
    return this.QueryBus.execute(new GetOrdersQuery())
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.QueryBus.execute(new GetOrderQuery(+id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    return this.CommandBus.execute(new UpdateOrderCommand(+id, order))
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CommandBus.execute(new RemoveOrderCommand(+id))
  }
}
