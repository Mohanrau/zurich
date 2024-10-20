import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../dto/product/create.dto';
import { UpdateProductDto } from '../../dto/product/update.dto';
import { HttpStatus, BadRequestException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    it('should return products if found', async () => {
      const result = [{ productCode: '123', location: 'A' }];
      mockProductService.findOne.mockResolvedValue(result);

      expect(await controller.find('123', 'A')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('123', 'A');
    });

    it('should return a not found message if no products found', async () => {
      mockProductService.findOne.mockResolvedValue([]);

      const response = await controller.find('123', 'A');
      expect(response).toEqual({
        message: 'No products found',
        statusCode: HttpStatus.NOT_FOUND,
      });
      expect(service.findOne).toHaveBeenCalledWith('123', 'A');
    });

    it('should handle errors during find', async () => {
      mockProductService.findOne.mockRejectedValue(
        new Error('Error finding products')
      );

      await expect(controller.find('123', 'A')).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('create', () => {
    it('should create and return the created product', async () => {
      const createProductDto: CreateProductDto = {
        productCode: '123',
        productDescription: 'SUV',
        location: 'Kelantan',
        price: 30.0,
      };
      const createdProduct = { id: 1, ...createProductDto };
      mockProductService.create.mockResolvedValue(createdProduct);

      const response = await controller.create(createProductDto);
      expect(response).toEqual({
        message: 'Product created successfully',
        product: createdProduct,
      });
      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });

    it('should handle errors during create', async () => {
      const createProductDto: CreateProductDto = {
        productCode: '123',
        productDescription: 'SUV',
        location: 'Kelantan',
        price: 30.0,
      };
      mockProductService.create.mockRejectedValue(
        new Error('Error creating product')
      );

      await expect(controller.create(createProductDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('update', () => {
    it('should update a product successfully', async () => {
      const updateProductDto: UpdateProductDto = {
        productCode: 'Updated Product',
      };
      const updateResult = { affected: 1 };
      mockProductService.update.mockResolvedValue(updateResult);

      const response = await controller.update('123', updateProductDto);
      expect(response).toEqual({ message: 'Product updated successfully' });
      expect(service.update).toHaveBeenCalledWith('123', updateProductDto);
    });

    it('should return not found message if product not updated', async () => {
      const updateProductDto: UpdateProductDto = {
        productCode: 'Updated Product',
      };
      mockProductService.update.mockResolvedValue({ affected: 0 });

      const response = await controller.update('123', updateProductDto);
      expect(response).toEqual({
        message: 'Product not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
      expect(service.update).toHaveBeenCalledWith('123', updateProductDto);
    });

    it('should handle errors during update', async () => {
      const updateProductDto: UpdateProductDto = {
        productCode: 'Updated Product',
      };
      mockProductService.update.mockRejectedValue(
        new Error('Error updating product')
      );

      await expect(controller.update('123', updateProductDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('remove', () => {
    it('should delete a product successfully', async () => {
      mockProductService.remove.mockResolvedValue({ affected: 1 });

      const response = await controller.remove('123');
      expect(response).toEqual({ message: 'Product deleted successfully' });
      expect(service.remove).toHaveBeenCalledWith('123');
    });

    it('should return not found message if product not deleted', async () => {
      mockProductService.remove.mockResolvedValue({ affected: 0 });

      const response = await controller.remove('123');
      expect(response).toEqual({
        message: 'Product not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
      expect(service.remove).toHaveBeenCalledWith('123');
    });

    it('should handle errors during remove', async () => {
      mockProductService.remove.mockRejectedValue(
        new Error('Error deleting product')
      );

      await expect(controller.remove('123')).rejects.toThrow(
        BadRequestException
      );
    });
  });
});
