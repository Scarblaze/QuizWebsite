document.addEventListener('DOMContentLoaded', () => {
    let timer;
    let timeElapsed = 0;
    let currentQuestionIndex = 0;
    const quizData = {
        easy: [
            { question: '2+2?', options: ['3', '4', '5'], answer: '4' },
            { question: '5-3?', options: ['2', '3', '4'], answer: '2' }
        ],
        medium: [
            { question: '10*2?', options: ['20', '30', '40'], answer: '20' },
            { question: '12/4?', options: ['2', '3', '4'], answer: '3' }
        ],
        hard: [
            { question: '15+27?', options: ['42', '43', '44'], answer: '42' },
            { question: '99-34?', options: ['63', '65', '67'], answer: '65' }
        ]
    };

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            loadQuestions(button.dataset.difficulty);
        });
    });

    function loadQuestions(difficulty) {
        const questions = quizData[difficulty];
        const quizContent = document.getElementById('quiz-content');
        quizContent.innerHTML = '';
        questions.forEach((questionData, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <p>${questionData.question}</p>
                ${questionData.options.map(option => `<button class="option">${option}</button>`).join('')}
            `;
            quizContent.appendChild(questionElement);

            questionElement.querySelectorAll('.option').forEach(optionButton => {
                optionButton.addEventListener('click', () => {
                    clearInterval(timer);
                    const isCorrect = optionButton.textContent === questionData.answer;
                    optionButton.style.backgroundColor = isCorrect ? 'green' : 'red';
                    setTimeout(() => {
                        loadNextQuestion(difficulty, index + 1);
                    }, 1000);
                });
            });
        });

        startTimer();
    }

    function loadNextQuestion(difficulty, index) {
        const questions = randomArray(quizData[difficulty]);
        if (index < questions.length) {
            currentQuestionIndex = index;
            displayQuestion(difficulty, index);
        } else {
            displayProgress();
        }
    }

    function displayQuestion(difficulty, index) {
        const questionData = quizData[difficulty][index];
        const quizContent = document.getElementById('quiz-content');
        quizContent.innerHTML = `
            <div class="question">
                <p>${questionData.question}</p>
                ${questionData.options.map(option => `<button class="option">${option}</button>`).join('')}
            </div>
        `;
        quizContent.querySelectorAll('.option').forEach(optionButton => {
            optionButton.addEventListener('click', () => {
                clearInterval(timer);
                const isCorrect = optionButton.textContent === questionData.answer;
                optionButton.style.backgroundColor = isCorrect ? 'green' : 'red';
                setTimeout(() => {
                    loadNextQuestion(difficulty, index + 1);
                }, 1000);
            });
        });

        startTimer();
    }

    function startTimer() {
        timeElapsed = 0;
        timer = setInterval(() => {
            timeElapsed++;
            document.getElementById('time-elapsed').textContent = timeElapsed;
        }, 1000);
    }

    function displayProgress() {
        const progressBar = document.getElementById('progress');
        progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.easy.length) * 100}%`;
    }
    function randomArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    
});
