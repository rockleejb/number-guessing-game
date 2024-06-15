function runGame() {
    const difficulty = setDifficulty();
    const target = Math.floor(Math.random() * difficulty) + 1;
    let guessString = '';
    let guessHistory = [];
    let correct = false;
    let numTries = 0;
    alert(`I picked a number between 1 and ${difficulty}. Can you guess it?`);

    do {
        guessString = prompt(`Enter a number between 1 and ${difficulty}:`);
        if (guessString === null) return;
        const guessNumber = +guessString;
        if (isNaN(guessNumber)) {
            alert(`${guessString} is not a number.`);
            continue;
        }
        guessHistory.push(guessNumber);
        numTries++;
        correct = checkGuess(guessString, target, guessHistory, difficulty);
        if (guessHistory.length % 5 === 0) {
            if (target % 2 === 0) {
                alert(`It's an even number.`);
            } else {
                alert(`It's an odd number.`);
            }
            if (difficulty > 10000) {
                if (Math.random() > 0.5) {
                    alert(`You fool. hahahahaha`);
                } else {
                    alert(`Trolololol I am your manager now.`);
                }
            }
        }
    } while (!correct);
    if (difficulty <= 1000) {
        alert(`${guessHistory[guessHistory.length - 1]} is correct! You guessed it in ${numTries} tries.`);
    } else {
        alert(`${guessHistory[guessHistory.length - 1]}. Flawless victory, no cap. Gold star once my backorder arrives.`);
    }
}

const checkGuess = (guessNumber, target, guessHistory, difficulty) => {
    if (guessNumber < 1 || guessNumber > difficulty) {
        alert(`${guessNumber} is out of range.`);
    } else if (guessNumber > target) {
        alert(`${guessNumber} is greater than the target.`);
        if (guessHistory.length > 1) {
            checkWarmerOrColder(guessHistory, target);
        }
    } else if (guessNumber < target) {
        alert(`${guessNumber} is less than the target.`);
        if (guessHistory.length > 1) {
            checkWarmerOrColder(guessHistory, target);
        }
    } else {
        return true;
    }
}

const checkWarmerOrColder = (guessHistory, target) => {
    const currentDifference = Math.abs(guessHistory[guessHistory.length - 1] - target);
    const previousDifference = Math.abs(guessHistory[guessHistory.length - 2] - target);

    if (currentDifference < previousDifference) {
        alert(`Getting warmer! Previous guesses: ${guessHistory.join(", ")}`);
    } else if (currentDifference > previousDifference) {
        alert(`Getting colder. Previous guesses: ${guessHistory.join(", ")}`);
    }
}

const setDifficulty = () => {
    const difficulty = prompt("Choose easy, medium, or hard. Type carefully for best results.").toLowerCase();
    switch (difficulty) {
        case "easy":
            return 10;
        case "medium":
            return 100;
        case "hard":
            return 1000;
        default:
            alert(`Muhahahahaha you thought you could outsmart me by typing ${difficulty}!`);
            alert(`You're in for it now...`);
            return 100000000;
    }
}
