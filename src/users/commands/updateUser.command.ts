import { UpdateUserDto } from "../dto/update-user.dto"

export class UpdateUserCommand {
    constructor(public userId:number, public user:UpdateUserDto) {}
}