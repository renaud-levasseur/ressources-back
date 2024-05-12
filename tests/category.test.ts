// import { Request, Response } from 'express';

// //Mock le modèle
// jest.mock('../src/models/category.model', () => ({
//   findOne: jest.fn(), //Mock la méthode findOne
//   create: jest.fn(), //Mock la méthode create
// }));

// //Suite de tests pour la fonction createCategory
// describe('createCategory', () => {
//   let req: Partial<Request>; //Variable req partiellement typée pour la requête
//   let res: Partial<Response>; //Variable res partiellement typée pour la réponse

//   //Fonction exectutée avant chaque test
//   beforeEach(() => {
//     req = { //Initialise l'objet req avec les données de test
//       body: {
//         name: 'Sport',
//         description: 'Ressource concernant le sujet du sport'
//       },
//     };
//     res = { //Initialise l'objet res avec des fonctions jest mockées
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//   });

//   //Test: créer une catégorie si celle-ci n'existe pas déjà
//   it('should create category if not exists', async () => {
//     (Category.findOne as jest.Mock).mockResolvedValueOnce(null); //Mocke la méthode findOne pour simuler une categorie inexistant
//     (Category.create as jest.Mock).mockResolvedValueOnce({ //Mocke la méthode create pour simuler la création d'une nouvelle categorie
//       id: 1,
//       ...req.body,
//     });

//     await createCategory(req as Request, res as Response); //Appelle la fonction createCategory avec les objets req et res simulés

//     // Les différentes assertions pour vérifier le comportement de createCategory
//     expect(Category.findOne).toHaveBeenCalledWith({
//       where: { name: req.body.name },
//     });
//     expect(Category.create).toHaveBeenCalledWith(req.body);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'Catégorie créé avec succès !',
//       data: { id: 1, ...req.body },
//     });
//   });

//   it('should return 409 if category already exists', async () => {
//     (Category.findOne as jest.Mock).mockResolvedValueOnce({});

//     await createCategory(req as Request, res as Response);

//     expect(Category.findOne).toHaveBeenCalledWith({
//       where: { name: req.body.name },
//     });

//     expect(res.status).toHaveBeenCalledWith(409);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'Une catégorie avec le même nom existe déjà.',
//     });
//   });

//   it('should return 400 on error', async () => {
//     (Category.findOne as jest.Mock).mockRejectedValueOnce(new Error('Test error'));

//     await createCategory(req as Request, res as Response);

//     expect(Category.findOne).toHaveBeenCalledWith({
//       where: { name: req.body.name },
//     });

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       error: 'La création de la catégorie a échoué.',
//     });
//   });
// });