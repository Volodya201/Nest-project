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
import { GetUserByEmailHandler } from './handlers/getUserByEmail.handler'
import { GetUserByUsernameHandler } from './handlers/GetUserByUsername.handler'
import { GetUserByActivationKeyHandler } from './handlers/getUserByActivationKey.handler'
import { GetUserByConfirmKeyHandler } from './handlers/getUserByConfirmKey.handler'
import { UserRoles } from './entities/userRoles.entity'
import { Role } from './entities/role.entity'

const handlers = [
  GetUsersHandler,
  GetUserHandler,
  GetUserByEmailHandler,
  GetUserByUsernameHandler,
  GetUserByActivationKeyHandler,
  GetUserByConfirmKeyHandler,
  CreateUserHandler,
  UpdateUserHandler,
  RemoveUserHandler
]

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), CqrsModule],
  controllers: [UsersController],
  providers: [...handlers],
  exports: [UsersModule]
})
export class UsersModule {}
