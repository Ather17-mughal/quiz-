const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Rome", "Berlin"],
    correct: "Paris",
  },
  {
    question: "Which language is used for web development?",
    answers: ["Python", "C++", "JavaScript", "Java"],
    correct: "JavaScript",
  },
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: "4",
  },
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionElement.textContent = currentQuiz.question;
  answersElement.innerHTML = "";
  currentQuiz.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => checkAnswer(answer);
    answersElement.appendChild(button);
  });
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = quizData[currentQuestion].correct;
  if (selectedAnswer === correctAnswer) {
    score++;
  }
  currentQuestion++;
  nextButton.classList.remove("hidden");
  answersElement.innerHTML = "";
}

function showResult() {
  resultElement.classList.remove("hidden");
  document.getElementById("quiz").classList.add("hidden");
  scoreElement.textContent = `Your score: ${score} / ${quizData.length}`;
}

function nextQuestion() {
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
  nextButton.classList.add("hidden");
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultElement.classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
}

nextButton.addEventListener("click", nextQuestion);

// Initialize quiz
loadQuestion();
