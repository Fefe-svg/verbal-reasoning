
document.addEventListener('DOMContentLoaded', () => {
    // Define variables to identify the current set number
    const setNumber = 1; // Example: Set number can be 1, 2, or 3 based on the quiz set
    const startButton = document.getElementById('startButton');
    // const continueButton = document.getElementById('continueButton');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const finishButton = document.getElementById('finish');
    const restartButton = document.getElementById('restartButton');
    const toggleResultsButton = document.getElementById('toggleResults');
    const startScreen = document.querySelector('.start-screen');
    const instructionScreen = document.querySelector('.instruction-screen');
    const gameScreen = document.querySelector('.game-screen');
    const scoreScreen = document.querySelector('.score-screen');
    const progressElements = document.querySelectorAll('.progress');
    const progressBarFillElements = document.querySelectorAll('.progress-bar-fill');
    const timerElement = document.getElementById('timer');
    const questionEl = document.getElementById('question');
    const finalScoreElement = document.getElementById('finalScore');
    const resultsListEl = document.getElementById("resultsList");
    const interpretationEl = document.getElementById("interpretation");

    let currentQuestionIndex = 0;
    let timerInterval;
    let timeLeft = 600; // 10 minutes in seconds
    let totalTimeTaken = 0;
    let correctAnswers = 0;

    const questions = [
        {
            Sno: 1,
            type: "MCQ",
            question: `<h4>You are a project manager responsible for overseeing a team working on a critical project for a client. During a review of the project timeline, you notice that a key milestone deadline has been incorrectly set one week earlier than agreed upon with the client.</h4>
            <h7>A. Review other project milestones to identify any additional discrepancies or errors.<br>
            B. Adjust the milestone deadline in the project timeline to reflect the correct agreement with the client.<br>
            C. Inform the team members about the discrepancy and emphasize the importance of adhering to the revised timelines.<br>
            D. Immediately contact the client to discuss the discrepancy and renegotiate the deadline.<br>
            E. Document the discrepancy and corrective actions taken for future reference.</h7>`,
            options: ["BCEDA", "DBACE", "ADCBE"],
            correctAnswer: "DBACE",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 2,
            type: "MCQ",
            question: `<h4>You're a project manager and discover a critical error in the project timeline that could delay delivery. What action do you take?</h4>
            <h7>A. Immediately inform the project team and stakeholders to mitigate the impact.<br>
            B. Try to fix the error yourself without involving others.<br>
            C. Wait to see if the error resolves itself before taking action.<br>
            D. Inform your supervisor about the error and seek guidance.<br>
            E. Delegate the task of fixing the error to another team member.</h7>`,
            options: ["BCEAD", "ACBDE", "BCEDA"],
            correctAnswer: "BCEDA",
            user_ans: "",
            explanation: "",
        },

       
    ];

    function startTimer() {
        const totalTime = 600; // 15 minutes in seconds
        let timeLeft = totalTime;
    
        const timerElement = document.getElementById('timer');
        const timerBox = document.getElementById('timerBox');
    
        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timeLeft = 0; // Ensure timeLeft is exactly zero
                finishQuiz(); // Show the result screen
                return;
            }
    
            timeLeft--;
    
            // Update timer display
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
            // Calculate progress as percentage
            const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
    
            // Update background to create a moving border effect
            timerBox.style.backgroundImage = `linear-gradient(white, white), 
                                              conic-gradient(#213555 ${progressPercent}%, #D3D3D3 ${progressPercent}%)`;
        }, 1000);
    }

    function showScreen(screen) {
        document.querySelectorAll('.container').forEach(container => container.classList.add('hidden'));
        screen.classList.remove('hidden');
    }

    function updateProgressBar() {
        const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBarFillElements.forEach(bar => {
            bar.style.width = `${progressPercent}%`;
        });
    }

    function updateProgressText() {
        const progressText = `${currentQuestionIndex + 1}/${questions.length}`;
        progressElements.forEach(progress => {
            progress.textContent = progressText;
        });
    }

    function loadQuestion() {
        const q = questions[currentQuestionIndex];

        const optionsHtml = q.options.map(option => `
            <button class="option ${q.user_ans === option ? 'selected' : ''}" data-value="${option}">
                ${option}
            </button>
        `).join('');

        questionEl.innerHTML = `
            <p>Q${currentQuestionIndex + 1}. ${q.question}</p>
            <div class="options-container">${optionsHtml}</div>
        `;

        document.querySelectorAll('.option').forEach(optionEl => {
            optionEl.addEventListener('click', (e) => {
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                optionEl.classList.add('selected');
                saveAnswer(optionEl.getAttribute('data-value'));
            });
        });

        updateProgressText();
        updateProgressBar();
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.disabled = currentQuestionIndex === questions.length - 1;
        finishButton.style.display = currentQuestionIndex === questions.length - 1 ? 'block' : 'none';
        nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'block';
        prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    }

    function saveAnswer(selectedOption) {
        questions[currentQuestionIndex].user_ans = selectedOption || "";
    }

    function calculateScore() {
        correctAnswers = questions.reduce((score, question) => {
            return score + (question.user_ans === question.correctAnswer ? 1 : 0);
        }, 0);
    }

    function finishQuiz() {
        clearInterval(timerInterval);
        calculateScore();
        showScreen(scoreScreen);

        localStorage.setItem("quizAnswers", JSON.stringify(questions));

        finalScoreElement.textContent = `Final Score: ${correctAnswers}/${questions.length}`;


        // Clear the results list initially
        resultsListEl.innerHTML = ''; 
       // Get the current date and time
       const currentDate = new Date().toISOString();

       // Send the score and date to the server
       const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
       console.log(`Saving score for user: ${username}, set: ${setNumber}, score: ${correctAnswers}, date: ${currentDate}`); // Log for debugging

       fetch('/save-result', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               username: username,
               setNumber: setNumber, // Send the set number
               scoresituational: correctAnswers, // Send the correctAnswers as the score for the set
               date: currentDate // Send the current date
           })
       }).then(response => response.json())
         .then(data => {
             if (data.message) {
                 console.log(data.message);
             }
         }).catch(error => console.error('Error:', error));
   }

    // function resetGame() {
    //     clearInterval(timerInterval);
    //     currentQuestionIndex = 0;
    //     timeLeft = 600; // Reset time to 10 minutes
    //     totalTimeTaken = 0;
    //     correctAnswers = 0;
    //     timerElement.textContent = '10:00';
    //     questions.forEach(question => question.user_ans = ""); // Clear user answers
    //     showScreen(startScreen);
    //     updateProgressBar();
    //     updateProgressText();
    // }

    function showDetailedResults() {
        const questions = JSON.parse(localStorage.getItem("quizAnswers")) || [];
        let score = 0;
        resultsListEl.innerHTML = ''; // Clear previous results if any
        questions.forEach((question, index) => {
            const resultItem = document.createElement("li");
            resultItem.classList.add("result-item");

            const isCorrect = question.user_ans === question.correctAnswer;
            if (isCorrect) score++;

            resultItem.innerHTML = `
                <p><strong>Q${index + 1}. ${question.question}</strong></p>
                <p>Your answer: ${question.user_ans ? question.user_ans : "No answer"} ${isCorrect ? "✅" : "❌"}</p>
                <p>Correct answer: ${question.correctAnswer}</p>
                ${question.explanation ? `<p>Explanation: ${question.explanation}</p>` : ''}
            `;
            resultsListEl.appendChild(resultItem);
        });

        finalScoreElement.textContent = `Final Score: ${score}/${questions.length}`;

        // const interpretations = [
        //     { score: questions.length, text: "Excellent! You got all questions correct." },
        //     { score: Math.floor(questions.length * 0.8), text: "Great job! You got most of the questions correct." },
        //     { score: Math.floor(questions.length * 0.5), text: "Good effort! You got half of the questions correct." },
        //     { score: 0, text: "Better luck next time! Keep practicing to improve your score." }
        // ];

        // interpretationEl.textContent = interpretations.find(i => score >= i.score).text;
    
        document.getElementById("detailedResults").classList.toggle("hidden");
        toggleResultsButton.textContent = toggleResultsButton.textContent === "Show Detailed Results" ? "Hide Detailed Results" : "Show Detailed Results";
    }

    startButton.addEventListener('click', () => {
        showScreen(gameScreen);
        startTimer();
        loadQuestion();
    });

    // continueButton.addEventListener('click', () => {
    //     showScreen(gameScreen);
    //     startTimer();
    //     loadQuestion();
    // });

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    finishButton.addEventListener('click', finishQuiz);
    // restartButton.addEventListener('click', resetGame);
    toggleResultsButton.addEventListener('click', showDetailedResults);
});

// Function to handle both marking the set as completed and redirecting
function handleDashboardRedirect() {
    // Mark set 1 as completed in localStorage
    localStorage.setItem('situationalSet1Completed', 'true');
    
    // Get the username from localStorage
    const username = localStorage.getItem('username');
    
    // Redirect to the dashboard with the username query parameter
    if (username) {
        window.location.href = `/dashboard?username=${username}`;
    } else {
        window.location.href = '/dashboard';
    }
}

// Add event listener to the Complete Set button
const completeSetButton = document.getElementById('completeSet');
if (completeSetButton) {
    completeSetButton.addEventListener('click', handleDashboardRedirect);
}

// Add event listener to the Back to Dashboard button
const backToDashboardButton = document.getElementById('back-to-dashboard-button');
if (backToDashboardButton) {
    backToDashboardButton.addEventListener('click', handleDashboardRedirect);
}

 