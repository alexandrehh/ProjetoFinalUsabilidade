const Usuario = require('../esquemas/usuario');

// Salva a sessão de login do usuario
async function salvarLoginUsuario(req, res) {
    const { email, password } = req.body;
    
    if(email && password) {
        try {
            const usuario = await Usuario.find({ email: email, senha: password });
            const validarUsuario = usuario[0].email === email && usuario[0].senha === password;

            console.log(validarUsuario);
            if(validarUsuario) {
                req.session.user = usuario;
                console.log(usuario);
                return res.redirect("/buscarhorario");
            }
        } catch (err) {
            console.error(err);
            return res.status(400).send('Email ou senha inválidos!');
        }
    }
    console.log('caiu aqui');

    return res.redirect("/");  
}   

module.exports.salvarLoginUsuario = salvarLoginUsuario;