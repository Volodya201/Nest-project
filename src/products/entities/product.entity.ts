import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript"
import { Category } from "src/categories/entities/category.entity"


@Table({tableName: ""})
export class Product extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.STRING})
    url_image: string

    @Column({type: DataType.FLOAT})
    price_orinal: number

    @Column({type: DataType.INTEGER, defaultValue: 0})
    discount: number

    @Column({type: DataType.FLOAT})
    price_with_discount: number

    @Column({type: DataType.TEXT})
    description: string

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    category_id: number

}