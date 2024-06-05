import { IsNotEmpty, Length, IsUrl } from 'class-validator'

export class CreateApplicationDto {
    user_id: number
    wish: string
    checked?: boolean
}