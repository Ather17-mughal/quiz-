const quizData = {
  easy: [
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: "4" },
    { question: "Which color is in the rainbow?", answers: ["Black", "Red", "Gray", "White"], correct: "Red" },
    { question: "Which day comes after Monday?", answers: ["Sunday", "Tuesday", "Friday", "Thursday"], correct: "Tuesday" },
  ],
  medium: [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Rome", "Berlin"], correct: "Paris" },
    { question: "What is 5 * 3?", answers: ["8", "15", "10", "20"], correct: "15" },
    { question: "Which language is used for web development?", answers: ["Python", "C++", "JavaScript", "Java"], correct: "JavaScript" },
    { question: "What is 10 / 2?", answers: ["2", "5", "4", "6"], correct: "5" },
    { question: "Which is the largest planet?", answers: ["Earth", "Mars", "Jupiter", "Venus"], correct: "Jupiter" },
  ],
  hard: [
    { question: "What is the square root of 81?", answers: ["7", "8", "9", "10"], correct: "9" },
    { question: "What is 12 * 12?", answers: ["121", "142", "144", "132"], correct: "144" },
    { question: "What is the capital of Norway?", answers: ["Stockholm", "Oslo", "Helsinki", "Copenhagen"], correct: "Oslo" },
    { question: "What is 2^3?", answers: ["6", "8", "9", "10"], correct: "8" },
    { question: "Who wrote 'Hamlet'?", answers: ["Shakespeare", "Tolkien", "Dickens", "Hemingway"], correct: "Shakespeare" },
  ],
};

let selectedDifficulty = null;
let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

document.querySelectorAll(".difficulty-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedDifficulty = btn.getAttribute("data-difficulty");
    document.getElementById("difficulty-container").classList.add("hidden");
    questionContainer.classList.remove("hidden");
    loadQuestion();
  });
});

function loadQuestion() {
  const currentQuiz = quizData[selectedDifficulty][currentQuestionIndex];
  questionElement.textContent = currentQuiz.question;
  optionsElement.innerHTML = "";
  currentQuiz.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => checkAnswer(answer);
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = quizData[selectedDifficulty][currentQuestionIndex].correct;
  if (selectedAnswer === correctAnswer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData[selectedDifficulty].length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.classList.add("hidden");
  resultElement.classList.remove("hidden");
  scoreElement.textContent = `Your score: ${score} / ${quizData[selectedDifficulty].length}`;
}

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  selectedDifficulty = null;
  resultElement.classList.add("hidden");
  document.getElementById("difficulty-container").classList.remove("hidden");
});
