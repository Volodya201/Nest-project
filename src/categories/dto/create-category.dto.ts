import { IsNotEmpty, Length, IsUrl } from 'class-validator'

export class CreateCategoryDto {
    @IsNotEmpty()
    @Length(3, 50)
    title: string

    @IsNotEmpty()
    @IsUrl()
    urlImage: string
}