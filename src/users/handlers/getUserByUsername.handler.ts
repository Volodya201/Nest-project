import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { User } from "../entities/user.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetUserByUsernameQuery } from "../queries/getUserByUsername.query"

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler implements IQueryHandler {
    constructor (@InjectModel(User) private readonly userRepo:typeof User) {}

    async execute(query: GetUserByUsernameQuery): Promise<any> {
        const foundUser = await this.userRepo.findOne({where: {username: query.username}, include: {all: true}}) || {}
        return foundUser
    }
}