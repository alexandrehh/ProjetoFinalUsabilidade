const Pet = require('../esquemas/pet');
const Usuario = require('../esquemas/usuario');

// Salva o pet no banco de dados e associa ele ao usuario logado
async function salvarPet(req, res) {
    const pet = new Pet();
    const sessaoUsuario = req.session.user[0]._id;

    const { nome_pet, raca_pet, servico_pet, data_servico } = req.body;

    pet.nome = nome_pet;
    pet.raca = raca_pet;
    pet.servico = servico_pet;
    pet.dataServico = data_servico;
    pet.usuario = sessaoUsuario;
    await pet.save((err) => {
        if (!err) {
            return res.redirect('/buscarhorario');
        } else {
            console.error(err);
            return res.status(400).send({ error: 'Houve um erro no cadastro...' });
        }
    });

    const usuario = await Usuario.findById(sessaoUsuario);
    usuario.pet.push(pet._id);
    
    return await usuario.save();
}

module.exports.salvarPet = salvarPet;