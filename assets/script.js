const questions = [
{
	question: "What does DOM stand for in JavaScript?",
	options: [
	"Document Only Model",
	"Document Object Model",
	"Dominic, the guy down at the pizza shop",
	"Data Object Model"
	],
	answer: 1
},
{
	question: "Which of the following is a correct way to declare a variable in JavaScript?",
	options: ["variable x;", "let x;", "var x;", "var = x;"],
	answer: 1
},
{
	question: "What does the typeof operator do in JavaScript?",
	options: [
	"It returns the data type of a variable",
	"It compares two values for equality",
	"It converts a variable to a boolean value",
	"It creates a new object"
	],
	answer: 0
},
{
	question: "Which of the following is a correct way to write an if statement in JavaScript?",
	options: ["if (x = 5) { ... }", "if x = 5 { ... }", "if [x == 5] { ... }", "if (x == 5) { ... }"],
	answer: 3
},
{
	question: "What does the addEventListener method do in JavaScript?",
	options: [
	"It adds a new property to an object",
	"It creates a new element in the HTML DOM",
	"It attaches an event handler function to an element",
	"It creates a new object"
	],
	answer: 2
}
];

$(document).ready(function () {
const startScreen = $("#start-screen");
const startButton = $("#start-button");
const quizContainer = $("#quiz");
const resultContainer = $("#result");
const submitButton = $("<button>").text("Submit").addClass("btn btn-primary mt-4");

// Add sound effect variables
const correctSound = new Audio("sfx/correct.wav");
const incorrectSound = new Audio("sfx/incorrect.wav");

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
	const question = questions[currentQuestion];
	const questionElement = $("<h4>").text(question.question);
	const optionsContainer = $("<div>").addClass("mt-3");
  
	quizContainer.empty().append(questionElement, optionsContainer);
  
	question.options.forEach((option, index) => {
	  const optionElement = $("<div>").addClass("form-check mt-2");
	  const inputElement = $("<input>")
		.addClass("form-check-input")
		.attr("type", "radio")
		.attr("name", "option")
		.attr("id", "option" + index)
		.val(index);
	  const labelElement = $("<label>")
		.addClass("form-check-label")
		.attr("for", "option" + index)
		.text(option);
  
	  optionElement.append(inputElement, labelElement);
	  optionsContainer.append(optionElement);
	});
  
	optionsContainer.append(submitButton); // Append the submitButton to the optionsContainer
  }
  

  function displayResult() {
    quizContainer.hide();
    submitButton.hide();

    const playerName = playerNameInput.val();
    const scoreEntry = {
      name: playerName,
      score: score
    };

    // Get the existing high scores from local storage
    let highScores = localStorage.getItem("highScores");
    if (highScores) {
      highScores = JSON.parse(highScores);
    } else {
      highScores = [];
    }

    // Add the current score entry to the high scores
    highScores.push(scoreEntry);

    // Sort the high scores by score (descending order)
    highScores.sort((a, b) => b.score - a.score);

    // Truncate the high scores to keep only the top 5 scores
    highScores = highScores.slice(0, 5);

    // Store the updated high scores in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Display the high scores
    resultContainer.empty();
    resultContainer.append($("<h3>").text("High Scores"));
    const scoreTable = $("<table>").addClass("table table-striped");
    const tableHead = $("<thead>").append($("<tr>").append($("<th>").text("Rank"), $("<th>").text("Name"), $("<th>").text("Score")));
    const tableBody = $("<tbody>");

    for (let i = 0; i < highScores.length; i++) {
      const rank = i + 1;
      const name = highScores[i].name;
      const score = highScores[i].score;
      tableBody.append($("<tr>").append($("<td>").text(rank), $("<td>").text(name), $("<td>").text(score)));
    }

    scoreTable.append(tableHead, tableBody);
    resultContainer.append(scoreTable);
    resultContainer.show();
  }

function checkAnswer() {
	const selectedOption = $("input[name='option']:checked").val();
	const question = questions[currentQuestion];
  
	if (selectedOption == question.answer) {
	  score++;
	  // Play the correct answer sound effect
	  correctSound.play();
	} else {
	  // Play the incorrect answer sound effect
	  incorrectSound.play();
	}
  
	if (currentQuestion < questions.length - 1) {
	  currentQuestion++;
	  displayQuestion();
	} else {
	  displayResult();
	}
  }
  
  submitButton.click(checkAnswer);

  displayQuestion();

  startButton.click(function () {
    startScreen.hide();
    quizContainer.show();
    displayQuestion();
  });

  quizContainer.hide();
  resultContainer.hide();
});
