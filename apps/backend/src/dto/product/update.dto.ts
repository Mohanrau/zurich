import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
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
    required: false,
  })
  @IsString()
  @IsOptional()
  productDescription?: string;

  @ApiProperty({
    description: 'The location of the product',
    example: 'East Malaysia',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 450,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;
}
