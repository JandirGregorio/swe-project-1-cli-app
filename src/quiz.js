const prompt = require('prompt-sync')({sigint: true});
const fs = require('fs');

// array of questions
const quizQuestions = [
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

/* 
this function saves the player information to a JSON file
*/
const saveDataToJSON = () => {
    fs.writeFileSync('high-scores.json', JSON.stringify(topFivePlayers, null, 2), 'utf8');
};
/**
 * This function displays all the questions from quizOptions
 */
const startQuiz = () =>{
    // create variable to hold the number of questions answered correctly
    let answeredCorrect = 0;
    // traverse the array of 
    for(let i = 0; i < quizQuestions.length; i++){
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
        const currentScore = Math.round(answeredCorrect/quizQuestions.length * 100);
        // Display how many questions the user has answered correctly and the grade
        console.log(`Current Score: ${answeredCorrect}/${quizQuestions.length} (%${currentScore})\n`);
    }
    // Final Score after the loop is done
    const finalScore = Math.round(answeredCorrect/quizQuestions.length * 100);
    console.log(`Quiz Complete!`);
    console.log(`Final Score: ${answeredCorrect}/${quizQuestions.length} (%${finalScore})`);
    console.log('Thanks for playing!');
    // Check if the current player can make it to the top 5
    if(isTopFive(finalScore)){
        console.log('Congratulations! You scored a high score!');
        const playerName = prompt('Enter your name: ');
        addTopFive(playerName, finalScore);
    }

};

/**
 * This functions checks if the user guessed the right index saved in quizOptions[i].answerIndex;
 * @param {number} index - this is the guess the user made from the question options 
 * @param {number} currentQuestion - the current index in the quizOptions array of objects
 * @returns a boolean indicating whether or not the user answered correctly
 */
const checkAnswer = (index, currentQuestion) =>{
    return index === quizOptions[currentQuestion].answerIndex;
};

/**
 * This function adds an object to topFivePlayers array: {name, score, date}
 * It sorts the array by the highest scores, and keeps only the 5 highest
 * It uses saveDataToJSON to add the player information to the JSON file containing the 5 highest scores
 * @param {string} name - the name of a player who made it to the top 5
 * @param {number} score - score of the player
 */
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
/**
 * This function checks if the player's score can make it to the top 5
 * @param {number} score - player's quiz score
 * @returns a boolean indicating whether or not the player can make in the top 5
 */
const isTopFive = (score) => {
    // if there are currently less than 5 scores and the player's score is not zero
    // return true
    if(topFivePlayers.length < 5 && score !== 0){
        return true;
    }
    // get the last index in the array
    const n = topFivePlayers.length - 1;
    // get the last place in the top 5
    const lastPlaceScore = topFivePlayers[n].score;
    return score > lastPlaceScore;
};
/**
 * This function displays the top 5
 */
const viewTopFive = () => {
    // if no players have played, print message and return
    if(topFivePlayers.length === 0){
        console.log('No players to see yet!');
        return;
    }
    topFivePlayers.forEach((player, place) =>{
        console.log(`${place + 1}. ${player.score} (${player.name}) - ${player.date}`);
    });
};
loadDataFromJSON();
module.exports = {startQuiz, viewTopFive};