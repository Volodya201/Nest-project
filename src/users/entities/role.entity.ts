import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript"
import { UserRoles } from "src/users/entities/UserRoles.entity"


@Table({tableName: "roles"})
export class Role extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type:DataType.STRING, unique: true})
    role: string

    @HasMany(() => UserRoles)
    users: UserRoles[]
}