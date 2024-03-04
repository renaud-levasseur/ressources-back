import { User, UserRole } from '../src/models/user.model';
import sequelize from '../sequelize.config';

// describe('User Model', () => {
//   beforeAll(async () => {
//     await sequelize.sync({ force: true });
//   });

//   afterAll(async () => {
//     await sequelize.close();
//   });

//   it('should create a new user', async () => {
//     const newUser = await User(sequelize).({
//       id: 1,  
//       username: 'testuser',
//       email: 'test@example.com',
//       password: 'testpassword',
//       role: UserRole.CITIZEN_USER
//     });

//     expect(newUser.username).toBe('testuser');
//     expect(newUser.email).toBe('test@example.com');
//     expect(newUser.role).toBe(UserRole.CITIZEN_USER);
//   });
// });
