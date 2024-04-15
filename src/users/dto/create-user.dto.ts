import { IsNotEmpty, Length, IsEmail, Min } from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(3, 40)
    username: string

    @IsNotEmpty()
    password: string

    activationKey: string
}
