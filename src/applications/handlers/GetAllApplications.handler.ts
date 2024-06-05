import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetAllApplicationsQuery } from "../queries/getAllApplications.query"
import { InjectModel } from "@nestjs/sequelize"
import { Application } from "../entities/applications.entity"
import { HttpException } from "@nestjs/common"


@QueryHandler(GetAllApplicationsQuery)
export class GetAllApplicationsHandler implements IQueryHandler<GetAllApplicationsQuery> {
    constructor( @InjectModel(Application) private readonly applicationModel:typeof Application ) {}

    async execute(query: GetAllApplicationsQuery) {
        try {
            return this.applicationModel.findAll(
                {include: {all: true},
                order: [["createdAt", "DESC"]] 
            })
        } catch (error) {
            throw new HttpException("Ошибка сервера, повторите попытку позже", 500)
        }
    }
}