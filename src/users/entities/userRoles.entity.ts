import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo, BeforeCreate } from "sequelize-typescript"
import { User } from "src/users/entities/user.entity"
import { Role } from "src/users/entities/role.entity"


@Table({tableName: "usersRoles"})
export class UserRoles extends Model {

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number

    @BelongsTo(() => User)
    user: User


    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    role_id: number

    @BelongsTo(() => Role)
    role: Role
}