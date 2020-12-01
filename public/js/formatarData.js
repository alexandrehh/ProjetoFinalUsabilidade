// Formata data para o formato 'DD/MM/YYYY HH:MM'
function formatarData(data) {
    console.log(data)

    const dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
    console.log('dia:' + dia)

    const mes = data.getMonth()+1 < 10 ? `0${data.getMonth()+1}` : data.getMonth()+1;
    console.log('mes:' + mes)

    const ano = data.getFullYear();
    console.log('ano:' + ano)

    const horas = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours();
    console.log('horas:' + horas)

    const minutos = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
    console.log('minutos:' + minutos)
    console.log('----------------------')

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

module.exports.formatarData = formatarData;