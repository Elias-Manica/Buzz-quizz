let photoBanner;
let title;
let questionsQuizz = [];
let global;
let qtfyQuest;

catchQuestionsQuizz();

function catchQuestionsQuizz() {
  const promisse = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/8179"
  );

  promisse.then(showQuestionsQuizz);
}

function showQuestionsQuizz(object) {
  console.log(object.data);
  photoBanner = object.data.image;
  title = object.data.title;
  global = object.data.questions;
  for (let j = 0; j < global.length; j++) {
    questionsQuizz.push(global[j].title);
  }
  console.log(questionsQuizz);
  qtfyQuest = quantifyQuestions(questionsQuizz);
}

function quantifyQuestions(array) {
  let quantify = array.length;
  return quantify;
}

function putQuestions(array, number) {
  let allscreen2 = document.querySelector(".allscreen2");
  allscreen2.innerHTML = "";
  for (let i = 0; i < number; i++) {
    allscreen2.innerHTML += `
        <div class="boxQuestion">
            <div class="question"><p>${array[i]}</p></div>
            <div class="boxAnswer">
                <div class="answer">
                <img src="./imagens/guiex.jpg" />
                <p>Gui araujo</p>
                </div>
                <div class="answer">
                <img src="./imagens/ex2.jpg" />
                <p>Esse cara aí</p>
                </div>
                <div class="answer">
                <img src="./imagens/ex3.jpg" />
                <p>Esse outro</p>
                </div>
                <div class="answer">
                <img src="./imagens/bbb.PNG" />
                <p>Esqueci o nome também</p>
                </div>
            </div>
          </div>
        `;
  }
}

function htmlScreen2() {
  let screen1 = document.querySelector(".screen1");
  screen1.innerHTML = "";
  screen1.innerHTML = `
    <div class="topBar">BuzzQuizz</div>
      <div
        class="bannerQuizz"
        style="
          background-image: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.57),
              rgba(0, 0, 0, 0.57)
            ),
            url(${photoBanner});
        "
      >
        <p>${title}</p>
      </div>
      <div class="allscreen2">
        </div>
      </div>
    `;
  putQuestions(questionsQuizz, qtfyQuest);
}
