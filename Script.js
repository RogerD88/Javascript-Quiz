let startbutton = document.getElementById("start-quiz")
let time = document.getElementById("time")
let answer = document.getElementById("answer")
let quizStart = document.querySelector(".quiz-start");
let options = document.querySelectorAll("ol li");
let finalSCore = document.getElementById("final-score");
let allDone = document.querySelector(".all-done");
let quizWraper = document.querySelector(".quiz-wrapper");
let highScores = document.getElementById("highscores")
let highScoresList = document.getElementById("highscores-list");
let initialsForm = document.querySelector("#initials-form");
let gobackBtn = document.getElementById("goback");
let clearBtn = document.getElementById("clear");
let scoresArray = JSON.parse(localStorage.getItem("scoresArray")) || [];
let correctAnswer = document.createElement("p")

let totaltime = 75
let timerid;
let score = 0;
let currentQuestion = 0;
let questions = [
    {
        question: "Commonly used data type DO NOT include",
        a: "Strings",
        b: "Booleans",
        c: "Alerts",
        d: "Numbers",
        answer: "Alerts"
    },
    {
        question: "The condition in a if/else statement is enclosed with",
        a: "quotes",
        b: "parenthesis",
        c: "curly brackets",
        d: "square brackets",
        answer: ""
    },
    {
        question: "Arrays in Javascript Can be used to store",
        a: "objects",
        b: "booleans",
        c: "other arrays",
        d: "All of the above",
        answer: "All of the above"
    }
]
function displytimer() {
         timerid = setInterval(() => {
        totaltime--
        time.textContent = totaltime;

        if (totaltime === 0) {
            clearInterval(timerid)
        }
    }, 1000)
}

function displyquestions(questionNumber) {

    quizWraper.innerHTML = "";

    if (questionNumber >= questions.length) {
        finalSCore.textContent = score;
        allDone.style.display = "block";
        clearInterval(timerid)
        time.textContent = 0;
    } else {
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        let ol = document.createElement("ol");
        let firstLi = document.createElement("li");
        let secondLi = document.createElement("li");
        let thirdLi = document.createElement("li");
        let fourthLi = document.createElement("li");
        correctAnswer.id = "answer";
        h2.textContent = questions[questionNumber].question;
        firstLi.textContent = questions[questionNumber].a;
        secondLi.textContent = questions[questionNumber].b
        thirdLi.textContent = questions[questionNumber].c
        fourthLi.textContent = questions[questionNumber].d
        ol.appendChild(firstLi)
        ol.appendChild(secondLi)
        ol.appendChild(thirdLi)
        ol.appendChild(fourthLi)
        div.appendChild(h2)
        div.appendChild(ol)
        div.classList.add("questions");
        let hr = document.createElement("hr");
        div.appendChild(hr)
        div.appendChild(correctAnswer)
        firstLi.addEventListener("click", checkAnswer)
        secondLi.addEventListener("click", checkAnswer)
        thirdLi.addEventListener("click", checkAnswer)
        fourthLi.addEventListener("click", checkAnswer)
        quizWraper.appendChild(div);
    }
}

function checkAnswer(e) {
    if (e.target.textContent === questions[currentQuestion].answer) {
        score += 10;
        correctAnswer.textContent = "Correct!"

    } else {
        correctAnswer.textContent = "Wrong!"
    }

    currentQuestion++
    displyquestions(currentQuestion)
}

startbutton.addEventListener("click", function (e) {
    quizStart.style.display = "none";
    quizWraper.style.display = "block";
    displytimer();
    displyquestions(currentQuestion)
})

initialsForm.addEventListener("submit", function(e){
    e.preventDefault();
    let initalsValue = document.querySelector("#initials").value;
    scoresArray.push(initalsValue);
    localStorage.setItem("scoresArray", JSON.stringify(scoresArray))
})
highScores.addEventListener("click", viewHighScores)

function viewHighScores() {
    allDone.style.display = "none";
    quizWraper.style.display = "none"
    quizStart.style.display = "none"
    document.querySelector(".highscores").style.display ="block";
    highScoresList.innerHTML = ""
    for(let i = 0;i < scoresArray.length;i++) {
        let li = document.createElement("li");
        li.textContent = scoresArray[i];
        highScoresList.appendChild(li)
    }
}

function resetGame(){
    quizStart.style.display = "block"
    document.querySelector(".highscores").style.display ="none";
}

gobackBtn.addEventListener("click", function() {
    resetGame();
})

clearBtn.addEventListener("click", function(){
    localStorage.clear();
    window.location.reload();
})