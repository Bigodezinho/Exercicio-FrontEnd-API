function onClickSalvar() {

    let campoNome = document.querySelector('#nome');
    let campoIdade = document.querySelector('#idade');

    if (!campoNome.value) {
        alert('Nome não preenchido;');
        return;
    }

    if (!campoIdade.value) {
        alert('Idade não preeenchida.');
        return;
    }
    
    var pessoa = {
        nome: campoNome.value,
        idade: campoIdade.value
    };

    let div = document.querySelector('#dadosSalvos');

    div.innerHTML = ' <input disabled value = "' + pessoa.nome + '" />' +
                    ' <input disabled value = "' + pessoa.idade + '" /> '
}