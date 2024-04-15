import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { QueryBus, CommandBus } from '@nestjs/cqrs'
import { CreateUserCommand } from './commands/createUser.command'
import { GetUsersQuery } from './queries/getUsers.query'
import { GetUserQuery } from './queries/getUser.query'
import { UpdateUserCommand } from './commands/updateUser.command'
import { RemoveUserCommand } from './commands/removeUser.command'

@Controller('users')
export class UsersController {
  constructor(
    private readonly QueryBus:QueryBus,
    private readonly CommandBus:CommandBus
  ) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.CommandBus.execute(new CreateUserCommand(user))
  }

  @Get()
  findAll() {
    return this.QueryBus.execute(new GetUsersQuery())
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.QueryBus.execute(new GetUserQuery(+id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.CommandBus.execute(new UpdateUserCommand(+id, user))
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CommandBus.execute(new RemoveUserCommand(+id))
  }
}
