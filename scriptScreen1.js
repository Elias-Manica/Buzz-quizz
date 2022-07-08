printScreen1();

loadingscreen1();

catchQuizzes();

getQuizzLocalStorage();

function getQuizzLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
  }
  let boxMyQuizzEmpty = document.querySelector(".boxMyQuizzEmpty");
  let boxMyQuizzProject = document.querySelector(".boxMyQuizzProject");
  if (localStorage.length > 0) {
    boxMyQuizzEmpty.classList.add("hidden");
    boxMyQuizzProject.classList.remove("hidden");
  }
}

function loadingscreen1() {
  let divAllQuizz = document.querySelector(".allQuizz");
  divAllQuizz.innerHTML = "";
  divAllQuizz.innerHTML = `
    <div class="topBar">BuzzQuizz</div>
    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>    `;
}

function catchQuizzes() {
  const promisse = axios.get(
    "https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes/"
  );

  promisse.then(showAllQuizz);
}

function obterMeusQuizzes() {
  let localstore = localStorage.getItem("idQuizzesUsuario");
  if (localstore !== null) {
    return JSON.parse(localstore);
  }
  return null;
}

function showAllQuizz(object) {
  let listObjects = object.data;
  let divAllQuizz = document.querySelector(".allQuizz");
  //let showList = [];
  divAllQuizz.innerHTML = "";
  let meusQuizzes = obterMeusQuizzes();
  const divMeusQuizzes = document.querySelector(".myCreatedQuizz");

  for (let i = 0; i < listObjects.length; i++) {
    if (localStorage.length > 0) {
      if (meusQuizzes.includes(listObjects[i].id)) {
        imprimeObjetoNaDiv(listObjects[i], divMeusQuizzes);
        continue;
      }
    }
    imprimeObjetoNaDiv(listObjects[i], divAllQuizz);
  }
}

function imprimeObjetoNaDiv(objeto, div) {
  let image = objeto.image;
  let title = objeto.title;
  let id = objeto.id;
  //showList.push(image);
  //showList.push(title);
  if (div === document.querySelector(".myCreatedQuizz")) {
    div.innerHTML += `
    <div
      class="quizz"
      style="background-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 64.58%,
        #000000 100%
      ), url(${image})"
      onclick="wait(this)"
      >
        <p>
          ${title}
        </p>
        <p class="hidden">${id}</p>
        <p class="hidden">${valorKey}</p>
      <div class="deleteEdit">
        <ion-icon name="trash-outline" onclick="eraseQuizz(this)"></ion-icon>
      </div>
    </div>
  `;
  } else {
    div.innerHTML += `
    <div
      class="quizz"
      style="background-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 64.58%,
        #000000 100%
      ), url(${image})"
      onclick="wait(this)"
      >
        <p>
          ${title}
        </p>
        <p class="hidden">${id}</p>
    </div>
  `;
  }
}

function printScreen1() {
  let printScreen = document.querySelector(".screen1");
  printScreen.innerHTML = "";
  printScreen.innerHTML = `
  <div class="topBar">BuzzQuizz</div>
  <div class="contentQuizz">
    <div class="boxMyQuizzEmpty">
      <div class="myQuizz">
        <p>Você não criou nenhum quizz ainda :(</p>
        <div class="createQuizz" onclick="criarTela3()">Criar Quizz</div>
      </div>
    </div>
    <div class="boxMyQuizzProject hidden">
      <div class="title">
        <h1>Seus Quizzes</h1>
        <ion-icon name="add-circle-sharp" onclick="criarTela3()"></ion-icon>
      </div>
      <div class="myCreatedQuizz">
        
      </div>
    </div>
    <div class="boxAllQuizz">
      <h1>Todos os Quizzes</h1>
      <div class="allQuizz"></div>
    </div>
  </div>
  `;
}

function quizzExcluido() {
  setTimeout(mostraQuizzExlcuido, 2000);
}

function mostraQuizzExlcuido() {
  let printScreen = document.querySelector(".screen1");
  printScreen.innerHTML = "";
  printScreen.innerHTML = `
  <div class="topBar">BuzzQuizz</div>
  <div class="contentQuizz">
    <h6>O seu quizz foi excluido</h6>
    <div class="buttomHome" onclick="window.location.reload()">Voltar pra home</div>
  </div>

  
  `;
  localStorage.removeItem("idQuizzesUsuario");
}

function naoquizzExcluido() {
  let printScreen = document.querySelector(".screen1");
  printScreen.innerHTML = "";
  printScreen.innerHTML = `
  <p>o quizz não foi excluido</p>
  `;
}

function eraseQuizz() {
  let meusQuizzes = obterMeusQuizzes();
  let secreteKey = meusQuizzes[1];
  let id = meusQuizzes[0];

  console.log(secreteKey);
  console.log(id);
  const promise = axios.delete(
    `https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes/${id}`,
    {
      headers: {
        "Secret-Key": secreteKey,
      },
    }
  );

  promise.then(quizzExcluido);
  promise.catch(naoquizzExcluido);
}
