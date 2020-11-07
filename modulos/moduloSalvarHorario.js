const moduloSalvarHorario = {}

moduloSalvarHorario.listaHorarios = [];

let salvarHorario = (horario) => {
    moduloSalvarHorario.listaHorarios.push(horario);    
    return 'Horário salvo com sucesso!';
}

let removerAgendamento = (obj) => {
    
    if(moduloSalvarHorario.listaHorarios.length > 0) {
        for(let i=0; i < moduloSalvarHorario.listaHorarios.length; i++) {
            let dataHoraPet = moduloSalvarHorario.listaHorarios[i].nomePet + ' - ' + moduloSalvarHorario.listaHorarios[i].dataHora;                  
                        
            if(dataHoraPet.includes(obj.horarioRemover)) {                
                moduloSalvarHorario.listaHorarios.splice(i, 1);                
            }
        }
    }
}

moduloSalvarHorario.removerAgendamento = removerAgendamento;

moduloSalvarHorario.salvarHorario = salvarHorario;

module.exports = moduloSalvarHorario;