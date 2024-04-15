import { IsNotEmpty, Length, IsEmail } from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(3, 40)
    username: string

    @IsNotEmpty()
    @Length(8, 32)
    password: string
}
