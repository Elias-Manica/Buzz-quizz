let photoBanner;
let title;
let questionsQuizz = [];
let global;
let qtfyQuest;
let answerQuizz = [];

catchQuestionsQuizz();

function catchQuestionsQuizz() {
  const promisse = axios.get(
    "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/1"
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
    for (let i = 0; i < 1; i++) {
      answerQuizz.push(global[j].answers);
    }
  }
  qtfyQuest = quantifyQuestions(questionsQuizz);
}

function quantifyQuestions(array) {
  let quantify = array.length;
  return quantify;
}

function comparador() {
  return Math.random() - 0.5;
}

function putQuestions(array, number) {
  let allscreen2 = document.querySelector(".allscreen2");
  allscreen2.innerHTML = "";

  for (let i = 0; i < number; i++) {
    allscreen2.innerHTML += `
      <div class="boxQuestion">
          <div class="question"><p>${array[i]}</p></div>
              <div class="boxAnswer">
                  
              </div>
        </div>
      `;
  }
  let boxAnswer = document.querySelectorAll(".boxAnswer");
  for (let j = 0; j < number; j++) {
    console.log(answerQuizz[j]);
    answerQuizz[j].sort(comparador);
    console.log(answerQuizz[j]);
    for (let p = 0; p < answerQuizz[j].length; p++) {
      if (answerQuizz[j][p].isCorrectAnswer) {
        boxAnswer[j].innerHTML += `
        <div class="answer" onclick="selectAnswer(this)" >
          <img src=${answerQuizz[j][p].image} />
          <p class = "green black">${answerQuizz[j][p].text}</p>
        </div>
      `;
      } else {
        boxAnswer[j].innerHTML += `
        <div class="answer" onclick="selectAnswer(this)" >
          <img src=${answerQuizz[j][p].image} />
          <p class = "red black">${answerQuizz[j][p].text}</p>
        </div>
      `;
      }
    }
  }
}

function selectAnswer(element) {
  let dad = element.parentNode.children;
  for (let i = 0; i < dad.length; i++) {
    element.parentNode.children[i].classList.add("opacity");
    element.parentNode.children[i].children[1].classList.remove("black");
  }
  element.classList.remove("opacity");
  element.parentNode.classList.add("noclick");

  setTimeout(function () {
    element.parentNode.parentElement.nextElementSibling.scrollIntoView();
  }, 2000);
}

function goToNextQuestion(element) {}

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
