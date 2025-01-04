import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number
}