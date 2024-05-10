import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { 
          email
        }
      });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Sérialiser l'utilisateur dans la session
passport.serializeUser((user: any, done) => {
  done(null, user.id_user);
});

// Désérialiser l'utilisateur dans la session
passport.deserializeUser(async (id_user: number, done) => {
  const user = await prisma.user.findUnique({ where: { id_user } });
  done(null, user);
});
  
export default passport;
