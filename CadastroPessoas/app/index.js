function Salvar(){
    var nome = document.querySelector("#nome").value;
    var idade = document.querySelector("#idade").value;
    var nacionalidade = document.querySelector("#nacionalidade").value;
    var nomePai = document.querySelector("#nomePai").value;
    var nomeMae = document.querySelector("#nomeMae").value;

    var tabela = document.querySelector("#tabelaDados");

    var linha = document.createElement('tr');

    var tdnome = document.createElement('td');
    tdnome.innerHTML = nome;
    linha.appendChild(tdnome);
    var tdidade = document.createElement('td');
    tdidade.innerHTML = idade;
    linha.appendChild(tdidade);
    var tdnacionalidade = document.createElement('td');
    tdnacionalidade.innerHTML = nacionalidade;
    linha.appendChild(tdnacionalidade);
    var tdnomePai = document.createElement('td');
    tdnomePai.innerHTML = nomePai;
    linha.appendChild(tdnomePai);
    var tdnomeMae = document.createElement('td');
    tdnomeMae.innerHTML = nomeMae;
    linha.appendChild(tdnomeMae);
    tabela.appendChild(linha);
}