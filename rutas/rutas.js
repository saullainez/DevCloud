const middlewares = require('../middlewares');
var bdconexion = require('../bd/bdconfig');
module.exports = function (app, passport) {
    app.get("/", middlewares.paginaInicio,  function (req, res) {
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
        //console.log("Get perfil");
        var nombreUsuario = req.session.user.nombre;
        var apellidoUsuario = req.session.user.apellido;
        var aliasUsuario = req.session.user.alias;
        res.render('perfil', { 
            nombreUsuario: nombreUsuario, 
            apellidoUsuario: apellidoUsuario, 
            aliasUsuario: aliasUsuario,
            message: req.flash('mensaje-login') });
    });

    app.get('/logout', function (req, res) {
        req.session.destroy();
        req.logout();
        res.redirect('/signin');
    });

    app.get("/datosperfil", middlewares.isAuthenticated, function(req, res,next){
        bdconexion.query(`select a.nombre, a.apellido, a.correo, a.alias,
                        b.tipo, b.proyectosPlan
                        from usuarios a
                        inner join plan b
                        on(a.idPlan = b.idPlan)
                        where a.Id = ?;`,
                        [req.session.user.Id],
                        function(error, data, fields){
                            if(error) res.send(error);
                            res.send(data);
                            res.end();
                        });
    });

    app.post("/datosperfil", function(req, res){
        bdconexion.query(`update usuarios set correo = ?, alias = ? where Id = ?;`,
        [req.body.correo, req.body.alias, req.session.user.Id],
        function(error, data, fields){
            if(error) res.send(error);
            res.send(data);
            res.end();
        })
    });

    app.post("/actualizarplan", function(req, res){
        console.log(req.body.plan);
        bdconexion.query(`update usuarios set idPlan = ? where Id = ?`,
        [req.body.plan, req.session.user.Id],
        function(error, data, fields){
            if (error) res.send(error);
            res.send(data);
            res.end();
        })
    });

}
