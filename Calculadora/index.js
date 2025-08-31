
function fatorial(n){
    let fat = 1
    for(let c = n; c > 1; c--){
         fat *= c
    }
    return fat
}
//!Functions de operadores aritméticos
function somar(a, b) {
    return a + b
}

function multiplicar(a, b) {
    return a * b
}

function dividir(a, b) {
    return a / b
}

function subtracao(a, b) {
    return a - b
}

let visorAtual = ""
let primeiroNumero = null
let operador = null
let resultadoMostrado = false

//!Adiciona números ao visor, adiciona o número que vir com a chamada do código html
function AdicionarNumero(num) {
    visorAtual += num  //*Adiciona o número a váriavel que mais tarde sera atribuida ao visor
    document.getElementById('visor').value = visorAtual
}

function apagar() {
    visorAtual = visorAtual.substring(0, visorAtual.length - 1) //*Pega o valor todo da variável com os números, menos o ultimo apagando-o
    document.getElementById('visor').value = visorAtual //*Atualiza o valor do input com o novo valor da váriavel
}

//*Adiciona um "ouvinte" para capturar quando qualquer tecla do teclado for pressionada
document.addEventListener("keydown", function (e) {
    //*Verifica se a tecla pressionada é Backspace
    if (e.key === "Backspace") {
        e.preventDefault() // evita apagar o input todo
        if(resultadoMostrado){
            visorAtual = ""
            document.getElementById('visor').value = visorAtual
            resultadoMostrado = false
        }else{
            apagar()
        }
        return
    }

    //*Verifica se a tecla que foi apertada é um botão do teclado númerico
    if (!isNaN(e.key) && e.key !== " ") {
        //! Chama a função adicionarNumero passando o número digitado
        AdicionarNumero(e.key)
        resultadoMostrado = false
        return
    }

    if (e.key === "Enter" || e.key === "="){
        igual()
        e.preventDefault()
        resultadoMostrado = true
        return
    }

    if(["+", "-", "*", "/", "!"].includes(e.key)){
        definirOperador(e.key)
        resultadoMostrado = false
        return
    }

})

function definirOperador(op) {
    primeiroNumero = Number(visorAtual) //*A váriavel captura o primeiro número adicionado ao visor quando o operador for selecionado
    operador = op
    visorAtual = "" //*Após a captura do primeiro número limpa a váriavel, que mais tarde limpará o visor
    document.getElementById('visor').value = visorAtual
}

function igual() {
    resultadoMostrado = true
    let resultado
    let segundoNumero = Number(visorAtual)  //*A váriavel só capturara o segundo número quando o sinal de igual for clicado

    //!Espera a "escolha" do operador aritmético que o usuário vai selecionar
    switch (operador) {
        //!Chamada das funções para cada caso
        case '+':
            resultado = somar(primeiroNumero, segundoNumero)
            break
        case '*':
            resultado = multiplicar(primeiroNumero, segundoNumero)
            break
        case '/':
            resultado = dividir(primeiroNumero, segundoNumero)
            break
        case '-':
            resultado = subtracao(primeiroNumero, segundoNumero)
            break
        case '!':
            resultado = fatorial(primeiroNumero)
            break
        default:
            resultado = "Erro"
    }
    if(operador === '!'){
        resultado = fatorial(primeiroNumero)
        visorAtual = resultado
        document.getElementById('visor').value = `${primeiroNumero}! = ${resultado}`
    }else{
        visorAtual = resultado //!A váriavel retém o resultado para continuar a conta
    document.getElementById('visor').value = `${primeiroNumero} ${operador} ${segundoNumero} = ${resultado}`//*Exibe no visor a conta completa
    }
}

// developer - @joaospw
