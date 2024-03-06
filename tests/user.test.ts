import { Request, Response } from "express";
import { createUser } from "../src/controllers/user.controller";
import User from "../src/models/user.model";

// Création des mocks pour les objets de type Request et Response
const reqMock = {} as Request;
const resMock = {
  status: jest.fn(() => resMock),
  json: jest.fn(),
} as unknown as Response;

describe('createUser', () => {
    let mockFindOne: jest.Mock;
    
    beforeEach(() => {
        mockFindOne = jest.fn().mockResolvedValue(null);
        // Mock de la méthode findOne de User
        jest.mock('../src/models/user.model', () => ({
            findOne: mockFindOne,
            create: jest.fn().mockResolvedValue({ id: 1, ...reqMock.body })
        }));
    });

    it('should create a new user if user does not already exist', async () => {
        await createUser(reqMock, resMock);

        // Vérification du statut de la réponse
        expect(resMock.status).toHaveBeenCalledWith(201);
        // Vérification des appels de méthode
        expect(mockFindOne).toHaveBeenCalledWith({ where: { username: 'testuser', email: 'testuser@example.com' } });
        expect(User.create).toHaveBeenCalledWith(reqMock.body);
        expect(resMock.json).toHaveBeenCalledWith({ message: 'Utilisateur créé avec succès !', data: { id: 1, ...reqMock.body } });
    });

    it('should return 409 if user already exists', async () => {
        // Simulation d'un utilisateur déjà existant
        mockFindOne.mockResolvedValueOnce({ id: 1, ...reqMock.body });

        await createUser(reqMock, resMock);

        // Vérification du statut de la réponse
        expect(resMock.status).toHaveBeenCalledWith(409);
        // Vérification des appels de méthode
        expect(resMock.json).toHaveBeenCalledWith({ message: 'Un utilisateur avec le même nom d\'utilisateur ou la même adresse e-mail existe déjà.' });
    });
});