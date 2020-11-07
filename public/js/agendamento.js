$(document).ready(() => {   

    $('#salvar-horario').on('click', () => {
        let nomePet = $('#nome-pet').val();
        let racaPet = $('#raca-pet').val();
        let servicoPet = $('#servico-pet').val();
        let dataHora = $('#data-hora').val();


        let existeAlgumInputVazio = nomePet === '' 
            || racaPet === '' 
            || servicoPet === '' 
            || dataHora === '';

        if(existeAlgumInputVazio) {
            validarCampos();
        } else {

            dataHora = formatarHora(dataHora);

            let novoAgendamento = {
                nomePet: nomePet,
                racaPet: racaPet,
                servicoPet: servicoPet,
                dataHora: dataHora
            }

            salvarHorario(novoAgendamento);
        }
    });


    $('#buscar-horario').on('click', () => {
        window.location.href = '/buscarhorario';            
    });

    function salvarHorario(novoAgendamento) {
        $.ajax({
            url: '/novoagendamento',
            method: 'POST',
            data: novoAgendamento,
            success: (response) => {
                let ok = confirm(response);

                while(ok !== true) {
                    ok = confirm(response);
                }

                if(ok === true) {
                    limparCampos();
                }
            }
        });
    }

    function limparCampos() {
        $('#nome-pet')[0].value = '';
        $('#raca-pet')[0].value = '';
        $('#servico-pet')[0].value = '--Selecione uma opção--';
       $('#data-hora')[0].value = '';
    }

    function abrirModal(mensagem) {        
        let title = $('.modal-title');
        let body = $('.modal-body');

        title.innerHTML = 'Uhuull';
        body.innerHTML = mensagem;     
    }

    function formatarHora(dataHora) {
        let horaSplited = dataHora.split('T');

        let data = horaSplited[0].toLocaleString().split('-').reverse().join('/');
        let hora = horaSplited[1];

        dataHora = data + ' ' + hora;
        return dataHora;
    }

    function validarCampos() {
        let nomePet = $('#nome-pet').val();
        let racaPet = $('#raca-pet').val();
        let servicoPet = $('#servico-pet').val();
        
        let objNomePet = $('#feedback-nome-pet');
        let objRacaPet = $('#feedback-raca-pet');
        let objServicoPet = $('#feedback-servico-pet');
        let objDataHora = $('#feedback-data-hora');


        if(nomePet === '') {
            adicionarFeedbackNaTela(objNomePet);
        } else if(racaPet === '') {
            adicionarFeedbackNaTela(objRacaPet);
        } else if(servicoPet === '--Selecione uma opção--') {
            adicionarFeedbackNaTela(objServicoPet);
        } else {
            adicionarFeedbackNaTela(objDataHora);
        }
    }

    function adicionarFeedbackNaTela (obj) {
        obj.html('Este campo é obrigatório!');
        obj[0].style.display = 'block';
        obj[0].style.marginBottom = '2%';
        obj[0].style.marginTop = '-6%';        
        setTimeout(() => {
            obj.hide();
        }, 2500);
    }
});