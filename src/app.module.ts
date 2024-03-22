import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { CategoryModule } from './categories/categories.module'

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pgvova11',
    database: 'crm-flowers-database',
    models: [],
    autoLoadModels: true,
    synchronize: true
  }), ProductsModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
