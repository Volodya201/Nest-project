import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { Order } from "src/orders/entities/order.entity"
import { Product } from "src/products/entities/product.entity"

@Table({tableName: "order-items"})
export class OrderItem extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    count: number




    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, allowNull: false})
    product_id: number

    @BelongsTo(() => Product)
    product: Product

    
    @ForeignKey(() => Order)
    @Column({type: DataType.INTEGER, allowNull: false})
    order_id: number


    @BelongsTo(() => Order)
    order: Order


    indexes: [
        {
           unique: true,
           fields: ['product_id', 'order_id', 'count'],
        }
    ]
}