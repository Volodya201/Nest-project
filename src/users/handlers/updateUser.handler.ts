import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "../entities/User.entity"
import { UpdateUserCommand } from "../commands/updateUser.command"


@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor( @InjectModel(User) private readonly userRepo:typeof User ) {}

    async execute(command: UpdateUserCommand) {
        await this.userRepo.update({...command.user}, {where: {id: command.userId}})    

        return await this.userRepo.findOne({where: {id: command.userId}})
    }
}