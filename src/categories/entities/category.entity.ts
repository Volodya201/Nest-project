import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript"
import { Product } from "src/products/entities/product.entity"

@Table({tableName: "categories"})
export class Category extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    title: string

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    urlImage: string

    @HasMany(() => Product)
    product: Product[]
}