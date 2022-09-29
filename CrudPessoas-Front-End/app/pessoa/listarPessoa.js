async function PreencherTabelaPessoas(){
    
    let tabela = document.querySelector('#listagem-pessoas');    
    
    console.log(tabela);

    let pessoas = await ListarPessoas();  
    
    console.log(pessoas);

    pessoas.forEach(function(e) {
        let linha = document.createElement('tr');
        linha.addEventListener('click', ()=> {            
            window.location.href = "../../module/pessoa/editarPessoa.html?id=" + e.id;
        });
        
        let idTd = document.createElement('td');        
        idTd.classList.add('row-id-pessoa');        
        let nomeTd = document.createElement('td');
        nomeTd.classList.add('row-nome-pessoa');
        let cpfTd = document.createElement('td');
        cpfTd.classList.add('row-cpf-pessoa');
        let dataNascimentoTd = document.createElement('td');
        dataNascimentoTd.classList.add('row-data-nascimento-pessoa');
        
        idTd.innerHTML = e.id;
        nomeTd.innerHTML = e.nome;
        cpfTd.innerHTML = e.cpf;
        dataNascimentoTd.innerHTML = e.dataNascimento;

        linha.appendChild(idTd);
        linha.appendChild(nomeTd);
        linha.appendChild(cpfTd);
        linha.appendChild(dataNascimentoTd);

        tabela.appendChild(linha);
    });
}

async function ListarPessoas(){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44317/pessoa/buscartodos', options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });

    return req;
}

function Voltar(){
    window.location = "../../index.html";
}

PreencherTabelaPessoas();