const prompt = require('prompt-sync')({sigint: true});
const fs = require('fs');

// array of questions
const quizOptions = [
    {
        question : 'What is 2+2',
        choices: ['4', '22', '0', '40'],
        answerIndex : 0,
    },
    {
        question : 'What is 5*6',
        choices: ['3', '56', '30', '11'],
        answerIndex : 2,
    },
    {
        question: 'What is the square root of 81',
        choices: ['3', '9', '6'],
        answerIndex: 1
    },
    {
        question: 'How many sides does a square have',
        choices: ['2', '1', '3', '4'],
        answerIndex: 3
    }, 
    {
        question: 'What is the capital of Guatemala',
        choices: ['Jutiapa', 'El Progreso', 'Guatemala City', 'Honduras'],
        answerIndex : 2
    },
];

// create array to hold the top 5 players and push them into topFivePlayers array
const topFivePlayers = [
    // {
    //     name, 
    //     score, 
    //     date,
    // }
];

// load the top five players from the JSON file
const loadDataFromJSON = () =>{
    try {
        const data = fs.readFileSync('high-scores.json', 'utf8');
        const playerInfo = JSON.parse(data);
        topFivePlayers.push(...playerInfo);
    } catch (error) {
        console.error('Error reading or parsing JSON file', error);
    }
};

// this function 
const saveDataToJSON = () => {
    fs.writeFileSync('high-scores.json', JSON.stringify(topFivePlayers, null, 2), 'utf8');
};
const startQuiz = () =>{
    // create variable to hold the number of questions answered correctly
    let answeredCorrect = 0;
    // traverse the array of 
    for(let i = 0; i < quizOptions.length; i++){
        // create a variable quizChoices to hold every question and get the array of choices
        const quizChoices = quizOptions[i].choices;
        // Print the question number and the question
        console.log(`Question ${i + 1}: ${quizOptions[i].question}?`);
        // print every choice in quizChoices using forEach
        quizChoices.forEach((answer, index) => {
        console.log(`${index + 1}) ${answer}`);
        });

        //Ask the user for an question option
        const answerChoice = prompt(`Enter your answer (1 - ${quizChoices.length}): `).trim();
        const indexChoice = Number(answerChoice) -1;

        // check if the current index matches the `answerIndex` property in quizOptions
        // if it's true, increase the number of questions answered correctly
        if(checkAnswer(indexChoice, i)){
            answeredCorrect++;
            console.log('Correct! Well done!');
        } else{
            console.log('Incorrect :(');
        }
        // Calculate the current percentage/grade
        const currentScore = Math.round(answeredCorrect/quizOptions.length * 100);
        // Display how many questions the user has answered correctly and the grade
        console.log(`Current Score: ${answeredCorrect}/${quizOptions.length} (%${currentScore})\n`);
    }
    // Final Score after the loop is done
    const finalScore = Math.round(answeredCorrect/quizOptions.length * 100);
    console.log(`Quiz Complete!`);
    console.log(`Final Score: ${answeredCorrect}/${quizOptions.length} (%${finalScore})`);
    console.log('Thanks for playing!');
    // Check if the current player can make it to the top 5
    if(isTopFive(finalScore)){
        console.log('Congratulations! You scored a high score!');
        const playerName = prompt('Enter your name: ');
        addTopFive(playerName, finalScore);
    }

};

const checkAnswer = (index, currentQuestion) =>{
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
    topFivePlayers.sort((a, b) => b.score - a.score);
    // keep only the first 5 players in the array
    topFivePlayers.splice(5);

    saveDataToJSON();

};

const isTopFive = (score) => {
    if(topFivePlayers.length < 5 && score !== 0){
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
loadDataFromJSON();
module.exports = {startQuiz, viewTopFive};