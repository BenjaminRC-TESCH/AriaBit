const usersCtrl = {};

const passport = require('passport');
const User = require('../models/users');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('auth/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const { first_name, last_name, address, phone, email, password, confirm_password } = req.body;

    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 8) {
        errors.push({ text: 'La contraseña debe tener almenos 8 caracteres' });
    }
    if (errors.length > 0) {
        res.render('auth/signup', {
            errors,
            first_name,
            last_name,
            address,
            phone,
            email,
            password,
            confirm_password,
        });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'El email ya esta registrado');
            res.redirect('/auth/signup');
        } else {
            const position = 'Cliente';
            const newUser = new User({
                first_name,
                last_name,
                address,
                phone,
                email,
                password,
                position,
            });

            await newUser.save();
            req.flash('success_msg', 'Usuario registrado satisfactoriamente');
            res.redirect('/auth/signin');
        }
    }
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('auth/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/auth/signin',
    successRedirect: '/',
    failureFlash: true,
});

usersCtrl.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            // Manejo del error si lo deseas
            console.error(err);
        }
        req.flash('success_msg', 'Sesión cerrada');
        res.redirect('/auth/signin');
    });
};

module.exports = usersCtrl;
