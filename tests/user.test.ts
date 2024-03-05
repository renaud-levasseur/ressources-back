import { Request, Response } from "express";
import { createUser } from "../src/controllers/userController";
import User from "../src/models/user.model";

describe("createUser", () => {
    it("should create a new user", async () => {
        const mockUser = {
        id: 1,
        username: "testUser",
        email: "testuser@example.com",
        password: "password123",
        role: "citizen"
        };

        const mockRequest = {
        body: mockUser
        } as Request;

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const mockCreate = jest.spyOn(User, 'create').mockResolvedValueOnce(mockUser as any);

        await createUser(mockRequest, mockResponse);

        expect(mockResponse.status).toBe(201);
        expect(mockResponse.json).toBe({ message: 'Utilisateur créé avec succès !', data: mockUser });
    });
});
