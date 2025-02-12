var q1 = {
    question: "Which city is the financial capital of India ?",
    choices: ["Bengaluru", "Mumbai", "Delhi", "Kolkata"],
    correctAnswer: "Mumbai"
};
var q2 = {
    question: "What is the national animal of India?",
    choices: ["Elephant", "Tiger", "Peacock", "Lion"],
    correctAnswer: "Tiger"
};
var q3 = {
    question: "Which is the longest river in India?",
    choices: ["Ganga", "Yamuna", "Brahmaputra", "Godavari"],
    correctAnswer: "Ganga"
};
var q4 = {
    question: "Who was the first Prime Minister of India?",
    choices: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. B.R. Ambedkar"],
    correctAnswer: "Jawaharlal Nehru"
};
var q5 = {
    question: "Which Indian state is known as the 'Land of Five Rivers'?",
    choices: ["Punjab", "Haryana", "Rajasthan", "Uttar Pradesh"],
    correctAnswer: "Punjab"
};
var questions = [q1, q2, q3, q4, q5];
var Quiz = /** @class */ (function () {
    function Quiz(questions) {
        this.questions = [];
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }
    ;
    Quiz.prototype.getCurrentQuestion = function () {
        return this.questions[this.currentQuestionIndex];
    };
    ;
    Quiz.prototype.checkAnswer = function (selectedAnswer) {
        var currentQuestion = this.getCurrentQuestion();
        if (selectedAnswer === currentQuestion.correctAnswer) {
            this.score++;
            return true;
        }
        return false;
    };
    Quiz.prototype.isNextQuestion = function () {
        return this.currentQuestionIndex < (this.questions.length - 1);
    };
    Quiz.prototype.nextQuestion = function () {
        if (this.isNextQuestion()) {
            this.currentQuestionIndex++;
        }
    };
    Quiz.prototype.isQuizOver = function () {
        return this.currentQuestionIndex >= (this.questions.length - 1);
    };
    Quiz.prototype.getFinalScore = function () {
        return this.score;
    };
    return Quiz;
}());
var quiz1 = new Quiz(questions);
var questionDisplayArea = document.getElementById("question");
var answerButtonsContainer = document.getElementById("answer-buttons");
var nextBtn = document.getElementById("next-btn");
var scoreDisplay = document.getElementById("score-display");
document.addEventListener("DOMContentLoaded", function () {
    nextBtn.style.display = "none";
    displayQuestion();
});
var displayQuestion = function () {
    var currQue = quiz1.getCurrentQuestion();
    questionDisplayArea.innerText = "".concat(currQue.question);
    answerButtonsContainer.innerHTML = "";
    currQue.choices.forEach(function (element, index) {
        var button = document.createElement("button");
        button.id = "btn-".concat(index);
        button.className = "btn btn-secondary mt-3";
        button.innerHTML = element;
        button.addEventListener("click", function () { return checkAnswer(element, button); });
        answerButtonsContainer.appendChild(button);
    });
};
var checkAnswer = function (selectedAnswer, button) {
    var currentQuestion = quiz1.getCurrentQuestion();
    if (selectedAnswer === currentQuestion.correctAnswer) {
        button.classList.add("btn-success");
        quiz1.score++;
    }
    else {
        button.classList.add("btn-danger");
    }
    document.querySelectorAll("#answer-buttons button").forEach(function (btn) {
        btn.disabled = true;
    });
    nextBtn.style.display = "block";
};
nextBtn.addEventListener("click", function () {
    if (quiz1.isNextQuestion()) {
        quiz1.nextQuestion();
        nextBtn.style.display = "none";
        document.querySelectorAll("#answer-buttons button").forEach(function (btn) {
            btn.classList.remove("btn-success", "btn-danger");
            btn.disabled = false;
        });
        displayQuestion();
    }
    else {
        questionDisplayArea.innerText = "Quiz Over! \n Your final score is ".concat(quiz1.getFinalScore(), "/").concat(questions.length);
        answerButtonsContainer.innerHTML = "";
        nextBtn.style.display = "none";
        var restartBtn = document.createElement("button");
        restartBtn.id = "restart-btn";
        restartBtn.className = "btn btn-primary mt-3";
        restartBtn.innerText = "Restart Quiz";
        restartBtn.addEventListener("click", restartQuiz);
        answerButtonsContainer.appendChild(restartBtn);
    }
});
var restartQuiz = function () {
    quiz1.currentQuestionIndex = 0;
    quiz1.score = 0;
    nextBtn.style.display = "none";
    displayQuestion();
};
