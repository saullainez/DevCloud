var LocalStrategy = require('passport-local').Strategy;
var bdconexion = require('./bd/bdconfig');
var session = require("express-session");
//var app = express();




module.exports = function (app, passport) {
    app.use(session({ secret: "ASDFE$%#%", resave: true, saveUninitialized: true }));//Usar express-session
    app.use(passport.initialize());//Inicializar passport
    app.use(passport.session());//Inicializar passport session
    passport.use('local', new LocalStrategy({
        usernameField: 'correo',
        passwordField: 'contrasena',
        passReqToCallback: true
    }, function (req, correo, contrasena, done) {
        bdconexion.query("SELECT Id, Nombre, correo FROM usuarios WHERE contrasena = sha1(?) and correo=?",
            [contrasena, correo],
            function (error, data, fields) {
                console.log(data);
                if (error) {
                    return done(error);
                } else {
                    if (data.length <= 0) {
                        return done();
                    } else {
                        req.session.user = data[0];
                        return done(null, data[0]);
                    }
                }
            });
    }
    ));

    passport.use('local-registro', new LocalStrategy({
        usernameField: 'correo',
        passwordField: 'contrasena',
        passReqToCallback: true
    }, function (req, correo, contrasena, done) {
        bdconexion.query("SELECT Id, Nombre, correo FROM usuarios WHERE correo=?",
            [req.body.correo],
            function (error, data, fields) {
                if (error)
                    return done(error);
                else {
                    if (data.length == 1)
                        return done();
                    else {
                        bdconexion.query("INSERT INTO usuarios (Nombre, contrasena, correo, apellido, alias, idPlan) VALUES (?,SHA1(?),?,?,?,?)",
                            [req.body.nombre, contrasena, correo, req.body.apellido, req.body.alias, req.body.idPlan],
                            function (error, data, fields) {
                                if (error) {
                                    return done(error);
                                } else {
                                    //req.session.user.id = data.insertId;
                                    bdconexion.query("SELECT * FROM usuarios WHERE id =?",
                                        [data.insertId],
                                        function (error, data, fields) {
                                            console.log(data);
                                            if (error) {
                                                return done(error);
                                            } else {
                                                if (data.length <= 0) {
                                                    return done();
                                                } else {
                                                    req.session.user = data[0];
                                                    return done(null, data[0]);
                                                }
                                            }
                                        });
                                }
                            });
                    }
                }
            })
    }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

}

