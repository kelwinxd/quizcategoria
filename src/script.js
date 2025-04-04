const questions = [
    { question: "Mortal Kombat 1992 foi lançado para qual plataforma?", answers: ["Arcade", "SNES", "PlayStation", "PC"], correct: "Arcade", img: "./imgs/mk92.gif" },
    { question: "The Witcher 3 se encaixa em qual das descrições de genêros:", answers: ["Narrativa aberta com escolhas e consequências", "RPG com narrativa Linear", "Narrativa linear com escolhas e consequências", "Aventura com narrativa aberta"], correct: "Narrativa aberta com escolhas e consequências", img: "./imgs/thewitcher.gif" },
    { question: "Quantos lados tem um triângulo?", answers: ["2", "3", "4", "5"], correct: "3", img: "./imgs/triangulo.gif" }
];

//ae poha vamo ve se agora dá certo

const quizContainer = document.getElementById("quiz-container")
const btnInitiate = document.querySelector(".telainicial button")
const beginScreen = document.querySelector(".telainicial")
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const attackButton = document.getElementById("attack-button");
const nextButton = document.getElementById("next-button");
const scoreText = document.getElementById("score-text");
const imgQuestion = document.getElementById("imgQ");
const mage = document.getElementById("mage");
const power = document.getElementById("power")
const enemy = document.getElementById("enemy")

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

btnInitiate.addEventListener("click", () => {
        quizContainer.style.display = 'block'
        beginScreen.style.display = 'none'

})


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.innerText = "";
    attackButton.disabled = true;
    nextButton.style.display = "none";
    nextButton.innerText = "Próxima";
    nextButton.onclick = nextQuestion;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    imgQuestion.src = currentQuestion.img;
    document.querySelector("#numbQ").innerHTML = `Questão <span>${currentQuestionIndex + 1}</span>`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer, currentQuestion.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    attackButton.disabled = true;
    nextButton.style.display = "none";
    selectedAnswer = null;
}

function selectAnswer(button, selected, correct) {
    selectedAnswer = selected;
    attackButton.disabled = false;

    document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

attackButton.addEventListener("click", () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {
        button.disabled = true;
        if (button.innerText === currentQuestion.correct) {
            button.classList.add("correct");
        } else if (button.innerText === selectedAnswer) {
            button.classList.add("wrong");
        }
    });

    if (selectedAnswer === currentQuestion.correct) {
        score++;
        mage.src = "./imgs/mage02.gif";
     
        
       
         setTimeout(() => {
              power.style.display = 'block'
         }, 800);
        
         setTimeout(() => {
            enemy.src = './imgs/enemydeath2.gif'
         }, 2300);

         setTimeout(() => {
            enemy.style.opacity = '0'
            enemy.classList.remove("enter")
         }, 3000);

        setTimeout(() => {
            mage.src = "./imgs/mage01.gif";
        }, 2100);
        setTimeout(() => {
           power.style.display = 'none'
        }, 2100);

        setTimeout(() => {
            enemy.src = "./imgs/enemy01.gif"
            enemy.classList.add("enter")
        }, 3900);
    } else {
        enemy.src = "./imgs/enemyat.gif"; 
        setTimeout(() => {
            mage.src = './imgs/magedamage.gif'
        }, 500)

        const originalTransform =`${enemy.style.transform } scaleX(-1)` 

      
        const mageRect = mage.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();
        
  
        const distance = (mageRect.left - enemyRect.left) + 100;
        
      
        enemy.style.transition = "transform 0.5s ease-in-out";
        enemy.style.transform = `translateX(${distance}px) scaleX(-1)`;
        
        setTimeout(() => {
            enemy.src = "./imgs/enemy01.gif";
            mage.src = "./imgs/mage01.gif"
            
            // Voltando ao estado original
            enemy.style.transform = `${originalTransform}`;
        }, 2300);
    }
    setTimeout(() => {
        nextButton.style.display = "block";
    }, 3500);
 
    attackButton.disabled = true;
});



function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}



function showScore() {
    resetState();
   
    document.querySelector("#numbQ").innerText = `Fim do Quiz`
    questionText.innerText = ` ${score} / ${questions.length}`;

    scoreText.innerHTML = `Você eliminou <span class='dest'> ${score} caveiras malignas </span> com seu conhecimento!`
    
    nextButton.style.display = "block";
    nextButton.innerText = "Reiniciar";
    nextButton.onclick = startQuiz;
}

startQuiz();
