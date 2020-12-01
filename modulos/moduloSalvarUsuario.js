const Usuario = require('../esquemas/usuario');

// Salva o cadastro do usuario no banco de dados
async function salvarUsuario(req, res) {
    const usuario = new Usuario();

    const { email, name, lastname, password } = req.body;

    try {
        if (await Usuario.findOne({ email })) {
            return res.status(400).send({ error: 'Usuario já existe...' });
        }

        usuario.email = email;
        usuario.nome = name;
        usuario.sobrenome = lastname;
        usuario.senha = password;
        await usuario.save((err) => {
            if (!err) {
                return res.redirect('/');
            } else {
                return console.log('Ocorreu um erro durante o cadastro do usuario: ' + err);
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Houve um erro no cadastro...' });
    }
}

module.exports.salvarUsuario = salvarUsuario;