const moduloSalvarHorario = {}

moduloSalvarHorario.listaHorarios = [];

let salvarHorario = (horario) => {

    if(moduloSalvarHorario.listaHorarios.length > 0) {        
        for(let i=0; i < moduloSalvarHorario.listaHorarios.length; i++) {               
            if(moduloSalvarHorario.listaHorarios[i].dataHora === horario.dataHora) {
                return 'Este horário não esta disponivel!';
            } else {
                moduloSalvarHorario.listaHorarios.push(horario);
                return 'Horário salvo com sucesso!';
            }
        }
    } else {
        moduloSalvarHorario.listaHorarios.push(horario);    
        return 'Horário salvo com sucesso!';
    }   
}

let removerAgendamento = (obj) => {
    
    if(moduloSalvarHorario.listaHorarios.length > 0) {
        for(let i=0; i < moduloSalvarHorario.listaHorarios.length; i++) {
            let dataHoraPet = moduloSalvarHorario.listaHorarios[i].nomePet + ' - ' + moduloSalvarHorario.listaHorarios[i].dataHora;                     

            if(dataHoraPet === obj.horarioRemover) {                                              
                moduloSalvarHorario.listaHorarios.splice(i, 1);                                 
                break;                 
            }
        }
    }
}

moduloSalvarHorario.removerAgendamento = removerAgendamento;

moduloSalvarHorario.salvarHorario = salvarHorario;

module.exports = moduloSalvarHorario;