

const scoreElement = document.getElementById("score");
const calculationElement = document.getElementById("calculation");
const userAnswerElement = document.getElementById("userAnswer");
const numberButtons = document.querySelectorAll(".numbers .btn");
const submitButton = document.getElementById("submit-answer");
const refreshButton = document.getElementById("refreshButton");
const leaderboardTable = document.querySelector(".table tbody");

let Score = 0;
let userName = null;
let leaderboardData = [];
let userInputField; 

function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];
    const correctAnswer = eval(`${num1} ${operator} ${num2}`);
    calculationElement.textContent = `${num1} ${operator} ${num2}`;
    return correctAnswer;
}

numberButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const currentValue = userAnswerElement.value;
        const newValue = currentValue + button.textContent;
        userAnswerElement.value = newValue;
    });
});

submitButton.addEventListener("click", function () {
    const userAnswer = parseInt(userAnswerElement.value);
    const correctAnswer = eval(calculationElement.textContent);

    if (userAnswer === correctAnswer) {
        Score += 10;
        scoreElement.textContent = Score;
        userAnswerElement.value = "";
        generateMathQuestion();
    } else {
        userAnswerElement.value = "";

     
        userInputField = document.createElement("input");
        userInputField.setAttribute("type", "text");
        userInputField.setAttribute("id", "user-name-input");
        userInputField.setAttribute("placeholder", "Enter your name");
        userInputField.classList.add("form-control", "mt-5");
        document.body.appendChild(userInputField);
    }
});

refreshButton.addEventListener("click", function () {
    if (userInputField) {
        userName = userInputField.value;
    }
    if (userName) {
        leaderboardData.push({ name: userName, score: Score });
        leaderboardData.sort((a, b) => b.score - a.score);
        leaderboardTable.innerHTML = "";

        leaderboardData.forEach((data, index) => {
            const newRow = document.createElement("tr");
            const rankCell = document.createElement("td");
            rankCell.textContent = index + 1;
            const nameCell = document.createElement("td");
            nameCell.textContent = data.name;
            const scoreCell = document.createElement("td");
            scoreCell.textContent = data.score;
            newRow.appendChild(rankCell);
            newRow.appendChild(nameCell);
            newRow.appendChild(scoreCell);
            leaderboardTable.appendChild(newRow);
        });

        Score = 0;
        scoreElement.textContent = Score;
        userAnswerElement.value = "";
        userName = null;
        if (userInputField) {
            userInputField.remove();
        }
    }
});

generateMathQuestion();


