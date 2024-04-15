import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { CqrsModule } from '@nestjs/cqrs'
import { User } from './entities/user.entity'
import { GetUsersHandler } from './handlers/getUsers.handler'
import { GetUserHandler } from './handlers/getUser.handler'
import { CreateUserHandler } from './handlers/createUser.handler'
import { UpdateUserHandler } from './handlers/updateUser.handler'
import { RemoveUserHandler } from './handlers/removeUser.handler'

const handlers = [
  GetUsersHandler,
  GetUserHandler,
  CreateUserHandler,
  UpdateUserHandler,
  RemoveUserHandler
]

@Module({
  imports: [SequelizeModule.forFeature([User]), CqrsModule],
  controllers: [UsersController],
  providers: [...handlers],
})
export class UsersModule {}
