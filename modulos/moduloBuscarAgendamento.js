const moduloBuscarAgendamento = {}

moduloBuscarAgendamento.listaHorarios = [];
moduloBuscarAgendamento.listaHorarioEncontrados = [];

let buscarAgendamento = (nomePetFiltro) => {      
 
    let horarios = moduloBuscarAgendamento.listaHorarios;          
            
    if(horarios.length > 0) {        
        for(let i=0; i < horarios.length; i++) {        
            if(horarios[i].nomePet === nomePetFiltro) {                
                return horarios[i];                
            } 
        }       
    } 
}

moduloBuscarAgendamento.buscarAgendamento = buscarAgendamento;

module.exports = moduloBuscarAgendamento;