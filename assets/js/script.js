//Questions

let myQuestions = [{
        question: "What was the name of Uncle Vernon's company?",

        answer1: 'Drills n Things',
        answer2: 'Dursley\'s Drills',
        answer3: 'Grunnings',
        answer4: 'Masons',
        correctAnswer: 3
    },

    {
        question: "Who was headmaster of Hogwarts when Tom Riddle attended?",

        answer1: 'Albus Dumbledore',
        answer2: 'Armando Dippet',
        answer3: 'Dilys Derwent',
        answer4: 'Phineas Nigellus Black',
        correctAnswer: 2
    },

    {
        question: "How many Horcruxes did Lord Voldemort intend to make?",

        answer1: '5',
        answer2: '6',
        answer3: '7',
        answer4: '8',
        correctAnswer: 2
    },

    {
        question: "What was Lord Voldemort's first Horcrux?",

        answer1: 'Marvolo Gaunt\'s ring',
        answer2: 'Helga Hufflepuff\'s cup',
        answer3: 'Tom Riddle\'s diary',
        answer4: 'Nagini',
        correctAnswer: 3
    },

    {
        question: "Who revealed the existence of Dumbledore\'s Army to Dolores Umbridge?",

        answer1: 'Marietta Edgecomb',
        answer2: 'Cho Chang',
        answer3: 'Michael Corner',
        answer4: 'Terry Boot',
        correctAnswer: 1
    },

    {
        question: "What does Harry do with the Elder Wand at the end of Deathly Hallows?",
        answer1: 'He throws it away',
        answer2: 'He breaks it in half',
        answer3: 'He hides it behind Dumbledore\'s portrait',
        answer4: 'He keeps it to use himself',
        correctAnswer: 3
    },

    {
        question: "Who was the announcer at the Quidditch World Cup?",

        answer1: 'Barty Crouch Sr',
        answer2: 'Cornelius Fudge',
        answer3: 'Rufus Scrimgeour',
        answer4: 'Ludo Bagman',
        correctAnswer: 4
    },

    {
        question: "How did Romilda Vane first try to give Harry a love potion?",

        answer1: 'She spiked his evening pumpkin juice',
        answer2: 'She gave him a box of spiked chocolate cauldrons',
        answer3: 'She offered him spiked gillywater',
        answer4: 'She spiked a chocolate frog and sent it to him',
        correctAnswer: 3
    },

    {
        question: "Who was the Professor of Muggle Studies?",

        answer1: 'Charity Burbage',
        answer2: 'Dolores Umbridge',
        answer3: 'Rolanda Hooch',
        answer4: 'Aurora Sinistra',
        correctAnswer: 1
    },

    {
        question: "Which member of the Peverell family is Harry descended from?",

        answer1: 'Antioch Peverell',
        answer2: 'Cadmus Peverell',
        answer3: 'Ignotus Peverell',
        answer4: 'Percival Peverell',
        correctAnswer: 3
    },
];

//Variables//

const welcomeArea = document.getElementById("welcome-area");
const startButton = document.getElementById("start-button");
const quizArea = document.getElementById("quiz-area");
const resultArea = document.getElementById("result-area");
let question = document.getElementById("quiz-question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const playAgain = document.getElementById("play-again");
let scoreText = document.getElementById("score");
let questionCounterText = document.getElementById("question-counter");
let showResult = document.getElementById("show-result");
let mostRecentScore = "";
const finalScore = document.getElementById("show-score");

//Code from Build a Quiz App with HTML, CSS, and JavaScript Udemy video by James Quick
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const correctBonus = 1;
const maxQuestions = 10;

//Get buttons and add event listeners
startButton.addEventListener("click", function firstQuestion() {
    welcomeArea.style.display = "none";
    quizArea.style.display = "flex";
    resultArea.style.display = "none";
    score = 0;
});

playAgain.addEventListener("click", startQuiz); {
    welcomeArea.style.display = "flex";
    quizArea.style.display = "none";
    resultArea.style.display = "none";
}

//Functions
//Starts the quiz
//Code from Build a Quiz App with HTML, CSS, and JavaScript Udemy video by James Quick
function startQuiz() {
    welcomeArea.style.display = "flex";
    quizArea.style.display = "none";
    resultArea.style.display = "none";
    questionCounter = 0;
    score = 0;
    incrementScore(0);
    availableQuestions = [...myQuestions];
    generateRandomQuestion();
}

//Generates a random question and the corresponding 4 answers
//Code from Build a Quiz App with HTML, CSS, and JavaScript Udemy video by James Quick
function generateRandomQuestion() {

    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        mostRecentScore = localStorage.getItem('mostRecentScore');
        finalScore.innerHTML = (mostRecentScore);
        if (mostRecentScore >= 8) {
            showResult.innerHTML = "Outstanding";
        } else if (mostRecentScore >= 6) {
            showResult.innerHTML = "Exceeds Expectations";
        } else if (mostRecentScore >= 4) {
            showResult.innerHTML = "Acceptable";
        } else if (mostRecentScore >= 2) {
            showResult.innerHTML = "Pass";
        } else if (mostRecentScore >= 0) {
            showResult.innerHTML = "Troll";
        }
        quizArea.style.display = "none";
        return resultArea.style.display = "flex";   
        
        
    }

    questionCounter++;
    questionCounterText.innerHTML = questionCounter + '/' + maxQuestions;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    answers.forEach(answer => {
        const number = answer.dataset.number;
        answer.innerHTML = currentQuestion['answer' + number];
    });

    //Removes used question from array
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

// Checks if the user's answer is right or wrong
//Code from Build a Quiz App with HTML, CSS, and JavaScript Udemy video by James Quick

answers.forEach(answer => {
    answer.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        const classToApply = selectedAnswer == currentQuestion.correctAnswer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(correctBonus);
        }

        selectedChoice.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            generateRandomQuestion();
        }, 200);

    });
});

//Increases the user's score on a correct answer
//Code from Build a Quiz App with HTML, CSS, and JavaScript Udemy video by James Quick

function incrementScore(num) {
    score = score + num;
    scoreText.innerHTML = score;
    }

    
//Show's the user's final score

function showFinalScore() {
    //Code from Build a Quiz App with HTML, CSS, and JavaScript Udemy video by James Quick

    welcomeArea.style.display = "none";
    quizArea.style.display = "none";
    resultArea.style.display = "flex";
    startQuiz();
    
}


startQuiz();

showFinalScore();



