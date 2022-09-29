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
}

function Voltar(){
    window.location = "../../index.html";
}
async function getPessoaId(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await BuscarPorId(urlParams.get('id'));
    PreencherFormulario(res);
}

async function BuscarPorId(id){      
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44317/pessoa/BuscarPorId?id='+id, options )
        .then(response => {      
            return response.json();
        })     
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}
async function PreencherFormulario(json){
    let dadosForm = document.querySelector('#form');
    let nome = dadosForm.querySelector('#nome');
    let cpf = dadosForm.querySelector('#cpf');
    let dataNascimento = dadosForm.querySelector('#dataNascimento');

    console.log(json);
    nome.value = json.nome;
    cpf.value = json.cpf;
    dataNascimento.valueAsDate = new Date(json.dataNascimento);
    
    let telefones = document.querySelector('#dadosContato');

    json.telefones.forEach(async function(e) {

        let templateContato = converterParaDomElement(await CarregarTemplate('../../module/pessoa/contato.html'));
                
        let idInput = templateContato.querySelector('#id-contato');
        let telefoneInput = templateContato.querySelector('#numero');
        let dddInput = templateContato.querySelector('#ddd');

        idInput.value = e.id;
        telefoneInput.value = e.numero;
        dddInput.value = e.ddd;

        telefones.appendChild(templateContato);        
    });

    let endereco = document.querySelector('#dadosEndereco');
    
    let templateEndereco = converterParaDomElement(await CarregarTemplate('../../module/pessoa/endereco.html'));

    let ruaInput = templateEndereco.querySelector('#rua');    
    let complementoInput= templateEndereco.querySelector('#complemento');
    let numeroInput = templateEndereco.querySelector('#numero');
    let idInput = templateEndereco.querySelector('#id-endereco');

    ruaInput.value = json.endereco.rua;    
    complementoInput.value = json.endereco.complemento;
    numeroInput.value = json.endereco.numero;
    idInput.value = json.endereco.id;

    endereco.appendChild(templateEndereco);
}

getPessoaId();