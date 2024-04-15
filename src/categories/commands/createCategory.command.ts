import { CreateCategoryDto } from "../dto/create-category.dto";

export class CreateCategoryCommand {
    constructor(public category:CreateCategoryDto) {}
}