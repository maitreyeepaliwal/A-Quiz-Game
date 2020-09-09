const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progresstext = document.getElementById('progresstext');
const scoretext = document.getElementById('score');
const progressbarfull= document.getElementById("progressbarfull");

let currentquestion = {};
let acceptingAnswers = false;
let score = 0;
let counter = 0;
let availablequestions =[];


let questions = [
    {
        question: "The Sangai Festival is celebrated in __:",
        choice1: "Assam",
        choice2: "Manipur",
        choice3: "Mizoram",
        choice4: "Nagland",
        
        answer: 2
    },

    {
        question: "Rabindranath Tagore's 'Jana Gana Mana' has been adopted as India's National Anthem. How many stanzas of the said song were adopted?",
        choice1: "Third and fourth stanza",
        choice2: "The whole song",
        choice3: "First and second stanza",
        choice4: "Only the first stanza",
        
        answer: 4
    },

    {
        question: "Where did British first open their factories in Eastern part of India?",
        choice1: "Assam",
        choice2: "Orissa",
        choice3: "Bihar",
        choice4: "Sikkim",
        
        answer: 2
    },

    {
        question: "Which of the following is correct?",
        choice1: "The First War of Independence : 1857",
        choice2: "The Champaran Satygrah : 1917",
        choice3: "The Quit India Movement  : 1942",
        choice4: "All the above",
        
        answer: 4
    },

    {
        question: "The word ‘Hindu” as reference to the people of Hind (India) was first used by_______",
        choice1: "the Greeks",
        choice2: "the Romans",
        choice3: "the Chinese",
        choice4: "the Arabs",
        
        answer: 4
    },

    {
        question: "Abdul Kalam Azad became the ____ President of India.",
        choice1: "9th",
        choice2: "10th",
        choice3: "11th",
        choice4: "12th",
        
        answer: 3
    },

    {
        question: "The first general elections under the Indian Constitution were held in ________.",
        choice1: "1952",
        choice2: "1957",
        choice3: "1948",
        choice4: "1950",
        
        answer: 1
    },

    {
        question: "Which Indian king did the ancient Greeks refer to as Sandrocottas?",
        choice1: "Ashoka",
        choice2: "Porus",
        choice3: "Chandragupta Maurya",
        choice4: "Alexander",
        
        answer: 3
    },

    {
        question: "During the colonial rule in India, the Permanent Settlement was introduced by?",
        choice1: "Lord Bentick",
        choice2: "Lord Cornwallis",
        choice3: "Lord Curzon",
        choice4: "Lord Wellesely",
        
        answer: 2
    },

    {
        question: "The ratio of width of our National flag to its length is _____",
        choice1: "3:5",
        choice2: "2:3",
        choice3: "2:4",
        choice4: "3:4",
        
        answer: 2
    },

    {
        question: "Who was the first female to become the governor of an Indian state?",
        choice1: "Subba Lakshmi",
        choice2: "Padmaja Naidu",
        choice3: " Sarojini Naidu",
        choice4: "Vijaya Lakshmi Pandit",
        
        answer: 3
    }
];

const correct_bonus = 10;
const max_questions = 5
 
startgame = () => {

    counter = 0;
    score = 0;
    availablequestions = [...questions];
    getnew();
};

getnew = () => {
    if (availablequestions.length === 0 || counter >= max_questions) {
        localStorage.setItem('mostrecentscore', score);
        return window.location.assign("end.html");
      }

    counter++;
    
    progresstext.innerText = 'Question ' + counter + '/' + max_questions;
    const x = (counter/max_questions)*100;
    progressbarfull.style.width = x + "%";

    const questionindex = Math.floor(Math.random() * availablequestions.length);
    currentquestion = availablequestions[questionindex];
    question.innerText = currentquestion.question;
    

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentquestion["choice" + number];
    });

    availablequestions.splice(questionindex,1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e=> {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedchoice = e.target;
        const selectedanswer = selectedchoice.dataset['number'];
        
        const classtoapply  = selectedanswer == currentquestion.answer ? 'correct' : 'incorrect' ;

        if(classtoapply === 'correct')
        {
            incrementscore(correct_bonus);
        }

        selectedchoice.parentElement.classList.add(classtoapply);

        setTimeout(() => {
            selectedchoice.parentElement.classList.remove(classtoapply);
            getnew();
        }, 1000);
    });
});

incrementscore = num => {
    score += num;
    scoretext.innerText = score;
};

startgame();
