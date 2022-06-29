catchQuizzes();

function catchQuizzes() {
  const promisse = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );

  promisse.then(showAllQuizz);
}

function showAllQuizz(object) {
  let listObjects = object.data;
  let divAllQuizz = document.querySelector(".allQuizz");
  let image;
  let title;
  let showList = [];
  divAllQuizz.innerHTML = "";
  console.log(listObjects);
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
        onclick="htmlScreen2()"
        >
          <p>
            ${listObjects[i].title}
          </p>
      </div>
    `;
    }
  }
  console.log(showList);
}
