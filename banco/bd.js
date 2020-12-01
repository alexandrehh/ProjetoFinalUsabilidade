const mongoose = require('mongoose');

// Conexão com o banco de dados
const conectarBD = async () => {
  await mongoose.connect('mongodb+srv://admin:admin@petumhorario.kr7dy.mongodb.net/petumhorario?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    console.log("Conectado no MongoDB!");
  }).catch((err) => {
    console.error('Error: Falha na conexão... ' + err);
  });
}

module.exports = conectarBD;