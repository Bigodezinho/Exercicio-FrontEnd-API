async function CarregarTemplate(enderecoTela){    
    const template = await fetch(enderecoTela)
    .then(response=> { 
        return response.text();      
      }).catch(erro=> {
          console.log(erro);
      });    
    return template;
}

async function AdicionarContato(){
    //1o passo: pegar a divisória que irá guardar os telefones;
    let telefones = document.querySelector('#dadosContato');
    
    //2o passo: carregar o template que desejamos:
    let templateContato = await CarregarTemplate('../../module/pessoa/contato.html');

    //3o preencher com o html carregado, convertendo o texto para um elemento html.
    telefones.appendChild(converterParaDomElement(templateContato));          
}

async function AdicionarEndereco(){  
    let endereco =  document.querySelector('#dadosEndereco');    
    let templateEndereco = await CarregarTemplate('../../module/pessoa/endereco.html');    
    endereco.innerHTML = templateEndereco;
}

function converterParaDomElement(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
};

async function Salvar(){
    let nome = document.querySelector('#nome').value;  
    console.log(nome);
    let cpf = document.querySelector('#cpf').value;  
    console.log(cpf);
    let dataNascimento = document.querySelector('#dataNascimento').value;  
    console.log(dataNascimento);
    
    let pessoa = {
        nome,
        cpf,
        dataNascimento
    };

    var divtelefones = document.querySelectorAll('.areaContato');

    let telefones = [];   

    divtelefones.forEach(function(e){
        let telefone = e.querySelector('#numero');
        let dddContato = e.querySelector('#ddd');
        let objetoTelefone = {
            numero : telefone.value,
            ddd : dddContato.value 
        };
        telefones.push(objetoTelefone);      
    });  
    
    let divEndereco = document.querySelector('#areaEndereco');  

    if(!divEndereco)
    {
        alert("Endereço não preenchido");  
        return;
    }

    let ruaInput = divEndereco.querySelector('#rua').value;
    console.log(ruaInput);
    let numeroInput = divEndereco.querySelector('#numero').value;
    console.log(numeroInput);
    let complementoInput = divEndereco.querySelector('#complemento').value;
    console.log(complementoInput);
    let bairroInput = divEndereco.querySelector('#bairro').value;

    let endereco = {
        rua : ruaInput,
        numero : numeroInput,
        complemento : complementoInput,
        bairro : bairroInput
    };

    let salvarPessoaViewModel = {
        pessoa, 
        endereco,
        telefones
    };

    console.log(salvarPessoaViewModel);

    let response = await EnviarApi(salvarPessoaViewModel);
    console.log(response);
}
    
    //função para fazer uma request na api;
async function EnviarApi(viewmodel){
    
    //opções/dados para fazer a request;
    const options = {
    //método, se é um post, get etc..
    method: 'POST', 
    headers:{'content-type': 'application/json'},       
    body: JSON.stringify(viewmodel) 
    };

    //TODO: mudar a url para o seu localhost.
    const req =  await fetch('https://localhost:44317/pessoa/salvar', options )
    //caso a request dê certo, retornará a resposta;
    .then(response => {      
        response.text()
        .then(data=>  {
            alert(data);
            return data;
        });
    }) 
    //caso dê erro, irá retornar o erro e mostrar no console
    .catch(erro => {
        console.log(erro);
        return erro;
    });

    return req;
}

function Voltar(){
    window.location = "../../index.html";
}