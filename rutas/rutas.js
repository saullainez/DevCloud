const middlewares = require('../middlewares');
module.exports = function (app, passport) {
    app.get("/", middlewares.paginaInicio,  function (req, res) {
        /*if (req.session.user)
            res.render('home');
        res.render('index');*/
        res.render('index');
    });

    app.get("/signin", middlewares.loginRegistro, function (req, res) {
        res.render('signin', { message: req.flash('message') });

    });

    app.get("/registrarse", middlewares.loginRegistro, function (req, res) {
        res.render('registrarse', { message: req.flash('mensaje-login') });
    });

    app.post("/signin", passport.authenticate('local', {
        successRedirect: '/exitoso',
        failureRedirect: '/falloUsuarioPass',
        failureFlash: true
    }), function (req, res, info) {
        //res.render('prueba', { title: 'Pug', mensaje: 'Inicio de sesión exitoso'});
    });

    app.post("/registrarse", passport.authenticate('local-registro', {
        successRedirect: '/registroexitoso',
        failureRedirect: '/falloregistro',
        failureFlash: true
    }), function (req, res, info) {
        //res.render('prueba', { title: 'Pug', mensaje: 'Inicio de sesión exitoso'});
    });

    app.get("/falloUsuarioPass", function (req, res) {
        req.flash('message', "Nombre de usuario o contraseña incorrectos");
        res.redirect("/signin");
    });

    app.get("/falloregistro", function (req, res) {
        req.flash('mensaje-login', 'Ese correo electrónico ya está registrado');
        res.redirect("/registrarse");
    });

    app.get("/registroexitoso", function (req, res) {
        req.flash('mensaje-login', '¡Bienvenido(a) a la familia DevCloud');
        res.redirect("/perfil");
    });

    app.get("/exitoso", function (req, res) {
        req.flash('message', '¡Inicio de sesión exitoso!');
        res.redirect("/dashboard");
    });
    app.get("/iniciarsesion", function (req, res) {
        req.flash('message', 'Necesitas iniciar sesión para acceder a esta página');
        res.redirect("/signin");
    });
    app.get('/dashboard', middlewares.isAuthenticated, function (req, res, netx) {
        var nombreUsuario = req.session.user.Nombre;
        res.render('dashboard', { nombreUsuario: nombreUsuario, message: req.flash('message') });
    });
    app.get('/perfil', middlewares.isAuthenticated, function (req, res, netx) {
        var nombreUsuario = req.session.user.Nombre;
        res.render('perfil', { nombreUsuario: nombreUsuario, message: req.flash('mensaje-login') });
    });

    app.get('/logout', function (req, res) {
        req.session.destroy();
        req.logout();
        res.redirect('/signin');
    });

}
