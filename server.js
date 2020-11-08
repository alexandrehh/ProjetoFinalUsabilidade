const express = require("express");
const app = express();

let port = (process.env.PORT || 3000);

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const moduloSalvarHorario = require("./modulos/moduloSalvarHorario");
const moduloBuscarAgendamento = require("./modulos/moduloBuscarAgendamento");

/**URL projeto */

app.listen(port, () => {
    console.log('Servidor rodando em -> http://localhost:' + port);
});

/**EndPoint inicial */ 

app.get("/", (req,res) =>{   
    res.sendFile(__dirname + "/html/login.html");       
});

/**EndPoint Agendamento */ 

app.get("/agendamento", (req,res) =>{   
    res.sendFile(__dirname + "/html/agendamento.html");       
});

/**EndPoint Buscar Horarios */

app.get("/buscarhorario", (req, res) => {
    res.sendFile(__dirname + '/html/buscarAgendamento.html');
});

app.get("/buscarhorario/:nomePet", (req, res) => {    
    let nomePetFiltro = req.params.nomePet;    
    moduloBuscarAgendamento.listaHorarios = moduloSalvarHorario.listaHorarios;   
    
    let horarioEncontrado = moduloBuscarAgendamento.buscarAgendamento(nomePetFiltro);
    
    if(horarioEncontrado.length > 0) {        
        res.status(200).send(horarioEncontrado);
    } else {
        res.status(404).send('Não foi encontrado nenhum horário para este Pet!');
    }
});

/**EndPoint Salvar Horario */

app.post("/novoagendamento", (req, res) => {
    let horario = req.body;
    res.status(200).send(moduloSalvarHorario.salvarHorario(horario));
});

/**EndPoint Remover Horario */

app.delete("/remover", (req, res) => {
    let horarioRemover = req.body;      
    res.send(moduloSalvarHorario.removerAgendamento(horarioRemover));
})