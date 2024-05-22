import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo, BeforeCreate } from "sequelize-typescript"
import { Order } from "src/orders/entities/order.entity"


@Table({tableName: "users"})
export class User extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type:DataType.STRING, unique: true})
    email: string

    @Column({type: DataType.STRING, unique: false})
    username: string

    @Column({type:DataType.STRING})
    password: string

    @Column({type: DataType.TEXT, unique: true})
    activationKey: string

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isActivated: boolean

    @HasMany(() => Order)
    orders: Order[]


    @BeforeCreate
    static setActivationValues(instance:User) {
        instance.isActivated = false
    }
}