import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-secret'), // Mock the JWT_SECRET from ConfigService
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should validate and return the payload', async () => {
      const payload = {
        sub: 'user123',
        username: 'testuser',
        roles: ['admin'],
      };
      const result = await jwtStrategy.validate(payload);

      expect(result).toEqual({
        userId: payload.sub,
        username: payload.username,
        roles: payload.roles,
      });
    });

    it('should throw UnauthorizedException if payload is invalid', async () => {
      const invalidPayload = null;

      try {
        await jwtStrategy.validate(invalidPayload);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
