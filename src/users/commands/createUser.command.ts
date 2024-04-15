import { CreateUserDto } from "../dto/create-user.dto"

export class CreateUserCommand {
    constructor(public user:CreateUserDto) {}
}