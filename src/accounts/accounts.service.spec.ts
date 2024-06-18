import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AccountsService', () => {
  let service: AccountsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: PrismaService,
          useValue: {
            account: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAccount', () => {
    it('should create an account', async () => {
      const accountDto = { email: 'test@example.com', name: 'Test Account' };
      const createdAccount = {
        id: 1,
        ...accountDto,
      };

      jest.spyOn(prisma.account, 'create').mockResolvedValue(createdAccount);

      expect(await service.createAccount(accountDto)).toEqual(createdAccount);
      expect(prisma.account.create).toHaveBeenCalledWith({ data: accountDto });
    });
  });

  describe('getAccountById', () => {
    it('should return a account by ID', async () => {
      const account = {
        id: 1,
        email: 'test@example.com',
        name: 'Test Account',
      };

      jest.spyOn(prisma.account, 'findUnique').mockResolvedValue(account);

      expect(await service.getAccountById({ id: 1 })).toEqual(account);
      expect(prisma.account.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if account not found', async () => {
      jest.spyOn(prisma.account, 'findUnique').mockResolvedValue(null);

      expect(await service.getAccountById({ id: 1 })).toBeNull();
      expect(prisma.account.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('updateAccount', () => {
    it('should return the updated account', async () => {
      const account = {
        id: 1,
        email: 'test@example.com',
        name: 'Test Account',
      };

      const updateQuery = {
        data: { name: account.name },
        where: { id: account.id },
      };

      jest.spyOn(prisma.account, 'update').mockResolvedValue(account);

      expect(await service.updateAccount(updateQuery)).toEqual(account);
      expect(prisma.account.update).toHaveBeenCalledWith(updateQuery);
    });

    it('should return null if account not found', async () => {
      jest.spyOn(prisma.account, 'findUnique').mockResolvedValue(null);

      expect(await service.getAccountById({ id: 1 })).toBeNull();
      expect(prisma.account.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('deleteAccount', () => {
    it('should return the deleted account', async () => {
      const account = {
        id: 1,
        email: 'test@example.com',
        name: 'Test Account',
      };

      jest.spyOn(prisma.account, 'delete').mockResolvedValue(account);

      expect(await service.deleteAccount({ id: account.id })).toEqual(account);
      expect(prisma.account.update).toHaveBeenCalledWith({ id: account.id });
    });
  });
});
