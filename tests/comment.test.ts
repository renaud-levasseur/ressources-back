// import { Request, Response } from 'express';

// // Mock le modèle Comment
// jest.mock('../src/models/comment.model', () => ({
//   create: jest.fn(), // Mock la méthode create
// }));

// // Suite de tests pour la fonction createComment
// describe('createComment', () => {
//   let req: Partial<Request>; // Variable req partiellement typée pour la requête
//   let res: Partial<Response>; // Variable res partiellement typée pour la réponse

//   // Fonction exécutée avant chaque test
//   beforeEach(() => {
//     req = { // Initialise l'objet req avec les données de test
//       body: {
//         content: 'Ceci est un commentaire',
//         publishedAt: new Date()
//       },
//     };
//     res = { // Initialise l'objet res avec des fonctions jest mockées
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//   });

//   // Test : créer un commentaire avec succès
//   it('should create a comment successfully', async () => {
//     (Comment.create as jest.Mock).mockResolvedValueOnce({ // Mocke la méthode create pour simuler la création d'un nouveau commentaire
//       commentId: 1,
//       ...req.body,
//     });

//     await createComment(req as Request, res as Response); // Appelle la fonction createComment avec les objets req et res simulés

//     // Les différentes assertions pour vérifier le comportement de createComment
//     expect(Comment.create).toHaveBeenCalledWith(req.body);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'Commentaire créé avec succès !',
//       data: { commentId: 1, ...req.body },
//     });
//   });

//   // Test : retourner une erreur 400 en cas d'échec de création de commentaire
//   it('should return 400 on error', async () => {
//     (Comment.create as jest.Mock).mockRejectedValueOnce(new Error('Test error')); // Mocke la méthode create pour simuler une erreur

//     await createComment(req as Request, res as Response);

//     expect(Comment.create).toHaveBeenCalledWith(req.body);
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       error: 'La création du commentaire a échoué.',
//     });
//   });
// });