import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "src/users/entities/user.entity"
import { HttpException, HttpStatus } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { GetUserByEmailQuery } from "src/users/queries/getUserByEmail.query"
import { CreateUserCommand } from "src/users/commands/createUser.command"
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import transporter from "../../../config/nodemailer"
import { ActivateUserCommand } from "../commands/activateUser.command"
import { GetUserByActivationKeyQuery } from "src/users/queries/getUserByActivationKey.query"



@CommandHandler(ActivateUserCommand)
export class ActivateUserHandler implements ICommandHandler<ActivateUserCommand> {
    constructor( 
        @InjectModel(User) private readonly userModel:typeof User,
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {}

    async execute(command: ActivateUserCommand) {1
        try {
            const { key } = command

            const foundUser = await this.queryBus.execute(new GetUserByActivationKeyQuery(key))

            if (!foundUser.id) throw new HttpException("Ошибка активации", 404)

            // ошибка \/
            await foundUser.update({isActivated: true, activationKey: ""})

            await foundUser.save()


                      

            return "OK"
        } catch (error) {
            
        }
        
    }
}