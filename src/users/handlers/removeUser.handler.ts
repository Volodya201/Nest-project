import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "../entities/user.entity"
import { RemoveUserCommand } from "../commands/removeUser.command"


@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler implements ICommandHandler<RemoveUserCommand> {
    constructor( @InjectModel(User) private readonly userRepo:typeof User ) {}

    async execute(command: RemoveUserCommand) {
        await this.userRepo.destroy({where: {id: command.userId}})
        return {id: command.userId}
    }
}