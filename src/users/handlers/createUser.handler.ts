import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "../entities/user.entity"
import { CreateUserCommand } from "../commands/createUser.command"


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor( @InjectModel(User) private readonly userRepo:typeof User ) {}

    async execute(command: CreateUserCommand) {
        return this.userRepo.create({...command.user})
    }
}