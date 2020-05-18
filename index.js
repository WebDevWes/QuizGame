//Creating variable for related item from HTML
var startButton = document.querySelector("#startButton");
var gameOver = document.querySelector("#gameOver");
var endGameScore = document.querySelector("#endGameScore");
var initialInput = document.querySelector("#initials");
var initialValue = document.querySelector("#input");
var submit = document.querySelector("#submitScores");
var scoreHistory = document.querySelector("#scoreHistory");
var highScores = document.querySelector("#highScores");
var scoreButton = document.querySelector("#scoreButton")
var questionBox = document.querySelector("#question");
var answer0 = document.querySelector("#answer0");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var realAnswer = document.querySelector("#realAnswer");
var choice = document.querySelectorAll(".choice");
var timer = document.querySelector("#timer");
var timeContainer = document.querySelector(".timer");
var score = document.querySelector("#score");
var scoreContainer = document.querySelector(".score");
var counter = 0;
var timeRemaining = 10;

//Provided Questions in object format
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

//Score + game over screen removed upon timer hitting 0
score.textContent = 0;
//console.log(score.textContent);
var timerID

//Score button brings up score container
scoreButton.addEventListener("click", function () {
    if (scoreHistory.classList == "hidden") {
        scoreHistory.classList.remove("hidden");
    } else {
        scoreHistory.classList.add("hidden");
    }
})


//Create list item for scores and append to unordered list
var localScores = JSON.parse(localStorage.getItem(localStorage))
var scoreInitial = localStorage.Initial
var scoreTime = localStorage.timeRemaining
var node = document.createElement("li");
var textNode = document.createTextNode("Initial-"+scoreInitial+" Time- "+scoreTime);
node.appendChild(textNode);
highScores.appendChild(node);


//Funtion to start timer
function startTimer() {
    timer.textContent = timeRemaining;
    timerID = setInterval(function () {
        timeRemaining--;
        timer.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            gameOver.classList.remove("hidden");
            clearInterval(timerID);
            timeRemaining = 0;
            timer.textContent = timeRemaining;
        }
    }, 1000);
};

startButton.addEventListener("click", function () {
    this.setAttribute("class", "hidden");
    timeContainer.classList.remove("hidden");
    scoreContainer.classList.remove("hidden");
    startTimer();
    currentQuestion();
});

//previous failed attempt
// if (parseInt(score.innerHTML) === 5) {
//     gameOver.classList.remove("hidden") // can't get this to work

// }

// //Selecting question
for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener("click", function correct() {
        choice[i].classList.add("click")
        setTimeout(function () {
            choice[i].classList.remove("click")
        }, 100)
        if (choice[i].getAttribute("data-value") === questions[counter].answer) {
            counter++
            timeRemaining += 2;
            score.textContent = counter;
            if (counter >= questions.length) {
                endGameScore.classList.remove("hidden");
                initialInput.classList.remove("hidden");
                clearInterval(timerID);
                timer.textContent = timeRemaining;
                endGameScore.textContent = "Your Score = " + score.textContent + "\n" + "Time Remaining is " + timer.textContent;
                // localStorage.setItem("score", JSON.stringify(score.textContent));
                // localStorage.setItem("timeRemaining", JSON.stringify(timer.textContent));
            }
            else {
                currentQuestion()
            }
        } else {
            timeRemaining -= 5;
        }
    })
}

//When Submit button is clicked - save scores
submit.addEventListener("click", function () {
    localStorage.setItem("Initial", JSON.stringify(initialValue.value));
    localStorage.setItem("timeRemaining", JSON.stringify(timer.textContent));
    // console.log(timer.textContent);
    // console.log(initialValue.value);
})


//Display Questions
function currentQuestion() {

    questionBox.textContent = questions[counter].title;
    answer0.textContent = questions[counter].choices[0];
    answer0.setAttribute("data-value", questions[counter].choices[0]);
    answer1.textContent = questions[counter].choices[1];
    answer1.setAttribute("data-value", questions[counter].choices[1]);
    answer2.textContent = questions[counter].choices[2];
    answer2.setAttribute("data-value", questions[counter].choices[2]);
    answer3.textContent = questions[counter].choices[3];
    answer3.setAttribute("data-value", questions[counter].choices[3]);
    realAnswer.textContent = questions[counter].answer;

    // if(parseInt(counter) > 5) {
    //     gameOver.classList.remove("hidden");
    // }


};


// looking to put this into a function because this is repetitive

// function question0() {
//     document.querySelector("#question").textContent = questions[0].title;
//     document.querySelector("#answer0").textContent = questions[0].choices[0];
//     document.querySelector("#answer1").textContent = questions[0].choices[1];
//     document.querySelector("#answer2").textContent = questions[0].choices[2];
//     document.querySelector("#answer3").textContent = questions[0].choices[3];
//     document.querySelector("#realAnswer").textContent = questions[0].answer;
// }
// function question1() {
//     document.querySelector("#question").textContent = questions[1].title;
//     document.querySelector("#answer0").textContent = questions[1].choices[0];
//     document.querySelector("#answer1").textContent = questions[1].choices[1];
//     document.querySelector("#answer2").textContent = questions[1].choices[2];
//     document.querySelector("#answer3").textContent = questions[1].choices[3];
//     document.querySelector("#realAnswer").textContent = questions[1].answer;
// }
// function question2() {
//     document.querySelector("#question").textContent = questions[2].title;
//     document.querySelector("#answer0").textContent = questions[2].choices[0];
//     document.querySelector("#answer1").textContent = questions[2].choices[1];
//     document.querySelector("#answer2").textContent = questions[2].choices[2];
//     document.querySelector("#answer3").textContent = questions[2].choices[3];
//     document.querySelector("#realAnswer").textContent = questions[2].answer;
// }
// function question3() {
//     document.querySelector("#question").textContent = questions[3].title;
//     document.querySelector("#answer0").textContent = questions[3].choices[0];
//     document.querySelector("#answer1").textContent = questions[3].choices[1];
//     document.querySelector("#answer2").textContent = questions[3].choices[2];
//     document.querySelector("#answer3").textContent = questions[3].choices[3];
//     document.querySelector("#realAnswer").textContent = questions[3].answer;
// }
// function question4() {
//     document.querySelector("#question").textContent = questions[4].title;
//     document.querySelector("#answer0").textContent = questions[4].choices[0];
//     document.querySelector("#answer1").textContent = questions[4].choices[1];
//     document.querySelector("#answer2").textContent = questions[4].choices[2];
//     document.querySelector("#answer3").textContent = questions[4].choices[3];
//     document.querySelector("#realAnswer").textContent = questions[4].answer;
// }







// execute up to down





/// variables === global scope or the scope insdie of funcition


// function is never executed if you don't call it 

// any other code is excuted onece in the moment javascript read it 