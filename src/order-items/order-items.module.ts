import { Module } from '@nestjs/common'
import { OrderItemsController } from './order-items.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { CqrsModule } from '@nestjs/cqrs'
import { OrderItem } from './entities/order-item.entity'
import { GetOrderItemsHandler } from './handlers/getOrderItems.handler'
import { GetOrderItemHandler } from './handlers/getOrderItem.handler'
import { CreateOrderItemHandler } from './handlers/createOrderItem.handler'
import { UpdateOrderItemHandler } from './handlers/updateOrderItem.handler'
import { RemoveOrderItemHandler } from './handlers/removeOrderItem.handler'

const handlers = [
  GetOrderItemsHandler,
  GetOrderItemHandler,
  CreateOrderItemHandler,
  UpdateOrderItemHandler,
  RemoveOrderItemHandler
]

@Module({
  imports: [SequelizeModule.forFeature([OrderItem]), CqrsModule],
  controllers: [OrderItemsController],
  providers: [...handlers],
})
export class OrderItemsModule {}
