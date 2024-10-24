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
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../dto/product/create.dto';
import { UpdateProductDto } from '../../dto/product/update.dto';
import { ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('product')
@ApiBearerAuth('jwt')
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
  @UseGuards(JwtAuthGuard)
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
  @Header('Content-Type', 'application/json')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Roles('admin')
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
  @ApiParam({
    name: 'productCode',
    description: 'The product code of the product to update',
  })
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Roles('admin')
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
  @ApiParam({
    name: 'productCode',
    description: 'The product code of the product to delete',
  })
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Roles('admin')
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
