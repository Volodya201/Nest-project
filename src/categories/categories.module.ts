import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { Category } from "./entities/category.entity"
import { Product } from "src/products/entities/product.entity"
import { CategoryController } from "./categories.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { GetCategoriesHandler } from "./handlers/getCategories.handler"
import { GetCategoryHandler } from "./handlers/getCategory.handler"
import { CreateCategoryHandler } from "./handlers/createCategory.handler"
import { RemoveCategoryHandler } from "./handlers/removeCategory.handler"
import { UpdateCategoryHandler } from "./handlers/updateCategory.handler"
import { AuthMiddleware } from "src/common/middlewares/auth.middleware"

const handlers = [
    GetCategoriesHandler,
    GetCategoryHandler,
    CreateCategoryHandler,
    RemoveCategoryHandler,
    UpdateCategoryHandler
]


@Module({
    imports: [SequelizeModule.forFeature([Category, Product]), CqrsModule],
    controllers: [CategoryController],
    providers: [...handlers]
})


export class CategoryModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes("categories")
    }
}

