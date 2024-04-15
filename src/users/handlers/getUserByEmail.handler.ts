import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { User } from "../entities/user.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetUserByEmailQuery } from "../queries/getUserByEmail.query"

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler {
    constructor (@InjectModel(User) private readonly userRepo:typeof User) {}

    async execute(query: GetUserByEmailQuery): Promise<any> {
        const foundUser = await this.userRepo.findOne({where: {email: query.userEmail}, include: {all: true}}) || {}
        return foundUser
    }
}