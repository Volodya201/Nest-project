import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { User } from "../entities/user.entity"
import { InjectModel } from "@nestjs/sequelize"
import { GetUsersQuery } from "../queries/getUsers.query"
import { Order } from "src/orders/entities/order.entity"
import { UserRoles } from "../entities/userRoles.entity"
import { Role } from "../entities/role.entity"

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler {
    constructor (@InjectModel(User) private readonly userRepo:typeof User) {}

    async execute(query: GetUsersHandler): Promise<User[]> {
        return this.userRepo.findAll({include: [
            {
                model: Order
            },
            {
                model: UserRoles,
                include: [{model: Role}]
            }
        ]})
    }
}