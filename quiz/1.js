const startscreen =document.getElementById("start-screen");
const quizscreen =document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("Start-btn");
const questionText = document.getElementById("question-txt");
const answersContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
let score=0;

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex=0;

let answerDisable=0;

totalQuestionsSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

startButton.addEventListener("click",startQuiz)
restartButton.addEventListener("click",restartQuiz)

function startQuiz(){
    currentQuestionIndex=0; 
     score=0;
    scoreSpan.textContent=score;

    startscreen.classList.remove("active-screen");
    quizscreen.classList.add("active-screen");

    showquestion();
    
}

function showquestion(){
  answerDisable=false;
  
  const currentQuestion= quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent=currentQuestionIndex+1;

    const progressPercent= (currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width=progressPercent+"%";

    questionText.textContent= currentQuestion.question;

    answersContainer.innerHTML="";

    currentQuestion.answers.forEach(answer=>{
      const button=document.createElement("button")
      button.textContent=answer.text;
      button.classList.add("answer-btn")

      button.dataset.correct=answer.correct;

      button.addEventListener("click",selectAnswer);

      answersContainer.appendChild(button);
    });
  

}

function selectAnswer(event){
  if(answerDisable) return

  answerDisable=true;
  const selectedButton = event.target;
  const isCorrect=selectedButton.dataset.correct==='true'
   Array.from(answersContainer.children).forEach(button=>{
    if(button.dataset.correct==="true"){
      button.classList.add("correct")
    }

else if(button===selectedButton){
  button.classList.add("incorrect")

}    
   });
   if(isCorrect){
    score++;
    scoreSpan.textContent=score;
   }
   setTimeout(()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex<quizQuestions.length){
      showquestion()
    }
    else{
      showResult()
    }
    },1000)

}

function showResult(){
  quizscreen.classList.remove("active-screen")
  resultScreen.classList.add("active-screen")

  finalScoreSpan.textContent=score;

  const percentage=(score/quizQuestions.length)*100;

  if(percentage==100){
    resultMessage.textContent="Good Effort";
  }
  else if(percentage>=80){
    resultMessage.textContent="Great Job";
  }
  else if(percentage>=60){
    resultMessage.textContent="not bad, try again";
  }
  else if(percentage>=40){
    resultMessage.textContent="not bad, try again";
  }
  
  else{
    resultMessage.textContent="keep Studing"

  }
}
function restartQuiz(){
  resultScreen.classList.remove("active-screen")

  startQuiz();
    
    
}

