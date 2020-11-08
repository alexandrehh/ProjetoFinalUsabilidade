$(document).ready(() => {       

    $('#buscar-horario').on('click', () => {
        let nomePet = $('#input-buscar-horario').val();

        if(nomePet === '') {
            alert('O campo de busca esta vazio, digite o nome do seu Pet!');
        } else {
            buscarHorarioPet(nomePet);
        }
    });

    $('#novo-agendamento').on('click', () => {
        window.location.href = '/agendamento';
    })

    function buscarHorarioPet(nomePet) {
        $.ajax({
            url: '/buscarhorario/' + nomePet,
            success: (response) => {
                removerValoresDaTabela();               
                adicionarValoresNaTabela(response);                
            },
            error: (response) => {
                removerValoresDaTabela();
                alert(response.responseText);
            }
        });
    }

    function adicionarValoresNaTabela(horarios) {
        for(let i=0; i < horarios.length; i++) {
            let contador = i +  1;
            addValorNaTabela(horarios[i], contador);   
        }                 
    }

    function removerValoresDaTabela() {
        let tbodyTable = $('#tbody-table')[0];

        while(tbodyTable.rows.length > 0) {
            tbodyTable.deleteRow(0);
        }
    }    

    function addValorNaTabela(horario, contador) {

        if(horario) {
            let insereNaTela = true;
            let tbodyTable = $('#tbody-table')[0];            

            insereNaTela = verificarSeOValorEstaNaTabela(tbodyTable, horario);

            if(insereNaTela) {
                addLinhaNaTabela(tbodyTable, horario, contador);                            
            }            
        }                                
    }

    function verificarSeOValorEstaNaTabela(tbodyTable, horario) {

        let insereNaTela = true;        

        if(tbodyTable.rows.length > 0) {

            for(let i=0; i < tbodyTable.rows.length; i++) {

                let dataHoraPet = horario.nomePet + ' - ' + horario.dataHora;
                let linhaTabelaTD = tbodyTable.rows[i] !== null  && tbodyTable.rows[i].querySelector('td');                
                let existeValorNaTabela = linhaTabelaTD.innerText.includes(dataHoraPet);
                
                if(existeValorNaTabela) {
                    insereNaTela = false;
                    break;
                } 
            }
        }

        return insereNaTela;
    }

    function addLinhaNaTabela(tbodyTable, horario, contador) {        
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let buttonVerInfos = document.createElement('button');
        let buttonRemoverInfo = document.createElement('button');

        tr.setAttribute('id', 'tr_' + horario.nomePet + '_' + contador);
        td.setAttribute('id', 'td_' + horario.nomePet + '_' + contador);
        td.innerHTML = horario.nomePet + ' - ' + horario.dataHora;

        buttonVerInfos.setAttribute('id', 'view_' + horario.nomePet + '_' + contador);
        buttonVerInfos.setAttribute('type', 'button');
        buttonVerInfos.setAttribute('class', 'btn button-style-row');        
        buttonVerInfos.innerHTML = 'Infos';

        buttonRemoverInfo.setAttribute('id', 'remove_' + horario.nomePet + '_' + contador);
        buttonRemoverInfo.setAttribute('type', 'button');
        buttonRemoverInfo.setAttribute('class', 'btn button-style-row');     
        buttonRemoverInfo.setAttribute('onclick', 'removerLinhaTabela(event);');  
        buttonRemoverInfo.innerHTML = 'Remover';
    
        tbodyTable.append(tr);
        tr.append(td);
        td.appendChild(buttonRemoverInfo); 
        td.appendChild(buttonVerInfos); 
    }   
});

function removerLinhaTabela(evento) {
    let linhaRemover = evento !== null ? evento.currentTarget : null;

    if(linhaRemover) {     

        let horarioSplited = linhaRemover.parentElement !== null
            && linhaRemover.parentElement.parentElement !== null
            && linhaRemover.parentElement.parentElement.innerText !== null
            && linhaRemover.parentElement.parentElement.innerText.split('Remover');

        let horarioRemover = horarioSplited[0].toString().trimEnd();

        let obj = {
            horarioRemover: horarioRemover
        }        

        $.ajax({
            url: '/remover',
            method: 'DELETE',
            data: obj,            
            success: (response) => {
                alert('Agendamento removido com sucesso!');
                removerDaTela(linhaRemover);
            },
            error: (response) => {
                alert('Ocorreu um erro ao tentar remover o agendamento!');
            }
        });
    }    
}

function removerDaTela(linhaRemover) {
    linhaRemover.parentElement !== null
     && linhaRemover.parentElement.parentElement !== null
     && linhaRemover.parentElement.parentElement.remove();
}