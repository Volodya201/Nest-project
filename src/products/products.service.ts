import { InjectModel } from "@nestjs/sequelize"
import { Product } from "./entities/product.entity"
import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private readonly productRepo: typeof Product) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepo.create({...createProductDto})
  }

  async findAll() {
    return await this.productRepo.findAll({include: {all: true}})
  }

  async findOne(id: number) {
    return await this.productRepo.findOne({where: {id}})
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepo.update({...updateProductDto}, {where: {id}})
  }

  async remove(id: number) {
    return await this.productRepo.destroy({where: {id}})
  }
}
