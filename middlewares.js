const middlewares = {
    isAuthenticated: function (req, res, next) {
        if (req.session.user)
            return next();

        res.redirect('/iniciarsesion');
    },
    loginRegistro: function (req, res, next) {
        if (!req.session.user)
            return next();
        res.redirect('/dashboard');
    },
    paginaInicio: function(req, res,next){
        if (!req.session.user)
            return next();
        res.render('home');
    }
};
module.exports = middlewares;