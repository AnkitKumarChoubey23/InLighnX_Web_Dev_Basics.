// 🗂️ Quiz Data Array
const quizData = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "High Tech Markup Language", "Hyperloop Tag Management Layer", "Hyperlink Text Machine Logic"],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    choices: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "What does DOM stand for?",
    choices: ["Document Object Model", "Digital Operation Method", "Display Output Monitor", "Data Oriented Module"],
    answer: 0
  },
  {
    question: "Which keyword is used to declare variables in JavaScript?",
    choices: ["var", "int", "float", "string"],
    answer: 0
  },
  {
    question: "Which of these is a JavaScript framework?",
    choices: ["React", "Laravel", "Django", "Flask"],
    answer: 0
  }
];

// 🔢 State Variables
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// 📌 DOM Elements
const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const answerOptions = document.getElementById("answer-options");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreDisplay = document.getElementById("score-display");
const summaryList = document.getElementById("summary-list");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionText.textContent = q.question;
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  answerOptions.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.dataset.index = index;
    li.addEventListener("click", selectAnswer);
    answerOptions.appendChild(li);
  });

  submitBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
}

function selectAnswer(e) {
  const selected = e.target;
  const options = answerOptions.querySelectorAll("li");
  options.forEach(option => option.classList.remove("selected"));
  selected.classList.add("selected");
}

submitBtn.addEventListener("click", () => {
  const selected = answerOptions.querySelector(".selected");
  if (!selected) return;

  const selectedIndex = parseInt(selected.dataset.index);
  const correctIndex = quizData[currentQuestion].answer;

  userAnswers.push({
    question: quizData[currentQuestion].question,
    selected: quizData[currentQuestion].choices[selectedIndex],
    correct: quizData[currentQuestion].choices[correctIndex],
    isCorrect: selectedIndex === correctIndex
  });

  if (selectedIndex === correctIndex) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("incorrect");
    answerOptions.children[correctIndex].classList.add("correct");
  }

  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}!`;

  summaryList.innerHTML = "";
  userAnswers.forEach((ans, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>Q${i + 1}:</strong> ${ans.question}<br>
    <span style="color: ${ans.isCorrect ? 'green' : 'red'};">
      Your Answer: ${ans.selected}</span><br>
    Correct Answer: ${ans.correct}`;
    summaryList.appendChild(li);
  });
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  resultBox.style.display = "none";
  quizBox.style.display = "block";
  loadQuestion();
});

// 🟢 Initial Load
loadQuestion();