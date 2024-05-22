import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CreateOrderItemDto } from './dto/create-order-item.dto'
import { UpdateOrderItemDto } from './dto/update-order-item.dto'
import { QueryBus, CommandBus } from '@nestjs/cqrs'
import { CreateOrderItemCommand } from './commands/createOrderItem.command'
import { GetOrderItemsQuery } from './queries/getOrderItems.query'
import { GetOrderItemQuery } from './queries/getOrderItem.query'
import { UpdateOrderItemCommand } from './commands/updateOrderItem.command'
import { RemoveOrderItemCommand } from './commands/removeOrderItem.command'

@Controller('order-items')
export class OrderItemsController {
  constructor(
    private readonly QueryBus:QueryBus,
    private readonly CommandBus:CommandBus
  ) {}

  @Post()
  create(@Body() orderItems: any) {
    return this.CommandBus.execute(new CreateOrderItemCommand(orderItems))
  }

  @Get()
  findAll() {
    return this.QueryBus.execute(new GetOrderItemsQuery())
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.QueryBus.execute(new GetOrderItemQuery(+id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() orderItem: UpdateOrderItemDto) {
    return this.CommandBus.execute(new UpdateOrderItemCommand(+id, orderItem))
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CommandBus.execute(new RemoveOrderItemCommand(+id))
  }
}
