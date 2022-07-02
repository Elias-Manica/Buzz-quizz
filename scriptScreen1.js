printScreen1();

catchQuizzes();

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
        </div>
        <div
          class="quizz"
          style="background-image: url(imagens/deferiascomoex.jpg)"
        >
          <p>É ex-BBB ou ex-De férias com o Ex?</p>
        </div>
        <div
          class="quizz"
          style="background-image: url(imagens/deferiascomoex.jpg)"
        >
          <p>É ex-BBB ou ex-De férias com o Ex?</p>
        </div>
        <div
          class="quizz"
          style="background-image: url(imagens/deferiascomoex.jpg)"
        >
          <p>É ex-BBB ou ex-De férias com o Ex?</p>
        </div>
        <div
          class="quizz"
          style="background-image: url(imagens/deferiascomoex.jpg)"
        >
          <p>É ex-BBB ou ex-De férias com o Ex?</p>
        </div>
        <div
          class="quizz"
          style="background-image: url(imagens/deferiascomoex.jpg)"
        >
          <p>É ex-BBB ou ex-De férias com o Ex?</p>
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
