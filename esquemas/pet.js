const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    raca: {
        type: String,
        required: true
    },
    servico: {
        type: String,
        required: true
    },
    dataServico: {
        type: Date,
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;