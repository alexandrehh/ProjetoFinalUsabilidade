// Middlewares para redirecionamento de acordo com a sessão de usuario atual
const redirecionarHorarios = (req, res, next) => {
    if(req.session.user) {
        res.redirect('/buscarhorario');
    } else {
        next();
    }
}
  
const redirecionarLogin = (req, res, next) => {
    if(!req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}
  
module.exports = {
    redirecionarHorarios: redirecionarHorarios,
    redirecionarLogin: redirecionarLogin
}