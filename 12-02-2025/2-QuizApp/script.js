"use strict";
const q1 = {
    question: "Which city is the financial capital of India ?",
    choices: ["Bengaluru", "Mumbai", "Delhi", "Kolkata"],
    correctAnswer: "Mumbai"
};
const q2 = {
    question: "What is the national animal of India?",
    choices: ["Elephant", "Tiger", "Peacock", "Lion"],
    correctAnswer: "Tiger"
};
const q3 = {
    question: "Which is the longest river in India?",
    choices: ["Ganga", "Yamuna", "Brahmaputra", "Godavari"],
    correctAnswer: "Ganga"
};
const q4 = {
    question: "Who was the first Prime Minister of India?",
    choices: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. B.R. Ambedkar"],
    correctAnswer: "Jawaharlal Nehru"
};
const q5 = {
    question: "Which Indian state is known as the 'Land of Five Rivers'?",
    choices: ["Punjab", "Haryana", "Rajasthan", "Uttar Pradesh"],
    correctAnswer: "Punjab"
};
const questions = [q1, q2, q3, q4, q5];
class Quiz {
    constructor(questions) {
        this.questions = [];
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }
    ;
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    ;
    checkAnswer(selectedAnswer) {
        const currentQuestion = this.getCurrentQuestion();
        if (selectedAnswer === currentQuestion.correctAnswer) {
            this.score++;
            return true;
        }
        return false;
    }
    isNextQuestion() {
        return this.currentQuestionIndex < (this.questions.length - 1);
    }
    nextQuestion() {
        if (this.isNextQuestion()) {
            this.currentQuestionIndex++;
        }
    }
    isQuizOver() {
        return this.currentQuestionIndex >= (this.questions.length - 1);
    }
    getFinalScore() {
        return this.score;
    }
}
const quiz1 = new Quiz(questions);
const questionDisplayArea = document.getElementById("question");
const answerButtonsContainer = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");
document.addEventListener("DOMContentLoaded", () => {
    nextBtn.style.display = "none";
    displayQuestion();
});
const displayQuestion = () => {
    let currQue = quiz1.getCurrentQuestion();
    questionDisplayArea.innerText = `${currQue.question}`;
    answerButtonsContainer.innerHTML = "";
    currQue.choices.forEach((element, index) => {
        const button = document.createElement("button");
        button.id = `btn-${index}`;
        button.className = "btn btn-secondary mt-3";
        button.innerHTML = element;
        button.addEventListener("click", () => checkAnswer(element, button));
        answerButtonsContainer.appendChild(button);
    });
};
const checkAnswer = (selectedAnswer, button) => {
    const currentQuestion = quiz1.getCurrentQuestion();
    if (selectedAnswer === currentQuestion.correctAnswer) {
        button.classList.add("btn-success");
        quiz1.score++;
    }
    else {
        button.classList.add("btn-danger");
    }
    document.querySelectorAll("#answer-buttons button").forEach((btn) => {
        btn.disabled = true;
    });
    nextBtn.style.display = "block";
};
nextBtn.addEventListener("click", () => {
    if (quiz1.isNextQuestion()) {
        quiz1.nextQuestion();
        nextBtn.style.display = "none";
        document.querySelectorAll("#answer-buttons button").forEach((btn) => {
            btn.classList.remove("btn-success", "btn-danger");
            btn.disabled = false;
        });
        displayQuestion();
    }
    else {
        questionDisplayArea.innerText = `Quiz Over! \n Your final score is ${quiz1.getFinalScore()}/${questions.length}`;
        answerButtonsContainer.innerHTML = "";
        nextBtn.style.display = "none";
        const restartBtn = document.createElement("button");
        restartBtn.id = "restart-btn";
        restartBtn.className = "btn btn-primary mt-3";
        restartBtn.innerText = "Restart Quiz";
        restartBtn.addEventListener("click", restartQuiz);
        answerButtonsContainer.appendChild(restartBtn);
    }
});
const restartQuiz = () => {
    quiz1.currentQuestionIndex = 0;
    quiz1.score = 0;
    nextBtn.style.display = "none";
    displayQuestion();
};
