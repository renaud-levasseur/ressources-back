import { createRessource } from "../src/controllers/ressource.controller";
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
    const mockPrismaClient = {
      ressource: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    };
  
    return {
      PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
    };
});

describe('Create Ressource', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let prisma : PrismaClient;
    
    beforeAll(() => {
        prisma = new PrismaClient();
        req = {
        params: {
            userId: '1'
        },
        body: {
            title: 'testressource',
            description: 'testdescription',
            visibility: 'PUBLIC',
            category: 'testcategory',
            type: 'testtype',
            relations: 'testrelations'
        }
        };
        res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should create a new ressource', async () => {
        (prisma.ressource.findFirst as jest.Mock).mockResolvedValue(null);
        (prisma.ressource.create as jest.Mock).mockResolvedValue({});
    
        await createRessource(req as Request, res as Response);
    
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ data: {}, message: 'Ressource créé avec succès !' });
    });
    
    }
);
