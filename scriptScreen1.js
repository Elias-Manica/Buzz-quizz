printScreen1();

loadingscreen1();

catchQuizzes();

getQuizzLocalStorage();

function getQuizzLocalStorage() {
  console.log(localStorage.length);
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(value);
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
    "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes"
  );

  promisse.then(showAllQuizz);
}

function showAllQuizz(object) {
  console.log(object);
  let listObjects = object.data;
  let divAllQuizz = document.querySelector(".allQuizz");
  let image;
  let title;
  let showList = [];
  divAllQuizz.innerHTML = "";
  for (let i = 0; i < listObjects.length; i++) {
    image = listObjects[i].image;
    title = listObjects[i].title;
    if (!showList.includes(image) || !showList.includes(title)) {
      showList.push(image);
      showList.push(title);
      divAllQuizz.innerHTML += `
      <div
        class="quizz"
        style="background-image: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(0, 0, 0, 0.5) 64.58%,
          #000000 100%
        ), url(${listObjects[i].image})"
        onclick="wait(this)"
        >
          <p>
            ${listObjects[i].title}
          </p>
          <p class="hidden">${listObjects[i].id}</p>
      </div>
    `;
    }
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
        <div class="createQuizz" onclick="">Criar Quizz</div>
      </div>
    </div>
    <div class="boxMyQuizzProject hidden">
      <div class="title">
        <h1>Seus Quizzes</h1>
        <ion-icon name="add-circle-sharp"></ion-icon>
      </div>
      <div class="myCreatedQuizz">
        <div
          class="quizz"
          style="background-image: url(imagens/deferiascomoex.jpg)"
        >
          <p>É ex-BBB ou ex-De férias com o Ex?</p>
          <div class="boxRed">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon name="trash-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="boxAllQuizz">
      <h1>Todos os Quizzes</h1>
      <div class="allQuizz"></div>
    </div>
  </div>
  `;
}
