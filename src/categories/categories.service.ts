import { InjectModel } from "@nestjs/sequelize"
import { Category } from "./entities/category.entity"
import { Injectable } from "@nestjs/common"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"


@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category) private readonly categoryRepo: typeof Category) {}


    async getAll() {
        return await this.categoryRepo.findAll({include: {all: true}})
    }

    async create(category:CreateCategoryDto) {
        return await this.categoryRepo.create({...category})
    }

    async update(id:number, category:UpdateCategoryDto) {
        return await this.categoryRepo.update({...category}, {where: {id}})
    }

    async remove(id:number) {
        return await this.categoryRepo.destroy({where: {id}})
    }
}