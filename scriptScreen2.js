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
