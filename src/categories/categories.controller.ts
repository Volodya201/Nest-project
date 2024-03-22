import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CategoryService } from "./categories.service"
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService:CategoryService) {}

    @Get()
    async getAll() {
        try {
            return this.categoryService.getAll()
        } catch (error) {
            // :(
        }
    }


    @Post()
    async create(@Body() category:CreateCategoryDto) {
        try {
            return await this.categoryService.create(category) 
        } catch (error) {
            
        }
    }


    @Patch("/:id")
    async update(@Body() category:UpdateCategoryDto, @Param("id") id:string) {
        try {
            return await this.categoryService.update(+id, category)
        } catch (error) {
            
        }
    }


    @Delete("/:id")
    async remove(@Param("id") id:string) {
        return this.categoryService.remove(+id)
    }
}