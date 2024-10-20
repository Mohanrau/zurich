import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product/entity';
import { CreateProductDto } from '../../dto/product/create.dto';
import { UpdateProductDto } from '../../dto/product/update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  findOne(productCode?: string, location?: string) {
    const conditions: any = {};
    if (productCode) {
      conditions.productCode = productCode;
    }
    if (location) {
      conditions.location = location;
    }
    return this.productRepository.find({ where: conditions });
  }

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  update(productCode: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({ productCode }, updateProductDto);
  }

  remove(productCode: string) {
    return this.productRepository.delete({ productCode });
  }
}
