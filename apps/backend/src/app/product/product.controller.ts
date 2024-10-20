import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  Header,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../dto/product/create.dto';
import { UpdateProductDto } from '../../dto/product/update.dto';
import { ApiHeader, ApiQuery, ApiParam } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiQuery({
    name: 'productCode',
    required: false,
    description: 'The product code of the product',
  })
  @ApiQuery({
    name: 'location',
    required: false,
    description: 'The location where the product is offered',
  })
  async find(
    @Query('productCode') productCode?: string,
    @Query('location') location?: string
  ) {
    try {
      const products = await this.productService.findOne(productCode, location);
      return products.length > 0
        ? products
        : { message: 'No products found', statusCode: HttpStatus.NOT_FOUND };
    } catch (error) {
      throw new BadRequestException('Failed to retrieve products');
    }
  }

  @Post()
  @ApiHeader({
    name: 'role',
    description: 'The role of the user (admin, user, etc.)',
    required: true,
  })
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productService.create(createProductDto);
      return { message: 'Product created successfully', product };
    } catch (error) {
      throw new BadRequestException('Failed to create product');
    }
  }

  @Put(':productCode')
  @ApiHeader({
    name: 'role',
    description: 'The role of the user (admin, user, etc.)',
    required: true,
  })
  @ApiParam({
    name: 'productCode',
    description: 'The product code of the product to update',
  })
  async update(
    @Param('productCode') productCode: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    try {
      const result = await this.productService.update(
        productCode,
        updateProductDto
      );
      return result.affected
        ? { message: 'Product updated successfully' }
        : { message: 'Product not found', statusCode: HttpStatus.NOT_FOUND };
    } catch (error) {
      throw new BadRequestException('Failed to update product');
    }
  }

  @Delete(':productCode')
  @ApiHeader({
    name: 'role',
    description: 'The role of the user (admin, user, etc.)',
    required: true,
  })
  @ApiParam({
    name: 'productCode',
    description: 'The product code of the product to delete',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('productCode') productCode: string) {
    try {
      const result = await this.productService.remove(productCode);
      if (result.affected) {
        return { message: 'Product deleted successfully' };
      }
      return { message: 'Product not found', statusCode: HttpStatus.NOT_FOUND };
    } catch (error) {
      throw new BadRequestException('Failed to delete product');
    }
  }
}
