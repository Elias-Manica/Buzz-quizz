catchQuestionsQuizz();

function catchQuestionsQuizz() {
  const promisse = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/8179"
  );

  promisse.then(showQuestionsQuizz);
}

function showQuestionsQuizz(object) {
  console.log(object);
}

function htmlScreen2() {
  console.log("oi");
  let screen1 = document.querySelector(".screen1");
  let screen2 = document.querySelector(".screen2");
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
            url(./imagens/deferiascomoex.jpg);
        "
      >
        <p>É ex-BBB ou ex-De férias com o Ex?</p>
      </div>
      <div class="allscreen2">
        <div class="boxQuestion">
          <div class="question"><p>Quem é o ex-bbb?</p></div>
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
        <div class="boxQuestion">
          <div class="question"><p>Quem é o ex-bbb?</p></div>
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
      </div>
    `;
}
