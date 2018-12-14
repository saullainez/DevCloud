var path = require("path");
module.exports = function (app, passport) {
    app.get("/", paginaInicio, function (req, res, next) {
        res.render('dashboard');
    });

    app.get("/signin", function (req, res) {
        res.render('signin', { message: req.flash('message') });

    });

    app.get("/registrarse", function (req, res) {
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
        successRedirect: '/exitoso',
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
        req.flash('mensaje-login', 'Bienvenido a la familia DevCloud');
        res.redirect("/dashboard");
    });

    app.get("/exitoso", function (req, res) {
        req.flash('message', '¡Inicio de sesión exitoso!');
        res.redirect("/dashboard");
    });
    app.get("/iniciarsesion", function (req, res) {
        req.flash('message', 'Necesita iniciar sesión para acceder a esta página');
        res.redirect("/signin");
    });
    app.get('/dashboard', isAuthenticated, function (req, res, netx) {
        var nombreUsuario = req.session.user.Nombre;
        res.render('dashboard', { nombreUsuario: nombreUsuario, message: req.flash('message') });
    });

    app.get('/logout', function (req, res) {
        req.session.destroy();
        req.logout();
        res.redirect('/signin');
    });



    function isAuthenticated(req, res, next) {
        if (req.session.user)
            return next();

        res.redirect('/iniciarsesion');
    }
    function paginaInicio(req, res, next) {
        if (req.session.user)
            res.render('dashboard');
        res.sendFile(path.join(__dirname, '../public/vistas', 'index.html'));
    }

}
