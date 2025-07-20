

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choiceList = document.getElementById("choice-list");
    const resultContainer = document.getElementById("result-container");
    const displayScore = document.getElementById("score-display");
    const displayAccuracy = document.getElementById("accuracy-display");

    const quizData = [
        {
            question: "What is the capital of France?",
            options: ["Madrid", "Berlin", "Paris", "Lisbon"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Mercury"],
            answer: "Mars"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["William Wordsworth", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
            answer: "William Shakespeare"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedChoice = null;

    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click', () => {
        if (!selectedChoice) {
            alert("Please select an answer before proceeding.");
            return;
        }

        const correctAnswer = quizData[currentQuestionIndex].answer;
        if (selectedChoice === correctAnswer) {
            score++;
        }

        currentQuestionIndex++;
        selectedChoice = null;

        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        selectedChoice = null;
        resultContainer.classList.add('hidden');
        startQuiz();
    });

    function startQuiz() {
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add("hidden");

        const currentQ = quizData[currentQuestionIndex];
        questionText.textContent = currentQ.question;

        choiceList.innerHTML = "";

        currentQ.options.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option;
            li.classList.add('option-item');
            li.addEventListener('click', () => selectOption(li, option));
            choiceList.appendChild(li);
        });
    }

    function selectOption(liElement, choice) {
        document.querySelectorAll('.option-item').forEach(li => {
            li.classList.remove('selected');
        });

        liElement.classList.add('selected');
        selectedChoice = choice;
        nextBtn.classList.remove('hidden');
    }

    function showResult() {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        displayScore.textContent = `Your Score: ${score} out of ${quizData.length}`;
        const accuracy = ((score / quizData.length) * 100).toFixed(2);
        displayAccuracy.textContent = `Accuracy: ${accuracy}%`;
    }
});
