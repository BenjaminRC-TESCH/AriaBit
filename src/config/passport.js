const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            // Match Email's User
            const user = await User.findOne({ email: email }); //0 1

            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            // Match Password's User
            const isMatch = await User.findOne({ password: password });
            if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta' });

            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .exec()
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err, null);
        });
});
