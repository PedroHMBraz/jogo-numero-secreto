// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativa = 1;

function modificaTextoTags(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}


function modificaTextoInicial() {
    modificaTextoTags('h1', 'Jogo do número secreto');
    modificaTextoTags('p', 'Escolha um número entre 1 e 10');
}

modificaTextoInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;

    if (quantidadeElementosLista == 10) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); 
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroAleatorio) {
        modificaTextoTags('h1','Parabéns! Você acertou.');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}.`;
        modificaTextoTags('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled','true');
    } else {
        tentativa++;
        limparCampoEntrada();
        modificaTextoTags('h1','Errado! Tente novamente.');
        if (numeroAleatorio > chute) {
            modificaTextoTags('p','O número secreto é maior que o escolhido');
        } else {
            modificaTextoTags('p','O número secreto é menor que que o escolhido');
        }
    }
}

function limparCampoEntrada() {
    chute = document.querySelector('input');    //limpamos os números na caixa de entrada input.
    chute.value = '';
}

function botaoReiniciarJogo() {
    modificaTextoInicial();
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampoEntrada();
    tentativa = 1;
    document.getElementById('chute').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled','true');
}