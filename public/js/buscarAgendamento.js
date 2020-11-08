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
    });   

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

        tr.setAttribute('id', 'tr_' + horario.nomePet + '-' + contador);
        td.setAttribute('id', 'td_' + horario.nomePet + '-' + contador);
        td.innerHTML = horario.nomePet + ' - ' + horario.dataHora;

        buttonVerInfos.setAttribute('id', 'view_' + horario.nomePet + '-' + contador);
        buttonVerInfos.setAttribute('type', 'button');
        buttonVerInfos.setAttribute('class', 'btn button-style-row');  
        buttonVerInfos.setAttribute('data-toggle', 'modal');
        buttonVerInfos.setAttribute('data-target', '#' + horario.nomePet + '-' + contador);        
        buttonVerInfos.innerHTML = 'Infos';

        buttonRemoverInfo.setAttribute('id', 'remove_' + horario.nomePet + '-' + contador);
        buttonRemoverInfo.setAttribute('type', 'button');
        buttonRemoverInfo.setAttribute('class', 'btn button-style-row');     
        buttonRemoverInfo.setAttribute('onclick', 'removerLinhaTabela(event);');  
        buttonRemoverInfo.innerHTML = 'Remover';
    
        tbodyTable.append(tr);
        tr.append(td);
        td.appendChild(buttonRemoverInfo); 
        td.appendChild(buttonVerInfos); 

        montarInfosModal(horario, contador);
    }    
});

function montarInfosModal(horario, contador) {

    criarModal(horario, contador);

    let modalInfoPet = $('#' + 'div-' + horario.nomePet + '-' + contador)[0];
    modalInfoPet.setAttribute('id', horario.nomePet + '-' + contador);  

    let tituloMensagem = 'Agendamento - Horário Agendado';

    let titulo = $('#' + 'titulo-' + horario.nomePet + '-' + contador)[0];
    let corpo = $('#' + 'corpo-' + horario.nomePet + '-' + contador)[0];

    titulo.setAttribute('id', horario.nomePet + '-' + contador);
    titulo.innerHTML = tituloMensagem;

    corpo.setAttribute('id', horario.nomePet + '-' + contador);

    let divCardInterno = document.createElement('div');
    divCardInterno.setAttribute('class', 'card-interno');

    let divInputGroupNomePet = document.createElement('div');
    divInputGroupNomePet.setAttribute('class', 'input-group mb-4 px-4');

    let divInputGroupRacaPet = document.createElement('div');
    divInputGroupRacaPet.setAttribute('class', 'input-group mb-4 px-4');

    let divInputGroupServicoPet = document.createElement('div');
    divInputGroupServicoPet.setAttribute('class', 'input-group mb-4 px-4');

    let divInputGroupDataHoraPet = document.createElement('div');
    divInputGroupDataHoraPet.setAttribute('class', 'input-group mb-4 px-4');

    let divInputGroupPrependNomePet = document.createElement('div');
    divInputGroupPrependNomePet.setAttribute('class', 'input-group-prepend');

    let divInputGroupPrependRacaPet = document.createElement('div');
    divInputGroupPrependRacaPet.setAttribute('class', 'input-group-prepend');

    let divInputGroupPrependServicoPet = document.createElement('div');
    divInputGroupPrependServicoPet.setAttribute('class', 'input-group-prepend');

    let divInputGroupPrependDataHora = document.createElement('div');
    divInputGroupPrependDataHora.setAttribute('class', 'input-group-prepend');   

    let spanNomePet = document.createElement('span');
    let inputNomePet = document.createElement('input');

    spanNomePet.setAttribute('id', 'span-' + horario.nomePet + '-' + contador);
    spanNomePet.setAttribute('class', 'input-group-text type-of-field');
    spanNomePet.innerHTML = 'Nome do Pet';

    inputNomePet.setAttribute('id', 'input-nome-pet');
    inputNomePet.setAttribute('class', 'form-control');
    inputNomePet.setAttribute('disabled', 'true');
    inputNomePet.setAttribute('value', horario.nomePet);    
    inputNomePet.innerHTML = horario.nomePet;
    
    let spanRacaPet = document.createElement('span');
    let inputRacaPet = document.createElement('input');    

    spanRacaPet.setAttribute('id', 'span-' + horario.racaPet + '-' + contador);
    spanRacaPet.setAttribute('class', 'input-group-text type-of-field');
    spanRacaPet.innerHTML = 'Raça do Pet';

    inputRacaPet.setAttribute('id', 'input-raca-pet');
    inputRacaPet.setAttribute('class', 'form-control');
    inputRacaPet.setAttribute('disabled', 'true');
    inputRacaPet.setAttribute('value', horario.racaPet);    
    inputRacaPet.innerHTML = horario.racaPet;
    
    let spanServicoPet = document.createElement('span');
    let inputServicoPet = document.createElement('input');

    spanServicoPet.setAttribute('id', 'span-' + horario.servicoPet + '-' + contador);
    spanServicoPet.setAttribute('class', 'input-group-text type-of-field');
    spanServicoPet.innerHTML = 'Serviço Pet';

    inputServicoPet.setAttribute('id', 'input-servico-pet');
    inputServicoPet.setAttribute('class', 'form-control');
    inputServicoPet.setAttribute('disabled', 'true');
    inputServicoPet.setAttribute('value', horario.servicoPet);    
    inputServicoPet.innerHTML = horario.servicoPet;
    
    let spanDataHoraPet = document.createElement('span');
    let inputDataHoraPet = document.createElement('input');

    spanDataHoraPet.setAttribute('id', 'span-' + horario.dataHora + '-' + contador);
    spanDataHoraPet.setAttribute('class', 'input-group-text type-of-field');
    spanDataHoraPet.innerHTML = 'Data/Hora';

    inputDataHoraPet.setAttribute('id', 'input-datahora-pet');
    inputDataHoraPet.setAttribute('class', 'form-control');
    inputDataHoraPet.setAttribute('disabled', 'true');
    inputDataHoraPet.setAttribute('value', horario.dataHora);    
    inputDataHoraPet.innerHTML = horario.dataHora;    

    corpo.append(divCardInterno);
    divCardInterno.append(divInputGroupNomePet);
    divCardInterno.append(divInputGroupRacaPet);
    divCardInterno.append(divInputGroupServicoPet);
    divCardInterno.append(divInputGroupDataHoraPet);

    divInputGroupNomePet.append(divInputGroupPrependNomePet);
    divInputGroupRacaPet.append(divInputGroupPrependRacaPet);
    divInputGroupServicoPet.append(divInputGroupPrependServicoPet);
    divInputGroupDataHoraPet.append(divInputGroupPrependDataHora);

    divInputGroupPrependNomePet.append(spanNomePet);
    divInputGroupNomePet.append(inputNomePet);

    divInputGroupPrependRacaPet.append(spanRacaPet);
    divInputGroupRacaPet.append(inputRacaPet);

    divInputGroupPrependServicoPet.append(spanServicoPet);
    divInputGroupServicoPet.append(inputServicoPet);

    divInputGroupPrependDataHora.append(spanDataHoraPet);
    divInputGroupDataHoraPet.append(inputDataHoraPet);
}

