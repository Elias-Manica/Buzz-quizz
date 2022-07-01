
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
        screen3per(Number(qtdPerQuizz));
    }
}

function screen3per(numPer){
    let classesAux = ["emEdicao", "ocultar"];
    divScreen.innerHTML += `
    <div class="conteudoScreen3">
        <h1><strong>Crie suas perguntas</strong></h1>

        <ul class="listaperguntas">
    
    `
    for(let i = 0; i < 1; i++){
        alert("entrou");
        let aux = classesAux[1];
        if (i==0){
            aux = classesAux[0];
        }
        divScreen.innerHTML += `

        <li class="pergunta ${aux}">
            <div class="divComecarQuizz">
              <h2>
                <strong>Pergunta ${i+1}</strong>             
                <ion-icon name="create-outline" onclick="expandirOuContrairLi(this)"> </ion-icon>
              </h2>          
              <input type="text" placeholder="Texto da Pergunta" />
              <input type="text" placeholder="Cor de fundo da Pergunta" />
              
              <div class="respostacorreta">
                <h2><strong>Resposta correta</strong></h2>
                <input type="text" placeholder="Resposta correta" />
                <input type="text" placeholder="URL da imagem" />
              </div>
              `;
              divScreen.innerHTML += `
              <div class="respostasincorretas">
    
              <h2><strong>Respostas incorretas</strong></h2>
              `;


              for (let j=1; j<4; j++){
                  divScreen.innerHTML += `
                    <div class="incorreta">
                        <input type="text" placeholder="Resposta incorreta ${j}" />
                        <input type="text" placeholder="URL da imagem ${j}" />
                    </div>
                  `;
              }
              divScreen.innerHTML += `                  
                </div>
                </div>

                </li>`;
    }
    divScreen.innerHTML += `
    <div class="botaoProsseguir" onclick="prosseguirParaNiveis()">
          Prosseguir pra criar Níveis
        </div>
      </div>`;


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
    let padrao = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
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

function expandirOuContrairLi(icon){
    const li = icon.parentNode.parentNode.parentNode;
    const ul = li.parentNode;
    const emEdicao = ul.querySelector(".emEdicao");
    if (emEdicao !== li){
        li.classList.toggle("emEdicao");
        li.classList.toggle("ocultar");
        emEdicao.classList.toggle("ocultar");
        emEdicao.classList.toggle("emEdicao");
    }


}
