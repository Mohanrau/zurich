import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The code of the product',
    example: '1000',
  })
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'SUV',
  })
  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @ApiProperty({
    description: 'The location of the product',
    example: 'West Malaysia',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 300,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