function criarModal(horario, contador) {
    let modal = document.getElementsByTagName('body')[0];

    let divInicioModal = document.createElement('div');
    divInicioModal.setAttribute('id', 'div-' + horario.nomePet + '-' + contador);
    divInicioModal.setAttribute('class', 'modal fade');
    divInicioModal.setAttribute('tabindex', '-1');
    divInicioModal.setAttribute('role', 'dialog');
    divInicioModal.setAttribute('aria-hidden', 'true');

    let divNivel2 = document.createElement('div');
    divNivel2.setAttribute('class', 'modal-dialog');
    divNivel2.setAttribute('role', 'document');

    let divNivel3 = document.createElement('div');
    divNivel3.setAttribute('class', 'modal-content modal-info-pet');

    let divNivel4 = document.createElement('div');
    divNivel4.setAttribute('class', 'modal-header');

    let divNivel5 = document.createElement('div');
    divNivel5.setAttribute('id', 'corpo-' + horario.nomePet + '-' + contador);
    divNivel5.setAttribute('class', 'modal-body');

    let h5 = document.createElement('h5');
    h5.setAttribute('id', 'titulo-' + horario.nomePet + '-' + contador);
    h5.setAttribute('class', 'modal-title');

    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'close');
    button.setAttribute('data-dismiss', 'modal');
    button.setAttribute('aria-label', 'Close');

    let span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;';

    modal.append(divInicioModal);
    divInicioModal.append(divNivel2);
    divNivel2.append(divNivel3);
    divNivel3.append(divNivel4);
    divNivel4.append(h5);
    divNivel4.append(button);
    button.append(span);
    divNivel3.append(divNivel5);
}

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