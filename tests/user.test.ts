// import { Request, Response } from 'express';
// import { createUser } from '../src/controllers/user.controller';

// //Mock le modèle utilisateur 
// jest.mock('../src/models/user.model', () => ({
//   findOne: jest.fn(), //Mock la méthode findOne
//   create: jest.fn(), //Mock la méthode create
// }));

// //Suite de tests pour la fonction createUser
// describe('createUser', () => {
//   let req: Partial<Request>; //Variable req partiellement typée pour la requête
//   let res: Partial<Response>; //Variable res partiellement typée pour la réponse

//   //Fonction exectutée avant chaque test
//   beforeEach(() => {
//     req = { //Initialise l'objet req avec les données de test
//       body: {
//         username: 'testuser',
//         email: 'test@example.com',
//         password: 'password123',
//         role: 'citizen',
//       },
//     };
//     res = { //Initialise l'objet res avec des fonctions jest mockées
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//   });

//   //Test: créer un utilisateur si celui-ci n'existe pas déj
//   it('should create user if not exists', async () => {
//     (User.findOne as jest.Mock).mockResolvedValueOnce(null); //Mocke la méthode findOne pour simuler un utilisateur inexistant
//     (User.create as jest.Mock).mockResolvedValueOnce({ //Mocke la méthode create pour simuler la création d'un nouvel utilisateur
//       id: 1,
//       ...req.body,
//     });

//     await createUser(req as Request, res as Response); //Appelle la fonction createUser avec les objets req et res simulés

//     // Les différentes assertions pour vérifier le comportement de createUser
//     expect(User.findOne).toHaveBeenCalledWith({
//       where: { username: req.body.username, email: req.body.email },
//     });
//     expect(User.create).toHaveBeenCalledWith(req.body);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'Utilisateur créé avec succès !',
//       data: { id: 1, ...req.body },
//     });
//   });

//   it('should return 409 if user already exists', async () => {
//     (User.findOne as jest.Mock).mockResolvedValueOnce({});

//     await createUser(req as Request, res as Response);

//     expect(User.findOne).toHaveBeenCalledWith({
//       where: { username: req.body.username, email: req.body.email },
//     });

//     expect(res.status).toHaveBeenCalledWith(409);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'Un utilisateur avec le même nom d\'utilisateur ou la même adresse e-mail existe déjà.',
//     });
//   });

//   it('should return 400 on error', async () => {
//     (User.findOne as jest.Mock).mockRejectedValueOnce(new Error('Test error'));

//     await createUser(req as Request, res as Response);

//     expect(User.findOne).toHaveBeenCalledWith({
//       where: { username: req.body.username, email: req.body.email },
//     });

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'La création de l\'utilisateur a échoué.',
//     });
//   });
// });
