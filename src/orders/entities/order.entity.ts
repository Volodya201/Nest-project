import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript"
import { OrderItem } from "src/order-items/entities/order-item.entity"
import { User } from "src/users/entities/user.entity"


@Table({tableName: "orders"})
export class Order extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.FLOAT, defaultValue: 0, allowNull: false})
    total_sum: number

    @HasMany(() => OrderItem)
    order_items: OrderItem[]

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    user_id: number

    @BelongsTo(() => User)
    user: User
}