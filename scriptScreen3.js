
const divScreen = document.querySelector(".screen3");

const topo = `
<div class="topBar">BuzzQuizz</div>

`

const minPer = 3;
const minNiveis = 2;


function prosseguirParaPergs(){
    const tituloQuizz = document.querySelector("input:nth-of-type(1)").value;
    const urlQuizz = document.querySelector("input:nth-of-type(2)").value;
    const qtdPerQuizz = document.querySelector("input:nth-of-type(3)").value;
    const qtdNivQuizz = document.querySelector("input:nth-of-type(4)").value;

    let tituloValido = validarTitulo(tituloQuizz);
    let urlValido = validarUrl(urlQuizz);
    let qtdPerQuizzValido = validarNumMin(qtdPerQuizz, minPer);
    let qtdNivQuizzValido = validarNumMin(qtdNivQuizz, minNiveis);

    if (!tituloValido){
        tratarErro("titulo");
    }
    if (! urlValido)
        tratarErro("url");
    if (! qtdPerQuizz)
        tratarErro("perquizz");
    if (!qtdNivQuizzValido)
        tratarErro("nivquizz");
    
    if (urlValido && tituloValido && qtdNivQuizzValido && qtdPerQuizzValido){
        divScreen.innerHTML = ""
        divScreen.innerHTML += topo;
        screen32();
    }


}

function tratarErro(erro){
    alert ("favor preencher os dados corretamente: " + erro);

}


function validarTitulo(titulo){
    if (titulo.length >= 20 && titulo.length <= 65)
        return true;
    else 
        return false;
    
}

function validarUrl(url){
    return true;

}

function validarNumMin(num, minimo){
    let numero = Number(num);

    if (isNaN(numero) || (! Number.isInteger(numero)))
        return false;
    else{
        if (numero < minimo)
            return false;
        return true;

    }

}