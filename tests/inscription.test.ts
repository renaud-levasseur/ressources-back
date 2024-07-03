import { Request, Response } from 'express';
import { inscription } from '../src/controllers/auth/inscription.controller';
import { PrismaClient } from '@prisma/client';

  // Mock Prisma client
jest.mock('@prisma/client', () => { 
    const mockPrismaClient = {
      user: { 
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    };
  
    return {
      PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
    };
});

  //Tests du module inscription
describe('Inscription', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let prisma : PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
    req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  //Reset des mocks après chaque test
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Premier test
  it('should create a new user', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({});

    await inscription(req as Request, res as Response, jest.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur crée avec succès' });
  });

  //Second test
  it('should handle existing user', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({});

    await inscription(req as Request, res as Response, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('Utilisateur ou email déjà existant');
  });
});
