
start() /* Precisa chamar a função start, se não o prompt não funciona */


// Variáveis 
    /* Precisão estar depois do primeiro start, se não o código não funciona */
    let qtdCartas;

    let ultimoClick = 0;
    let primeiroClick;
    let segundoClick;

    let escolha = 0;
    let acertos = 0;

    let outroElemento;
    let armazenado;
    let check;

    let contar = 0;
    let ganhou;

    let intervalo;


timer() /* Precisa chamar a função timer */

// Inicio do Jogo

function start() {
    resetarCartas() //Precisa mandar resetar o jogo

    let qtdCartas = prompt("Selecione um dos seguintes número de cartas: (4, 6, 8, 10 ou 12)");
    
    if (qtdCartas % 2 !== 0 || qtdCartas < 4 || qtdCartas > 12) { /* Se o resto da divisão for igual a 0 e se o número de cartas for maior que 4 e menor que 12 */
        alert("Selecione um número de cartas: (4, 6, 8, 10 ou 12)");
        qtdCartas = 0;
        start();
    } 
    else {
        addCartas(qtdCartas);
    }
}

function resetarCartas() {
    let lista = document.querySelector("li");
    lista.innerHTML = "";        
}


// Adicionar as cartas

function addCartas(qtdCartas) {
    const cartas = ["img/bobrossparrot.gif", "img/bobrossparrot.gif", "img/explodyparrot.gif", "img/explodyparrot.gif", "img/fiestaparrot.gif", "img/fiestaparrot.gif", "img/revertitparrot.gif", "img/revertitparrot.gif", "img/tripletsparrot.gif", "img/tripletsparrot.gif", "img/unicornparrot.gif", "img/unicornparrot.gif",]
    
    //Embaralhar as cartas
    const embaralharCartas = [];

    function embaralhar(embaralharCartas) {
        return Math.random() - 0.5;
    }
    
    let lista = document.querySelector("li"); //Na saída sempre dar error, porém o código não funciona sem essa linha.

    for (let i = 0; i < qtdCartas; i++) {
        embaralharCartas.push(cartas[i])
    }

    embaralharCartas.sort(embaralhar)

    for (let j = 0; j < embaralharCartas.length; j++) {
        lista.innerHTML += `
        <div class="carta" onclick="escolherCarta(this)">
                <div id = "frente" class="frente face">
                    <img class="item" src="img/front.png">
                </div>
                <div id = "costa" class="costa face">
                    <img class="item jogo" src="${embaralharCartas[j]}">
                </div>
            </div>
        ` //Depois fazer isso com document.createElement
    }
}

// Resetando e embaralhando as cartas


// Lógica
// Virar e escolhar das cartas

function virarCarta(elemento) {
    elemento.children[0].classList.add("virar")
    elemento.children[1].classList.add("virar")
}

function escolherCarta(elemento) {
    if (ultimoClick >= (Date.now())) {
        return;
    } 
    
    else {
        virarCarta(elemento);
        if (primeiroClick === undefined) {
            escolha++;

            primeiroClick = elemento.children[1].querySelector(".jogo").src

            outroElemento = elemento.querySelectorAll(".face")
            check = elemento.children
            armazenado = elemento
        } 

        else {
            segundoClick = elemento.children[1].querySelector(".jogo").src
            
            if (primeiroClick === segundoClick && elemento.children !== check) {
                escolha++; acertos++
                elemento.onclick = ("#")
                armazenado.onclick = ("#")
                primeiroClick = undefined
                segundoClick = undefined
            } 
            
            else if (primeiroClick !== segundoClick) {
                setTimeout(function () {
                    escolha++;
                    outroElemento[0].classList.remove("virar")
                    outroElemento[1].classList.remove("virar")
                    elemento.children[0].classList.remove("virar")
                    elemento.children[1].classList.remove("virar")

                    primeiroClick = undefined
                    segundoClick = undefined
                }, 700) //Tempo para a carta virar
            }
        }
    }
    setTimeout(function () {
        fimDoJogo()
    })
}


// Fim do Jogo

function fimDoJogo() {
    let lista = document.querySelectorAll("li div")

    if (acertos == lista.length / 6) {
        alert(`Você ganhou!`)
        ganhou = true
    }
}

function adicionar() {
    if (ganhou === true) {
        clearInterval(intervalo)
    } 
    
    else {
        contar++
        document.querySelector(".timer").innerHTML = formatarTime(contar)
    }
}

// Seção do Timer

function timer() {
    intervalo = setInterval(adicionar, 700);
    
}

function formatarTime(segundos) {
    return parseInt(segundos % 60)
}
