// define variables
const questions = [
	{
	  question: "What does DOM stand for in JavaScript?",
	  options: ["Document Only Model", "Document Object Model", "Dominic, the guy down at the pizza shop", "Data Object Model"],
	  answer: 1
	},
	{
	  question: "Which of the following is a correct way to declare a variable in JavaScript?",
	  options: ["variable x;", "let x;", "var x;", "var = x;"],
	  answer: 1
	},
	{
	  question: "What does the typeof operator do in JavaScript?",
	  options: ["It returns the data type of a variable", "It compares two values for equality", "It converts a variable to a boolean value", "It creates a new object"],
	  answer: 0
	},
	{
	  question: "Which of the following is a correct way to write an if statement in JavaScript?",
	  options: ["if (x = 5) { ... }", "if x = 5 { ... }", "if [x == 5] { ... }", "if (x == 5) { ... }"],
	  answer: 3
	},
	{
	  question: "What does the addEventListener method do in JavaScript?",
	  options: ["It adds a new property to an object", "It creates a new element in the HTML DOM", "It attaches an event handler function to an element", "It creates a new object"],
	  answer: 2
	}
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 75;
  let timerInterval;
  
  // define functions
  function startQuiz() {
	// hide start button and show question card
	document.getElementById("start-btn").classList.add("d-none");
	document.getElementById("question-card").classList.remove("d-none");
	// show first question
	showQuestion();
	// start timer
	timerInterval = setInterval(updateTimer, 1000);
  }
  
  function showQuestion() {
	// show question text
	document.getElementById("question-number").textContent = currentQuestion + 1;
	document.getElementById("question-text").textContent = questions[currentQuestion].question;
	// show options
	document.getElementById("option1-label").textContent = questions[currentQuestion].options[0];
	document.getElementById("option1").value = 0;
	document.getElementById("option2-label").textContent = questions[currentQuestion].options[1];
	document.getElementById("option2").value = 1;
	document.getElementById("option3-label").textContent = questions[currentQuestion].options[2];
	document.getElementById("option3").value = 2;
	document.getElementById("option4-label").textContent = questions[currentQuestion].options[3];
	document.getElementById("option4").value = 3;
	// reset options form
	document.getElementById("options-form").reset();
  }
  
  function submitAnswer() {
	// check if an option is selected
	const selectedOption = document.querySelector('input[name="option"]:checked');
	if (!selectedOption) {
	  return;
	}
	// check if answer is correct
	const answer = parseInt(selectedOption.value);
	if (answer === questions[currentQuestion].answer) {
	  score++;
	  // play correct answer sound
	  const audio = new Audio('correct.mp3');
	  audio.play();
	  // update timer
	  timeLeft += 10;
	} else {
	  // play incorrect answer sound
	  const audio = new Audio('incorrect.mp3');
	  audio.play();
	  // update timer
	  timeLeft -= 10;
	}
	// go to next question or end quiz
	currentQuestion++;
	if (currentQuestion < questions.length) {
	  showQuestion();
	} else {
	  endQuiz();
	}
  }
  
function endQuiz() {
  // stop timer
  clearInterval(timerInterval);
  // hide question card and show result card
  document.getElementById("question-card").classList.add("d-none");
  document.getElementById("result-card").classList.remove("d-none");
  // show score
  document.getElementById("score-value").textContent = score;
  // add initials to high scores list
  Swal.fire({
    title: "High Scores",
    html: `<input id="initials-input" class="swal2-input" placeholder="Enter your initials"></input>`,
    confirmButtonText: "Submit",
    preConfirm: () => {
      const initials = document.getElementById("initials-input").value;
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials: initials, score: score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
    },
  });
}	