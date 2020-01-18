import { userApi } from '../api/user/controller';
import { Strategy as LocalStrategy} from 'passport-local';

const isValidPassword = (user, password) => user.password === password;

export const setLocalStrategy = (passport) => {
  passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
    userApi.findUser(email, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('User does not exist');
        return done(null, false, {message: 'User does not exist'})
      }
      if (!isValidPassword(user, password)){
        console.log('Invalid Password');
        return done(null, false, null);
      }
      return done(null, user);
    })
  }))
  
  // serialize user object
  passport.serializeUser(function (user, done) {
    done(null, user.email);
  });

  // deserialize user object
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

}