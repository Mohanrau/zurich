import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../entities/product/entity';
import { CreateProductDto } from '../../dto/product/create.dto';
import { UpdateProductDto } from '../../dto/product/update.dto';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  const mockProductRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = [{ productCode: '123', name: 'Test Product' }];
      mockProductRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by code and location', async () => {
      const result = { productCode: '123', location: 'Warehouse A' };
      mockProductRepository.find.mockResolvedValue([result]);

      expect(await service.findOne('123', 'Warehouse A')).toEqual([result]);
      expect(repository.find).toHaveBeenCalledWith({
        where: { productCode: '123', location: 'Warehouse A' },
      });
    });

    it('should return a product by code only', async () => {
      const result = { productCode: '123', location: 'Warehouse A' };
      mockProductRepository.find.mockResolvedValue([result]);

      expect(await service.findOne('123')).toEqual([result]);
      expect(repository.find).toHaveBeenCalledWith({
        where: { productCode: '123' },
      });
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        productCode: '123',
        productDescription: 'SUV',
        location: 'Kelantan',
        price: 20.0,
      };
      const result = { id: 1, ...createProductDto };

      mockProductRepository.create.mockReturnValue(result);
      mockProductRepository.save.mockResolvedValue(result);

      expect(await service.create(createProductDto)).toEqual(result);
      expect(repository.create).toHaveBeenCalledWith(createProductDto);
      expect(repository.save).toHaveBeenCalledWith(result);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        productCode: 'Updated Product',
      };
      const result = { affected: 1 };

      mockProductRepository.update.mockResolvedValue(result);

      expect(await service.update('123', updateProductDto)).toEqual(result);
      expect(repository.update).toHaveBeenCalledWith(
        { productCode: '123' },
        updateProductDto
      );
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const result = { affected: 1 };

      mockProductRepository.delete.mockResolvedValue(result);

      expect(await service.remove('123')).toEqual(result);
      expect(repository.delete).toHaveBeenCalledWith({ productCode: '123' });
    });
  });
});
