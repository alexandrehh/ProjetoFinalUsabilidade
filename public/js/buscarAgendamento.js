$(document).ready(() => {       

    $('#buscar-horario').on('click', () => {
        let nomePet = $('#input-buscar-horario').val();

        if(nomePet === '') {
            alert('O campo de busca esta vazio, digite o nome do seu Pet!');
        } else {
            buscarHorarioPet(nomePet);
        }
    });

    function buscarHorarioPet(nomePet) {
        $.ajax({
            url: '/buscarhorario/' + nomePet,
            success: (response) => {                
                adicionarValoresNaTabela(response);                
            },
            error: (response) => {
                removerValoresDaTabela();
                alert(response.responseText);
            }
        });
    }

    function adicionarValoresNaTabela(horarios) {
        addLinhaTabela(horarios);            
    }

    function removerValoresDaTabela() {
        let tbodyTable = $('#tbody-table')[0];

        if(tbodyTable.rows.length > 0) { 
            for(let i=0; i < tbodyTable.rows.length; i++) { 
                let linhaTabela = tbodyTable.rows[i] !== null ? tbodyTable.rows[i] : "";
                linhaTabela.remove();
            }
        }
    }    

    function addLinhaTabela(horario) {

        let contador = 1;

        if(horario) {
            let insereNaTela = true;
            let tbodyTable = $('#tbody-table')[0];

            if(tbodyTable.rows.length > 0) {

                for(let i=0; i < tbodyTable.rows.length; i++) {

                    let dataHoraPet = horario.nomePet + ' - ' + horario.dataHora;
                    let linhaTabelaTD = tbodyTable.rows[i] !== null  && tbodyTable.rows[i].querySelector('td');
                    let linhaTabelaTR = tbodyTable.rows[i] !== null ? tbodyTable.rows[i] : "";
                    let existeValorNaTabela = linhaTabelaTD.innerText.includes(dataHoraPet);
                    
                    if(existeValorNaTabela) {
                        insereNaTela = false;
                        break;
                    } else {
                        linhaTabelaTR.remove();
                    }                 
                }
            }

            if(insereNaTela) {
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

                inserirNomePetNoLocalStorage(horario.nomePet + ' - ' + horario.dataHora);

                contador ++;
            }            
        }                                
    }

    function inserirNomePetNoLocalStorage(dataHoraPet) {
        localStorage.setItem('dataHoraPet', dataHoraPet);
    }
});

function removerLinhaTabela(evento) {
    let linhaRemover = evento !== null ? evento.currentTarget : null;

    if(linhaRemover) {     

        let horarioRemover = localStorage.getItem('dataHoraPet');

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