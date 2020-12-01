$(document).ready(() => {

    $('#login').on('click', () => {
        let usuario = $('#input_login').val();
        let senha = $('#input_senha').val();
        
        let existeAlgumInputVazio = usuario === '' 
            || senha === '';            

        if(existeAlgumInputVazio) {
            validarCampos();
        } else {
            // salvarInfoUsuarioLocalStorage(usuario);
            window.location.href = 'agendamento';
        }
    });

    // function salvarInfoUsuarioLocalStorage(usuario) {
    //    window.localStorage.setItem('usuarioPet', usuario);
    // }

    function validarCampos() {
        let user = $('#input_login').val();
        
        let objUserLogin = $('#feedbackLogin');
        let objUserSenha = $('#feedbackSenha');

        if(user === '') {
            adicionarFeedbackNaTela(objUserLogin);
        } else {
            adicionarFeedbackNaTela(objUserSenha);
        }
    }

    function adicionarFeedbackNaTela (obj) {
        obj.html('Este campo é obrigatório!');
        obj[0].style.display = 'block';
        obj[0].style.marginBottom = '2%';
        obj[0].style.marginTop = '-10%';        
        setTimeout(() => {
            obj.hide();
        }, 2500);
    }
});