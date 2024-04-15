import { UpdateCategoryDto } from "../dto/update-category.dto"

export class UpdateCategoryCommand {
    constructor(public id:number, public category:UpdateCategoryDto) {}
}