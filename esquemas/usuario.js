const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    pet: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;