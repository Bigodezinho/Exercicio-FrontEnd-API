function Adicionar()
{
    //pegando o form
    var form = document.querySelector('#form');

    var entrada = document.createElement('input');
    entrada.type = 'number';
    entrada.classList.add('entrada-valor');
    
    var botao = document.createElement('input');
    botao.type = 'button';
    botao.value = '+';   

    botao.onclick = Adicionar;
    form.appendChild(entrada);
    form.appendChild(botao);
    Somar();
}
function Somar()
{
    var form = document.querySelectorAll('.entrada-valor');    

    let somatorio = 0;
    
    form.forEach(function(e){
       if(e.value !== '') {
        somatorio+= parseInt(e.value); 
       }        
    });
    alert(somatorio);
    let divRes = document.querySelector('#dadosSalvos');
    divRes.innerHTML = '<h1>'+somatorio+'</h1>'
}
