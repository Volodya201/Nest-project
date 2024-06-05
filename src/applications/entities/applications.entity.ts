import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { User } from "../../users/entities/user.entity"

@Table({tableName: "applications"})
export class Application extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.TEXT, allowNull: false})
    wish: string

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    checked: boolean

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    user_id: number

    @BelongsTo(() => User)
    user: User
}