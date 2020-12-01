const express = require("express");
const app = express();

let port = (process.env.PORT || 3000);

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const moduloSalvarHorario = require("./modulos/moduloSalvarHorario");
const moduloBuscarAgendamento = require("./modulos/moduloBuscarAgendamento");
const moduloSalvarUsuario = require("./modulos/moduloSalvarUsuario");
const moduloSalvarLoginUsuario = require("./modulos/moduloSalvarLoginUsuario");
const moduloSalvarPet = require("./modulos/moduloSalvarPet");
const { redirecionarLogin, redirecionarHorarios } = require("./modulos/moduloSessaoMiddleware");
const { formatarData } = require('./public/js/formatarData');

// Conexão com banco de dados
const conectarBD = require('./banco/bd');
conectarBD();

const Pet = require('./esquemas/pet');

// Usar EJS como view engine
app.set('view engine', 'ejs');

// Configuração do express-session
const session = require('express-session');
app.use(session({
    name: 'usuario',
    resave: false,
    saveUninitialized: false,
    secret: 'adiel gente boa',
    cookie: {
      maxAge: 7200000,
      sameSite: true,
      secure: false,
    }
}));

/**URL projeto */

app.listen(port, () => {
    console.log('Servidor rodando em -> http://localhost:' + port);
});

/**EndPoint inicial */ 
app.get("/", redirecionarHorarios, (req, res) => {   
    res.sendFile(__dirname + "/html/login.html");
});

app.post("/", redirecionarHorarios, (req, res) => {   
    moduloSalvarLoginUsuario.salvarLoginUsuario(req, res);    
});

// **Cadastro de Usuario** //
app.get("/cadastro", redirecionarHorarios, (req,res) => {   
    res.sendFile(__dirname + "/html/cadastro.html"); 
    console.log('caiu aqui get');
});

app.post("/cadastro", redirecionarHorarios, async (req, res) => {
    console.log('caiu aqui post');    
    moduloSalvarUsuario.salvarUsuario(req, res);
});

// **Logout de Usuario** //
app.post('/logout', redirecionarLogin, (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.error('Ocorreu um erro ao fazer logout...' + err);
            return res.redirect('/');
        }
    
        res.clearCookie('usuario');
        return res.redirect('/');
    });
});

/**EndPoint Agendamento */ 

app.get("/agendamento", redirecionarLogin, (req,res) => {   
    console.log(req.session.user[0]._id);
    res.sendFile(__dirname + "/html/agendamento.html");       
});

app.post("/agendamento", (req, res) => {
    moduloSalvarPet.salvarPet(req, res);
});

/**EndPoint Buscar Horarios */

app.get("/buscarhorario", redirecionarLogin, async (req, res) => {
    try {
        const sessaoUsuario = req.session.user[0]._id;

        const pet = await Pet.find({ usuario: sessaoUsuario });

        res.render(__dirname + '/html/buscarAgendamento.ejs', { 
            pets: pet,
            formatarData: formatarData
        });
    } catch (err) {
        console.error(err);
    }
});

app.get("/buscarhorario/:nomePet", redirecionarLogin, (req, res) => {    
    // let nomePetFiltro = req.params.nomePet;    
    // moduloBuscarAgendamento.listaHorarios = moduloSalvarHorario.listaHorarios;   
    
    // let horarioEncontrado = moduloBuscarAgendamento.buscarAgendamento(nomePetFiltro);
    
    // if(horarioEncontrado.length > 0) {        
    //     res.status(200).send(horarioEncontrado);
    // } else {
    //     res.status(404).send('Não foi encontrado nenhum horário para este Pet!');
    // }
    const nomePet = req.params.nomePet;

    
});

/**EndPoint Salvar Horario */

app.post("/novoagendamento", redirecionarLogin, (req, res) => {
    let horario = req.body;
    res.status(200).send(moduloSalvarHorario.salvarHorario(horario));
});

/**EndPoint Remover Horario */

app.delete("/remover", redirecionarLogin, (req, res) => {
    let horarioRemover = req.body;      
    res.send(moduloSalvarHorario.removerAgendamento(horarioRemover));
})