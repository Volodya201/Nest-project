import { Module } from '@nestjs/common'
import { OrderService } from './orders.service'
import { OrderController } from './orders.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { CqrsModule } from '@nestjs/cqrs'
import { Order } from 'src/orders/entities/order.entity'
import { GetOrdersHandler } from './handlers/getOrders.handler'
import { GetOrderHandler } from './handlers/getOrder.handler'
import { CreateOrderHandler } from './handlers/createOrder.handler'
import { UpdateOrderHandler } from './handlers/updateOrder.handler'
import { RemoveOrderHandler } from './handlers/removeOrder.handler'


const handlers = [
  GetOrdersHandler,
  GetOrderHandler,
  CreateOrderHandler,
  UpdateOrderHandler,
  RemoveOrderHandler
]


@Module({
  imports: [SequelizeModule.forFeature([Order]), CqrsModule],
  controllers: [OrderController],
  providers: [OrderService, ...handlers],
})

export class OrdersModule {}
