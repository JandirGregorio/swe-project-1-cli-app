// require

// do the options for the quiz

const prompt = require('prompt-sync')({singing : true});
const {viewQuiz, viewTopFive} = require('./quiz');
const showMenu = () => {
    let isRunning = true;
    while(isRunning){
        console.log('Menu:');
        console.log('1. Start Quiz')
        console.log('2. View High Scores');
        console.log('3. Exit');

        const menuChoice = prompt('Choose an Action (Enter 1-3): ').trim();
        
        if(menuChoice === '1'){
            viewQuiz();
        } else if(menuChoice === '2'){
            viewTopFive();
        } else if(menuChoice === '3'){
            isRunning = false;
        } else {
            console.log('Invalid option, try again.');
        }
        prompt('\nPress Enter to continue...');
        console.clear();
    }
    console.log('See ya!');
};
showMenu();