# Quiz Game CLI Overview

## Start of application

```bash
Menu:
1. Start Quiz
2. View High Scores
3. Exit

Choose an Action (Enter 1-3): [user enters their choice here]
```

## Once in the quiz:

```bash
Question 1: What is 2 + 2?
1) 3
2) 4
3) 5
4) 6

Enter your answer (1-4): [user enters their answer here]
```

## When they finish, provide a percentage (rounded)

```bash
Correct! Well done!
Current Score: 2/3 (67%)
```

```bash
Correct! Well done!
Current Score: 3/4 (80%)
```

## Iif the user's score is in the top 5, prompt to add to array of objects

```bash
Congratulations! You scored a high score!
Enter your name: [user enters their name here]
```

## When viewing the scores:

```bash
Highscores:
1. 100 (ben) — 10/1/25
2. 90 (motun) — 10/2/25
3. 80 (carmen) — 10/10/25
4. 80 (gonzalo) — 10/29/25
5. 70 (reuben) — 10/19/25
```

# Data Structures

### To store quiz options

```js
[
  {
    question: "What is 2+2",
    choices: ["4", "22", "0", "40"],
    answerIndex: 0,
  },
  {
    question: "What is 5*6",
    choices: ["3", "56", "30", "11"],
    answerIndex: 2,
  },
];
```

### Keep score of the top 5 players and the `DATE`

```js
[
  { name: "ben", score: 100, date: "10/1/25" },
  { name: "motun", score: 90, date: "10/2/25" },
  { name: "carmen", score: 75, date: "10/10/25" },
];
```
