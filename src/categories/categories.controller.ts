import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { Roles } from "src/common/guards/roles/roles.decorator"
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { GetCategories } from './queries/getCategories.query'
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateCategoryCommand } from './commands/createCategory.command'
import { RemoveCategoryCommand } from './commands/removeCategory.command'
import { UpdateCategoryCommand } from './commands/updateCategory.command'
import { GetCategoryQuery } from './queries/getCategory.query'
import { RolesGuard } from 'src/common/guards/roles/roles.guard'

@Controller("categories")
@UseGuards(RolesGuard)
export class CategoryController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus 
    ) {}

    @Get("/:id")
    @Roles(["CategoryView"])
    async getAll(@Param("id") id:string) {
        try {
            return this.queryBus.execute(new GetCategoryQuery(+id))
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }

    @Get()
    @Roles(["CategoryView"])
    async getOne() {
        try {
            return this.queryBus.execute(new GetCategories())
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }


    @Post()
    @Roles(["CategoryEdit"])
    async create(@Body() category:CreateCategoryDto) {
        try {
            return this.commandBus.execute(new CreateCategoryCommand(category))
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }


    @Patch("/:id")
    @Roles(["CategoryEdit"])
    async update(@Body() category:UpdateCategoryDto, @Param("id") id:string) {
        try {

            return await this.commandBus.execute(new UpdateCategoryCommand(+id, category))
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }


    @Delete("/:id")
    @Roles(["CategoryEdit"])
    async remove(@Param("id") id:string) {
        try {
            return await this.commandBus.execute(new RemoveCategoryCommand(+id))
        } catch (error) {
            return {message: "Ошибка сервера"}
        }
    }
}