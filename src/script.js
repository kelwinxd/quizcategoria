const questions = [
    {
        question: "A franquia Mortal Kombat pertence a qual gênero?",
        answers: ["Ação", "Estratégia", "RPG", "Luta"],
        correct: "Luta", img: './imgs/mkk.jpeg'
    },
    {
        question: "O jogo Candy Crush pertence a qual classificação por plataformas?",
        answers: ["Consoles", "Móvel", "PC", "Híbrido"],
        correct: "Híbrido", img: './imgs/candy.jpg'
    },
    {
        question: "O jogo Guilty Gear -Strive- pertence a qual estilo visual?",
        answers: ["2D", "Estilizado", "3D", "Realista"],
        correct: "Estilizado", img: './imgs/img03.gif'
    },
    {
        question: "Qual destas classificações melhor se enquadra ao jogo da imagem?",
        answers: ["Luta", "MMO", "Jogos para PC", "Battle Royale"],
        correct: "Battle Royale", img: './imgs/img04.jpeg'
    },
    {
        question: "Aponte qual jogo se enquadra como experiência imersiva e interatividade",
        answers: ["Detroit: Become Human", "The Witcher 3", "Half-Life: Alyx", "Dark Souls"],
        correct: "Half-Life: Alyx", img: './imgs/img05.jpeg'
    },
    {
        question: "Aponte qual dos seguintes jogos é de apenas um jogador.",
        answers: ["Dark Souls", "Devil May Cry 3", "Super Mario Galaxy", "Final Fantasy 9"],
        correct: "Devil May Cry 3", img: './imgs/img06.jpeg'
    },
    {
        question: "Qual destes jogos é um exemplo de jogo de corrida arcade?",
        answers: ["Need for Speed", "Gran Turismo", "Mario Kart", "Forza Horizon"],
        correct: "Mario Kart", img: './imgs/img07.jpeg'
    },
    {
        question: "Qual dos seguintes jogos é um exemplo de estratégia em tempo real (RTS)?",
        answers: ["Warcraft 3", "Civilization", "Final Fantasy", "Diablo"],
        correct: "Warcraft 3", img: './imgs/img08.jpeg'
    },
    {
        question: "Qual abordagem narrativa se adapta às escolhas do jogador, influenciando o desenrolar da história?",
        answers: ["Narrativa aberta", "Linear", "Escolhas e consequências", "Sem história clara"],
        correct: "Escolhas e consequências", img: './imgs/img09.jpeg'
    }
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
//const imgQuestion = document.getElementById("imgQ");
const mage = document.getElementById("mage");
const power = document.getElementById("power")
const enemy = document.getElementById("enemy")
const imgWrapper = document.getElementById("imgQ-wrapper");
const imgQuestion = document.getElementById("imgQ");


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
    if (currentQuestion.img) {
        imgQuestion.src = currentQuestion.img;
        imgWrapper.style.display = 'flex';
        imgQuestion.classList.add("appear");
    
        setTimeout(() => {
            imgWrapper.style.display = 'none';
            imgQuestion.classList.remove("appear");
        }, 2500); // mesmo tempo da animação
    }
    
    /*
    imgQuestion.src = currentQuestion.img;
    imgQuestion.style.display = 'block'*/
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
