const prompt = require('prompt-sync')({sigint: true});
//const path = require('path');
const fs = require('fs');

// const pathToJSON = fs.readFile(path.join(__dirname, 'swe-project-1-cli-app', 'high-scores.json'))
// array of questions
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

// create array to hold the top 5 players
const topFivePlayers = [
    // {
    //     name, 
    //     score, 
    //     date,
    // }
];

const loadDataFromJSON = () =>{
    try {
        const playerInfo = fs.readFileSync('high-scores.json', 'utf8');
        const jsonData = JSON.parse(playerInfo);
        topFivePlayers.push(...jsonData);
    } catch (error) {
        console.error('Error reading or parsing JSON file', error);
    }
};

const saveDataToJSON = () => {
    const data = JSON.stringify(topFivePlayers, null, 2);
    fs.writeFile('high-scores.json', data, 'utf8', (err) => {
        if(err) {
            console.log('Error writing file:', err);
        } 
    });
};
const viewQuiz = () =>{
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
        if(checkAnswers(indexChoice, i)){
            answeredCorrect++;
            console.log('Correct! Well done!');
        } else{
            console.log('Incorrect :(');
        }
        // Calculate the current percentage/grade
        const currentScore = Math.floor(answeredCorrect/quizOptions.length * 100);
        // Display how many questions the user has answered correctly and the grade
        console.log(`Current Score: ${answeredCorrect}/${quizOptions.length} (%${currentScore})\n`);
    }
    // Final Score after the loop is done
    const finalScore = Math.floor(answeredCorrect/quizOptions.length * 100);
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
    topFivePlayers.sort((a, b) => b.score - a.score);
    // keep only the first 5 players in the array
    topFivePlayers.splice(5);

    saveDataToJSON();

};

const isTopFive = (score) => {
    if(topFivePlayers.length < 5){
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
module.exports = {viewQuiz, viewTopFive};