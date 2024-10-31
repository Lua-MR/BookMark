//nome do livro
//var nome = "HP"; 
//var pags = prompt("Quantidade de páginas?");
//document.write("<h1>Aprendendo js</h1>");
//document.write("<img src='https://s2.static.brasilescola.uol.com.br/img/2019/10/dia-do-livro.jpg' />");


//função entrar
function entrar(){
    var area = document.getElementById('area');
    var texto = prompt('Digite seu nome');

    if(texto == '' || texto == null){
        alert('Digite seu nome');
        area.innerHTML = 'Bem vindo...';
    }else{
       area.innerHTML = 'Bem vindo ' + texto; 
    }

}

function entrar2(nome){
    var area = document.getElementById('area2');
    var texto = prompt('Digite seu sobrenome');

   
    if(texto == '' || texto == null){
        alert('Digite seu sobrenome');
        area.innerHTML = 'Bem vindo...';
    }else{
       area2.innerHTML = 'Bem vindo ' + nome + " " + texto;
    }
}

//while
x = 0;
while(x<10){
    document.write("<br> O Valor de X é: " + x +"<br>");
    x++;
}

//For

for(a=0; a<10; a++){
    document.write("<br> O Valor de A é: " + a +"<br>");
}

//if
if(x<10){
    document.write("<br> O Valor de x é: " + x +"<br>");
}

//Switch
var b = 2;
switch(b){
    case 0:
        alert("B vale 0");
    break;
    case 1:
        alert("B vale 1");
    break;
    case 2:
        alert("B vale 2");
    break;
    default:
        alert("B não vale nada!");
}

document.write("<br> Escolha seu pedido: <br>");
document.write("<br> 0 - Sorvete <br> 1 - Suco <br> 2 - Agua <br>");

function pedir(){
p = prompt("O que deseja pedir?");
    switch(p){
        case "0":
            alert("Sorvete");
        break;
        case "1":
            alert("Suco");
        break;
        case "2":
            alert("Agua");
        break;
        default:
            alert("Inválido");
            break;
    }
}


//Tempo
function acao(){
    document.write("Executand...<br/>")
}

//executa de tempo em tempo
//setInterval(acao, 1000);//executa de 1 em 1 segundo
/*var timer = setInterval(acao, 1000); //para poder parar
clearInterval(timer);*/

//Executa em determinado tempo
//setTimeout(acao, 3000);


//Storage
//localStorage.getItem("nome");
var nome = '';

if(typeof localStorage.nome == 'undefined'){
    localStorage.nome = prompt("Digite seu nome:");
}

nome = localStorage.nome;
document.getElementById('nome').innerHTML = nome;

//Spread operator 
function cadastroLivro(info){
    let avaliacao = {
        ...info,
        nota: 5,
        status: 'lido',
        resenha: 'muito legal'

    };
    return avaliacao;
}
 console.log(cadastroLivro({
    nome: 'O Sol e a Estrela ',
    autor: 'Rick Riordan',
    pag: 350
}));

//Rest operator
function Lista(...livros){
    console.log(livros);
}

Lista("Biblioteca da meia-noite", "Um veneno doce e sombrio", "O princepezinho");



function cadastrar(livross, ...novoslivros){
    let totallivros = [
        ...livross,
        ...novoslivros
    ];

    return console.log(totallivros);
}


let livross = ["Biblioteca da meia-noite", "Um veneno doce e sombrio", "O princepezinho"];
let novoslivros = cadastrar(livross, "Antidote", "Acidental mark");


//array
const lista = [1,2,3,4,5,6];

const novaLista = lista.map(function(item){
    return item*5;
});
console.log(novaLista);

const soma = lista.reduce(function(total, proximo){
    return total+proximo;
});
console.log(soma);

const find = lista.find(function(item){
    return item === 6;
});
console.log(find);

//funcao anonima
function adicionar(...numeros){
   /*let total = numeros.reduce(function(total, proximo){
        let soma = total + proximo;
        return soma;
    });
    console.log(soma);*/

    let total = numeros.reduce((total, proximo) => total + proximo);
    console.log(total);
};

adicionar(1,2,3,4,5);
/*
//includes
    let livros = ['Hp', 'Acotar', 'Pjo'];

    console.log(livros.includes('Pjo'));
    console.log(livros.includes('JVS'));

//endsWith

    let nomew = 'Harry potter';
    console.log(nomew.endsWith('r'));
    console.log(nomew.endsWith('tter'));
    console.log(nomew.endsWith('A'));
//startsWith

let nomes = 'Harry potter';
    console.log(nomes.startsWith('r'));
    console.log(nomes.startsWith('Ha'));
    console.log(nomes.startsWith('ha'));
*/
//Some
let livrosm = ['Hp', 'Acotar', 'Pjo', 'Pjo'];

console.log(livrosm.some(livrosm => livrosm === 'Pjo'));
console.log(livrosm.some(livrosm => livrosm === 'JVs'));

//Every
let livrosy = [
    {nome: 'Harry potter', pags: 450},
    {nome: 'Corte de espinhos e rosas', pags: 600},
    {nome: 'Percy jackson 1 ', pags: 234}
];

console.log(livrosy.every(livrosy => livrosy.pags >=100));
console.log(livrosy.every(livrosy => livrosy.pags >=300));
