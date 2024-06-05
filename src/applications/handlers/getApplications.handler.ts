import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetApplicationsQuery } from "../queries/getApplications.query"
import { InjectModel } from "@nestjs/sequelize"
import { Application } from "../entities/applications.entity"
import { HttpException } from "@nestjs/common"


@QueryHandler(GetApplicationsQuery)
export class GetApplicationsHandler implements IQueryHandler<GetApplicationsQuery> {
    constructor( @InjectModel(Application) private readonly applicationModel:typeof Application ) {}

    async execute(query: GetApplicationsQuery) {
        try {
            return this.applicationModel.findAll(
                {include: {all: true},
                where: {
                    checked: false
                },
                order: [["createdAt", "DESC"]] 
            })
        } catch (error) {
            throw new HttpException("Ошибка сервера, повторите попытку позже", 500)
        }
    }
}