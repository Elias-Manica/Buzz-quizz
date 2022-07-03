const divScreen = document.querySelector(".screen3");
const divScreen1 = document.querySelector(".screen1");

const classesAux = ["emEdicao", "ocultar"];

let tituloQuizz = "";
let urlQUizz = "";
let qtdPerQuizz = 0;
let qtdNivQuizz = 0;
let id = 0;

let objetoQuizz = {
  title: "",
  image: "",
  questions: [],
  levels: [],
};

let obj2Quizz = {
  title: "Título do quizz",
  image: "https://http.cat/411.jpg",
  questions: [
    {
      title: "Título da pergunta 1",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 2",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 3",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
  ],
  levels: [
    {
      title: "Título do nível 1",
      image: "https://http.cat/411.jpg",
      text: "Descrição do nível 1",
      minValue: 0,
    },
    {
      title: "Título do nível 2",
      image: "https://http.cat/412.jpg",
      text: "Descrição do nível 2",
      minValue: 50,
    },
  ],
};

const topo = `
<div class="topBar">BuzzQuizz</div>

`;

const minPer = 3;
const minNiveis = 2;

function prosseguirParaPergs() {
  tituloQuizz = document.querySelector("input:nth-of-type(1)").value;
  urlQuizz = document.querySelector("input:nth-of-type(2)").value;
  qtdPerQuizz = document.querySelector("input:nth-of-type(3)").value;
  qtdNivQuizz = document.querySelector("input:nth-of-type(4)").value;

  let tituloValido = validarTitulo(tituloQuizz);
  //let tituloValido = true;
  let urlValido = validarUrl(urlQuizz);
  //let urlValido = true;
  let qtdPerQuizzValido = validarNumMin(qtdPerQuizz, minPer);
  let qtdNivQuizzValido = validarNumMin(qtdNivQuizz, minNiveis);

  if (!tituloValido) {
    tratarErro("titulo");
  }
  if (!urlValido) tratarErro("url");

  if (!qtdPerQuizz) tratarErro("perquizz");
  if (!qtdNivQuizzValido) tratarErro("nivquizz");

  if (urlValido && tituloValido && qtdNivQuizzValido && qtdPerQuizzValido) {
    objetoQuizz.title = tituloQuizz;
    objetoQuizz.image = urlQuizz;

    divScreen.innerHTML = "";
    divScreen.innerHTML += topo;

    screen3per(Number(qtdPerQuizz));
  }
}

function screen3per(numPer) {
  let textoInner = ";";
  textoInner += `
        <div class="conteudoScreen3">
            <h1><strong>Crie suas perguntas</strong></h1>
            <ul class="listaperguntas">
    `;
  for (let i = 0; i < numPer; i++) {
    let aux = classesAux[1];
    if (i == 0) {
      aux = classesAux[0];
    }
    textoInner += `

                <li class="pergunta ${aux}">
                    <div class="divComecarQuizz">
                        <h2>
                            <strong>Pergunta ${i + 1}</strong>             
                            <ion-icon name="create-outline" onclick="expandirOuContrairLi(this)"> </ion-icon>
                        </h2>          
                        <input type="text" placeholder="Texto da Pergunta" class="title" />
                        <input type="text" placeholder="Cor de fundo da Pergunta" class="cor" />
                        
                        <div class="respostacorreta">
                            <h2><strong>Resposta correta</strong></h2>
                            <input type="text" placeholder="Resposta correta" />
                            <input type="text" placeholder="URL da imagem" />
                        </div>
                    `;
    textoInner += `
                        <div class="respostasincorretas">
                            <h2><strong>Respostas incorretas</strong></h2>
                    `;

    for (let j = 1; j < 4; j++) {
      textoInner += `
                            <div class="incorreta">
                                <input type="text" placeholder="Resposta incorreta ${j}"/>
                                <input type="text" placeholder="URL da imagem ${j}" />
                            </div>`;
    }

    textoInner += `                  
                        </div>
                    </div>
                </li>`;
  }
  textoInner += `
            </ul>
        </div>

        <div class="botaoProsseguir" onclick="prosseguirParaNiveis()">
          Prosseguir pra criar Níveis
        </div>`;

  divScreen.innerHTML += textoInner;
}

function prosseguirParaNiveis() {
  const lista = divScreen.querySelector("ul");
  const perguntas = lista.querySelectorAll("li");
  let arrayQuestoes = [];
  let arrayValido = false;
  for (let i = 0; i < perguntas.length; i++) {
    objQuestao = construirObjQuest(perguntas[i]);
    if (objQuestao !== null) {
      arrayQuestoes.push(objQuestao);
    } else {
      tratarErro("pergunta " + (i + 1));
    }
  }
  if (arrayQuestoes.length == perguntas.length) {
    objetoQuizz.questions = arrayQuestoes;
    screen3Nivs(Number(qtdNivQuizz));
  }
}

function screen3Nivs(qtdNiveis) {
  divScreen.innerHTML = "";
  divScreen.innerHTML += topo;

  let textoInner = `
    <div class="conteudoScreen3">
        <h1><strong>Agora, decida os níveis!</strong></h1>
        <ul>
        </ul>
        <div class="botaoProsseguir" onclick="prosseguirParaFinalizar()">
            Finalizar quizz
        </div>
    </div>
    `;
  divScreen.innerHTML += textoInner;
  popularULcomXLis(divScreen.querySelector("ul"), qtdNiveis);
}

function prosseguirParaFinalizar() {
  /*    let promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", obj2Quizz);
    promise.then(screen3Finalizar);
    promise.catch(deuErroNoPost);
*/

  let arrayNiveis = [];
  let inputs = [];
  let titulo = "";
  let percent = 0;
  let urlNiv = "";
  let descricao = "";
  let tituloValido = false;
  let percentValido = false;
  let urlValido = false;
  let descricaoValida = false;
  let peloMenosUmZero = false;
  let objNivel = criarNivel();

  const niveis = document.querySelectorAll(".nivel");
  console.log(niveis);

  for (let i = 0; i < niveis.length; i++) {
    inputs = niveis[i].querySelectorAll("input");
    titulo = inputs[0].value;
    percent = inputs[1].value;
    urlNiv = inputs[2].value;
    descricao = inputs[3].value;

    tituloValido = validarTextoMin(titulo, 10);
    percentValido = validarNumIntervalo(percent, 0, 100);
    urlValido = validarUrl(urlNiv);
    descricaoValida = validarTextoMin(descricao, 30);

    if (tituloValido && percentValido && urlValido && descricaoValida) {
      objNivel = criarNivel();
      setarTitle(objNivel, titulo);
      setarMinValue(objNivel, percent);
      setarImage(objNivel, urlNiv);
      setarText(objNivel, descricao);
      if (percent == 0) {
        peloMenosUmZero = true;
      }
      arrayNiveis.push(objNivel);
    }

    if (!tituloValido) {
      tratarErro("titulo " + i);
    }
    if (!percentValido) {
      tratarErro("percentual " + i);
    }
    if (!urlValido) {
      tratarErro("url " + i);
    }
    if (!descricaoValida) {
      tratarErro("descricao " + i);
    }
  }
  if (arrayNiveis.length == niveis.length && peloMenosUmZero) {
    objetoQuizz.levels = arrayNiveis;
    let promise = axios.post(
      "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes",
      objetoQuizz
    );
    promise.then(screen3Finalizar);
    promise.catch(deuErroNoPost);
  } else {
    tratarErro(
      "ou não tá tudo feito ou nao tem pelo menos um nível com percentual zero "
    );
  }

  if (!tituloValido) {
    tratarErro("titulo " + i);
  }
  if (!percentValido) {
    tratarErro("percentual " + i);
  }
  if (!urlValido) {
    tratarErro("url " + i);
  }
  if (!descricaoValida) {
    tratarErro("descricao " + i);
  }
}
if (arrayNiveis.length == niveis.length && peloMenosUmZero) {
  objetoQuizz.levels = arrayNiveis;
  let promise = axios.post(
    "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes",
    objetoQuizz
  );
  promise.then(screen3Finalizar);
  promise.catch(deuErroNoPost);
} else {
  tratarErro(
    "ou não tá tudo feito ou nao tem pelo menos um nível com percentual zero "
  );
}

function renderizarTelaFinal() {
  divScreen.innerHTML = "";
  divScreen1.innerHTML = "";
  let textoInner = topo;
  textoInner += `
      <div class="conteudoScreen3">
          <h1><strong>Seu quizz está pronto!</strong></h1>
          <div
          class="quizzFinal"
          style="background-image: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(0, 0, 0, 0.5) 64.58%,
            #000000 100%
          ), url(${objetoQuizz.image})"
          onclick=""
          >
              <p class="titulo" >${objetoQuizz.title}</p>
              <p class="hidden">${id}</p>
          </div>
          <div class="botaoProsseguir" onclick="acessarQuizz()">
              Acessar Quizz
          </div>
          <div class="buttomHome buttomFinal" onclick="restarPage()">Voltar pra home</div>
      </div>
      `;
  divScreen1.innerHTML = textoInner;
}

function screen3Finalizar(response) {
  renderizarTelaFinal();
  console.log("deu certo");
  id = response.data.id;
  let localstore = localStorage.getItem("idQuizzesUsuario");
  let array = [];
  let str = "";

  if (localstore !== null) {
    array = JSON.parse(localstore);
  }
  array.push(id);
  str = JSON.stringify(array);
  localStorage.setItem("idQuizzesUsuario", str);
}

function obterMeusQuizzes() {
  let localstore = localStorage.getItem("idQuizzesUsuario");
  if (localstore !== null) {
    return JSON.parse(localstore);
  }
  return null;
}

function deuErroNoPost(erro) {
  console.log(erro.response.status);
}

function validarNumIntervalo(num, min, max) {
  if (num >= min && num <= max) return true;
  return false;
}

function criarNivel() {
  let objNivel = {
    title: "",
    image: "",
    text: "",
    minValue: 0,
  };
  return objNivel;
}
function setarTitle(obj, text) {
  obj.title = text;
}
function setarImage(obj, image) {
  obj.image = image;
}
function setarText(obj, text) {
  obj.text = text;
}
function setarMinValue(obj, minValue) {
  obj.minValue = minValue;
}

function popularULcomXLis(ul, x) {
  for (let i = 1; i <= x; i++) {
    let aux = classesAux[1];
    if (i == 1) {
      aux = classesAux[0];
    }
    ul.innerHTML += `
        <li class="nivel ${aux}">
            <div class="divComecarQuizz">
            <h2>
                <strong>Nível ${i} </strong>             
                <ion-icon name="create-outline" onclick="expandirOuContrairLi(this)"> </ion-icon>
            </h2>  
            <input type="text" placeholder="Título do nível" />
            <input type="text" placeholder="% de acerto mínima" />
            <input type="text" placeholder="URL da imagem do nível" />
            <input type="text" placeholder="Descrição do nível" />
            </div>
        </li>`;
  }
}

function construirObjQuestVazio() {
  let objQst = {
    title: "",
    color: "",
    answers: [],
  };
  return objQst;
}

function construirObjQuest(li) {
  let tituloValido = false;
  let corValida = false;
  let respostaValida = false;
  let pelomenosumaIncorreta = false;
  let arrayResps = [];

  let objResposta = {};

  const titulo = li.querySelector("input.title").value;
  const cor = li.querySelector("input.cor").value;
  const respcorreta = li.querySelectorAll(".respostacorreta input");

  tituloValido = validarTextoMin(titulo, 20);
  corValida = validarCor(cor);
  respostaValida = validarResposta(respcorreta[0].value, respcorreta[1].value);

  if (!tituloValido) {
    tratarErro("titulo da questao tem que ser maior que 20");
    return null;
  }
  if (!corValida) {
    tratarErro("erro na cor...");
    return null;
  }
  if (!respostaValida) {
    tratarErro("precisa de ter uma resposta correta");
    return null;
  }

  if (respostaValida) {
    objResposta = construirObjetoResposta(
      respcorreta[0].value,
      respcorreta[1].value,
      true
    );
    arrayResps.push(objResposta);
  }

  const respostasincorretas = li.querySelectorAll(".incorreta");
  for (let i = 0; i < respostasincorretas.length; i++) {
    let respIncorreta = respostasincorretas[i].querySelectorAll("input");
    let textIncorreto = respIncorreta[0].value;
    let urlInc = respIncorreta[1].value;

    if (validarResposta(textIncorreto, urlInc)) {
      objResposta = construirObjetoResposta(textIncorreto, urlInc, false);
      if (objResposta !== null) {
        arrayResps.push(objResposta);
        pelomenosumaIncorreta = true;
      }
    }
  }

  let objQst = {
    title: "",
    color: "",
    answers: [],
  };
  if (!pelomenosumaIncorreta) {
    tratarErro("precisa de ter pelo menos uma resp incorreta");
    return null;
  }

  if ((corValida, tituloValido, respostaValida, pelomenosumaIncorreta)) {
    objQst.title = titulo;
    objQst.color = cor;
    objQst.answers = arrayResps;
    console.log(objQst);

    return objQst;
  } else {
    return null;
  }
}

function construirObjetoResposta(text, url, certa) {
  let objResposta = {
    text: "",
    image: "",
    isCorrectAnswer: false,
  };

  objResposta.text = text;
  objResposta.image = url;
  objResposta.isCorrectAnswer = certa;
  return objResposta;
}

function validarResposta(texto, url) {
  if (validarTextoMin(texto, 0) && validarUrl(url)) return true;
  return false;
}

function validarTextoMin(texto, min) {
  let trimado = limparstr(texto);
  return trimado.length > min;
}

function validarCor(cor) {
  const pattern = /^#[0-9a-f]{3,6}$/i;
  return pattern.test(cor);
}

function criarTela3() {
  divScreen1.innerHTML = "";
  const textoInner = `
    <div class="topBar">BuzzQuizz</div>
    <div class="conteudoScreen3">
      <h1><strong>Comece pelo começo</strong></h1>
      <div class="divComecarQuizz">
        <input type="text" placeholder="Título do seu quizz" />
        <input type="text" placeholder="URL da imagem do seu quizz" />
        <input type="text" placeholder="Quantidade de perguntas do quizz" />
        <input type="text" placeholder="Quantidade de níveis do quizz" />
      </div>
      <div class="botaoProsseguir" onclick="prosseguirParaPergs()">
        Prosseguir pra criar perguntas
      </div>
    </div>
    `;
  divScreen.innerHTML = topo + textoInner;
}

function validarTitulo(titulo) {
  let trimado = limparstr(titulo);
  if (trimado.length >= 20 && trimado.length <= 65) return true;
  else return false;
}

function limparstr(str) {
  return str.replace(/\s+/g, " ").trim();
}

function expandirOuContrairLi(icon) {
  const li = icon.parentNode.parentNode.parentNode;
  const ul = li.parentNode;
  const emEdicao = ul.querySelector(".emEdicao");
  if (emEdicao !== li) {
    li.classList.toggle("emEdicao");
    li.classList.toggle("ocultar");
    emEdicao.classList.toggle("ocultar");
    emEdicao.classList.toggle("emEdicao");
  }
}

function tratarErro(erro) {
  alert("favor preencher os dados corretamente: " + erro);
}

function validarUrl(url) {
  let padrao =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  return padrao.test(url);
}

function validarNumMin(num, minimo) {
  let numero = parseInt(num);

  if (isNaN(numero)) {
    return false;
  } else {
    if (numero < minimo) return false;
    return true;
  }
}

//criarTela3();
//screen3Nivs(2);
//renderizarTelaFinal();
