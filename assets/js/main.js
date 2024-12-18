// Données du quiz
const quizData = [
  {
    question: "Quel langage s'exécute dans un navigateur web ?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "Que signifie CSS ?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "Que signifie HTML ?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborghinis",
    correct: "a",
  },
  {
    question: "En quelle année JavaScript a-t-il été lancé ?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "Aucune de ces réponses",
    correct: "b",
  },
];

const submitButton = document.querySelector("#submit");
const reloadButton = document.querySelector("#reload");
const quizContainer = document.getElementById("Quiz");
const resultContainer = document.querySelector(".result-container");
const feedbackContainer = document.getElementById("feedback");

let currentQuestionNumber = 0;
let correctAnswers = 0;
let submittedAnswers = [];

// Fonction pour charger la question
function loadQuiz() {
  resetAnswer();
  feedbackContainer.textContent = ""; // Réinitialiser le feedback

  if (quizData[currentQuestionNumber]) {
    const questionData = quizData[currentQuestionNumber];

    document.querySelector("#question").textContent = questionData.question;
    document.querySelector("#a_text").textContent = questionData.a;
    document.querySelector("#b_text").textContent = questionData.b;
    document.querySelector("#c_text").textContent = questionData.c;
    document.querySelector("#d_text").textContent = questionData.d;
  }
}

// Fonction pour réinitialiser la sélection des réponses
function resetAnswer() {
  document.querySelectorAll(".answer").forEach((ans) => (ans.checked = false));
}

// Fonction pour récupérer les réponses soumises
function getSubmittedAnswers() {
  document.querySelectorAll(".answer").forEach((ans) => {
    if (ans.checked) {
      submittedAnswers.push(ans.id);
    }
  });
}

// Fonction pour traiter les résultats du quiz
function processResult() {
  let incorrectAnswers = [];
  for (let i = 0; i < quizData.length; i++) {
    const correctAnswer = quizData[i].correct;
    const userAnswer = submittedAnswers[i];

    // Calculer le score
    if (correctAnswer === userAnswer) {
      correctAnswers++;
    } else {
      incorrectAnswers.push({
        question: quizData[i].question,
        correctAnswer: quizData[i][correctAnswer],
        userAnswer: quizData[i][userAnswer] || "Pas de réponse",
      });
    }
  }

  return incorrectAnswers;
}

// Fonction pour réinitialiser le quiz
function reset() {
  currentQuestionNumber = 0;
  submittedAnswers = [];
  correctAnswers = 0;
  loadQuiz(); // Recharger le quiz à partir de la première question
}

submitButton.addEventListener("click", function () {
  // Si toutes les réponses ont été soumises pour la question actuelle
  getSubmittedAnswers();

  if (submittedAnswers.length === currentQuestionNumber + 1) {
    const currentAnswer = quizData[currentQuestionNumber].correct;
    const selectedAnswer = submittedAnswers[currentQuestionNumber];

    // Afficher un feedback immédiat
    if (currentAnswer === selectedAnswer) {
      feedbackContainer.textContent = "Correct!";
      feedbackContainer.style.color = "green";
    } else {
      feedbackContainer.textContent = "Incorrect!";
      feedbackContainer.style.color = "red";
    }

    // Attendre avant de passer à la question suivante
    setTimeout(() => {
      resetAnswer();
      currentQuestionNumber++;

      if (currentQuestionNumber < quizData.length) {
        loadQuiz();
      } else {
        const incorrectAnswers = processResult();

        // Afficher les réponses incorrectes
        let incorrectAnswersHtml = "<h3>Réponses incorrectes :</h3>";
        incorrectAnswers.forEach((ans, index) => {
          incorrectAnswersHtml += `
            <p><strong>Question ${index + 1} :</strong> ${ans.question}</p>
            <p>Votre réponse : ${ans.userAnswer}</p>
            <p>Réponse correcte : ${ans.correctAnswer}</p>
          `;
        });

        feedbackContainer.innerHTML = incorrectAnswersHtml;
        resultContainer.querySelector("#totalQuestions").textContent = quizData.length;
        resultContainer.querySelector("#totalRightAnswers").textContent = correctAnswers;

        quizContainer.classList.add("hide");
        resultContainer.classList.remove("hide");
      }
    }, 1000); // Attendre 1 seconde avant de passer à la question suivante
  }
});

reloadButton.addEventListener("click", function () {
  reset();
  quizContainer.classList.remove("hide");
  resultContainer.classList.add("hide");
});

// Initialiser le quiz au chargement de la page
loadQuiz();
