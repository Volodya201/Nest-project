import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { User } from "../entities/user.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetUserQuery } from "../queries/getUser.query"

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler {
    constructor (@InjectModel(User) private readonly userRepo:typeof User) {}

    async execute(query: GetUserQuery): Promise<any> {
        return this.userRepo.findOne({where: {id: query.userId}, include: {all: true}})
    }
}