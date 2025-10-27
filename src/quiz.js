const prompt = require('prompt-sync')({sigint: true});

const quizOptions = [
    {
    question : "What is 2+2",
    choices: ['4', '22', '0', '40'],
    answerIndex : 0,
    },
    {
    question : "What is 5*6",
    choices: ['3', '56', '30', '11'],
    answerIndex : 2,
    },
];

let topFivePlayers = [
    // {
    //     name, 
    //     score, 
    //     date,
    // }
];
const viewQuiz = () =>{
    let answeredCorrect = 0;
    for(let i = 0; i < quizOptions.length; i++){
        const quizChoices = quizOptions[i].choices;

        console.log(`Question ${i + 1}: ${quizOptions[i].question}?`)
        quizChoices.forEach((answer, index) => {
        console.log(`${index + 1}) ${answer}`);
        });
        const answerChoice = prompt(`Enter your answer: (1 - ${quizChoices.length})`);
        const indexChoice = Number(answerChoice) -1;

        if(checkAnswers(indexChoice, i)){
            answeredCorrect++;
            console.log('Correct! Well done!');
        } else{
            console.log('Incorrect :(');
        }
        const currentScore = Math.floor(answeredCorrect/quizOptions.length * 100);
        console.log(`Current Score: ${answeredCorrect}/${quizOptions.length} (%${currentScore})\n`);
    }
    const finalScore = Math.floor(score/quizOptions.length * 100);
    console.log(`Quiz Complete!`);
    console.log(`Final Score: ${score}/${quizOptions.length} (%${finalScore})`);
    console.log('Thanks for playing!');
    if(isTopFive(finalScore)){
        console.log('Congratulations! You scored a high score!');
        const playerName = prompt('Enter your name: ');
        addTopFive(playerName, finalScore);
    }

};

const checkAnswers = (index, currentQuestion) =>{
    return index === quizOptions[currentQuestion].answerIndex;
};

// displayQuizOptions();

const addTopFive = (name, score) =>{
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const scoreDate = `${month}/${day}/${year}`;
    topFivePlayers.push({name, score, date: scoreDate});

    // sort the array of players
    topFivePlayers.sort((a, b) => a.score - b.score);

    topFivePlayers = topFivePlayers.slice(0, 5);

};

const isTopFive = (score) => {
    if(topFivePlayers.length < 5 && score ){
        return true;
    }
    const n = topFivePlayers.length - 1;
    const lastPlaceScore = topFivePlayers[n].score;
    return score > lastPlaceScore;
};

const viewTopFive = () => {
    if(topFivePlayers.length === 0){
        console.log('No players to see yet!');
    }
    topFivePlayers.forEach((player, place) =>{
        console.log(`${place + 1}. ${player.score} (${player.name}) - ${player.date}`);
    });
};
module.exports = {viewQuiz, viewTopFive};