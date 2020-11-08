const moduloBuscarAgendamento = {}

moduloBuscarAgendamento.listaHorarios = [];
moduloBuscarAgendamento.listaHorarioEncontrados = [];

let buscarAgendamento = (nomePetFiltro) => {      
 
    moduloBuscarAgendamento.listaHorarioEncontrados = [];
    let horarios = moduloBuscarAgendamento.listaHorarios;          
            
    if(horarios.length > 0) {        
        for(let i=0; i < horarios.length; i++) {        
            if(horarios[i].nomePet === nomePetFiltro) {                
                moduloBuscarAgendamento.listaHorarioEncontrados.push(horarios[i]);               
            } 
        }       
    } 
    
    return moduloBuscarAgendamento.listaHorarioEncontrados;
}

moduloBuscarAgendamento.buscarAgendamento = buscarAgendamento;

module.exports = moduloBuscarAgendamento;