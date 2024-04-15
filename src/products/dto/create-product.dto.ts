import { IsNotEmpty, Length, IsUrl, IsInt, IsString } from 'class-validator'

export class CreateProductDto {
    @IsNotEmpty()
    @Length(3, 100)
    title: string

    @IsNotEmpty()
    @IsUrl()
    url_image: string

    @IsNotEmpty()
    @IsInt()
    price_orinal: number

    @IsNotEmpty()
    @IsInt()
    discount: number

    price_with_discount?: number

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsInt()
    category_id: number

    @IsString()
    consist: string
}