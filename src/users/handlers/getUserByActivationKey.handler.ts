import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { User } from "../entities/user.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetUserByActivationKeyQuery } from "../queries/getUserByActivationKey.query"

@QueryHandler(GetUserByActivationKeyQuery)
export class GetUserByActivationKeyHandler implements IQueryHandler {
    constructor (@InjectModel(User) private readonly userRepo:typeof User) {}

    async execute(query: GetUserByActivationKeyQuery): Promise<any> {
        return await this.userRepo.findOne({where: {activationKey: query.userActivationKey}, include: {all: true}}) || {}
    }
}