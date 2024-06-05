import { CreateApplicationDto } from "../dto/create-application.dto";

export class CreateApplicationCommand {
    constructor(public application:CreateApplicationDto) {}
}