import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { User } from "../entities/user.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetUserByConfirmKeyQuery } from "../queries/getUserByConfirmKey.query"

@QueryHandler(GetUserByConfirmKeyQuery)
export class GetUserByConfirmKeyHandler implements IQueryHandler {
    constructor (@InjectModel(User) private readonly userRepo:typeof User) {}

    async execute(query: GetUserByConfirmKeyQuery): Promise<any> {
        return await this.userRepo.findOne({where: {confirmKey: query.userConfirmKey}, include: {all: true}}) || {}
    }
}