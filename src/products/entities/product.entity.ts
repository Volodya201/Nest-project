import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo, BeforeCreate, BeforeUpdate } from "sequelize-typescript"
import { Category } from "src/categories/entities/category.entity"
import { OrderItem } from "src/order-items/entities/order-item.entity"


@Table({tableName: "products"})
export class Product extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.STRING})
    url_image: string

    @Column({type: DataType.FLOAT})
    price_original: number

    @Column({type: DataType.INTEGER, defaultValue: 0})
    discount: number

    @Column({type: DataType.FLOAT, allowNull: true})
    price_with_discount: number

    @Column({type: DataType.TEXT})
    description: string

    @Column({type: DataType.TEXT})
    consist: string

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    category_id: number

    @BelongsTo(() => Category)
    category: Category

    @HasMany(() => OrderItem)
    order_items: OrderItem[]



    @BeforeCreate
    static setPriceWithDiscount(instance: Product) {
        instance.price_with_discount = instance.price_original - (instance.price_original / 100 * instance.discount) // instance.discount/instance.price_orinal
    }


    @BeforeUpdate
    static setPriceWithDiscountUpdate(instance: Product, options:any) {
        instance.price_with_discount = instance.price_original - (instance.price_original / 100 * instance.discount) // instance.discount/instance.price_orinal
    }
}