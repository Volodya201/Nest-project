import { IsFQDN, IsNotEmpty, Length } from 'class-validator'

export class UpdateCategoryDto {
    @IsNotEmpty()
    @Length(3, 50)
    title: string

    @IsNotEmpty()
    //@IsFQDN() // IDK what it always say urlImage isnt correct
    urlImage: string
}