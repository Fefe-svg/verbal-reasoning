document.addEventListener('DOMContentLoaded', () => {
    // Define variables to identify the current set number
    const setNumber = 2; // Example: Set number can be 1, 2, or 3 based on the quiz set
    const startButton = document.getElementById('startButton');
    const continueButton = document.getElementById('continueButton');
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
            question: `<h4>Q1.You are a product manager and receive feedback that the latest product release has significant usability issues.      What should you do?</h4>
            <h7>A. Immediately halt further distribution and address the issues.<br>
 B. Gather detailed feedback from users to understand the specific issues.<br>
 C. Ignore the feedback and hope the issues resolve in the next update.<br>
 D. Inform the development team about the feedback and collaborate on solutions.<br>
 E. Consult with senior management about potential impacts and next steps.
</h7>`,
            options: ["BCEDA", "BDAEC", "ADCBE"],
            correctAnswer: "BDAEC",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 2,
            type: "MCQ",
            question: `<h4>Q2. As a team leader, you notice that a team member has been consistently missing deadlines.
What is your first step?</h4>
            <h7>A. Address the issue privately with the team member to understand the cause.<br>
 B. Immediately report the issue to HR.<br>
 C. Ignore the issue and hope it improves over time.<br>
 D. Monitor the team member's performance more closely.<br>
 E. Offer support and resources to help the team member meet deadlines.
</h7>`,
            options: ["BCEAD", "ACBDE", "ADECB"],
            correctAnswer: "ADECB",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 3,
            type: "MCQ",
            question: `<h4>Q3. You are a customer service manager and receive a complaint about a faulty product. What
should you do first?</h4>
            <h7>A. Apologize to the customer and offer a refund or replacement.<br>
 B. Investigate the issue to determine the cause of the fault.<br>
 C. Ignore the complaint and hope it’s an isolated incident.<br>
 D. Inform the production team about the issue for quality control.<br>
 E. Document the complaint for future reference.
</h7>`,
            options: ["BDECA", "ABDCE", "ABDEC"],
            correctAnswer: "ABDCE",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 4,
            type: "MCQ",
            question: `<h4>Q4. As a sales manager, you find that your team is struggling to meet targets. What is your initial
response?</h4>
            <h7>A. Conduct a meeting with the team to identify obstacles and discuss solutions.<br>
 B. Ignore the issue and hope performance improves.<br>
 C. Report the performance issues to senior management.<br>
 D. Offer additional training and resources to the team.<br>
 E. Evaluate the current sales strategies and make necessary adjustments</h7>`,
            options: ["CDEBA", " ADECB", "ECADB"],
            correctAnswer: "ADECB",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 5,
            type: "MCQ",
            question: `<h4>Q5. You are an IT support specialist and receive multiple reports of a critical system outage.
What should you prioritize?
</h4>
            <h7>A. Immediately investigate and resolve the outage.<br>
 B. Inform users that the issue is being addressed.<br>
 C. Wait for further reports before taking action.<br>
 D. Escalate the issue to senior IT staff.<br>
 E. Document the issue and steps taken for resolution.
</h7>`,
            options: ["ABCDE", "ACBED", "ABDCE"],
            correctAnswer: "ABDCE",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 6,
            type: "MCQ",
            question: `<h4>Q6. As a marketing director, you realize a major marketing campaign was launched with
incorrect information. What do you do?
</h4>
            <h7>A. Immediately correct the information and issue a public statement.<br>
 B. Wait for customer feedback before taking action.<br>
 C. Consult with the marketing team to discuss how the error occurred.<br>
 D. Inform senior management about the error.<br>
 E. Review the approval process to prevent future mistakes.

</h7>`,
            options: ["ACDBE", "CDBEA", "DBECA"],
            correctAnswer: "ACDBE",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 7,
            type: "MCQ",
            question: `<h4>Q7. You are a warehouse manager and notice that several safety protocols are not being followed.
What is your first step?
</h4>
            <h7>A. Immediately address the issue with the warehouse staff.<br>
 B. Ignore the issue and hope it resolves itself.<br>
 C. Report the non-compliance to senior management.<br>
 D. Conduct a training session on safety protocols.<br>
 E. Monitor the situation closely to ensure compliance.
</h7>`,
            options: ["ADCB", "ADEC", "ADBCE"],
            correctAnswer: "ADEC",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 8,
            type: "MCQ",
            question: `<h4>Q8. As a procurement officer, you discover that a key supplier has increased prices significantly.
What is your immediate action?</h4>
            <h7>A. Negotiate with the supplier for better pricing.<br>
 B. Look for alternative suppliers.<br>
 C. Ignore the price increase and proceed with the order.<br>
 D. Inform senior management about the price increase.<br>
 E. Evaluate the impact of the price increase on your budget.
</h7>`,
            options: ["ABDEA", "ABCED", "ADCEB"],
            correctAnswer: "ABDEA",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 9,
            type: "MCQ",
            question: `<h4>Q9. You are a financial analyst and find an error in the financial report submitted to the board.
What should you do?</h4>
            <h7>A. Immediately inform the board about the error and submit a corrected report.<br>
 B. Wait until the next meeting to address the error.<br>
 C. Correct the error and hope the board doesn't notice.<br>
 D. Consult with your supervisor on the best course of action.<br>
 E. Investigate how the error occurred and implement measures to prevent it in the future.
</h7>`,
            options: ["BAECD", "CADEB", "ADECB"],
            correctAnswer: "ADECB",
            user_ans: "",
            explanation: "",
        },
        {
            Sno:10,
            type:"MCQ",
            attachement:`\tA.	Immediately reschedule one of the events to avoid conflicts.\n\tB.	Wait until the last minute to see if anyone notices the double booking.\n\tC.	Cancel one of the events and apologize to the affected participants.\n\tD.	Inform your supervisor about the double booking for guidance.\n\tE.	Delegate the task of rescheduling to another team member.
            `,
            question:`<h4>Q10. As an operations manager, you learn that a major client is dissatisfied with your service.
What is your first step?</h4>
            <h7> A. Contact the client immediately to address their concerns.<br>
 B. Wait for the client to bring up the issue again.<br>
 C. Ignore the issue and focus on other clients.<br>
 D. Inform your team about the client's feedback.<br>
 E. Develop a plan to improve the service provided to the client.</h7>`,
            options : ["BADEC","AEDCB","ADECB"],
            correctAnswer:"ADECB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:11,
            type:"MCQ",
            attachement:`\tA.	Immediately inform the project team and search for the missing document.\n\tB.	Wait for someone else to notice the missing document before taking action.\n\tC.	Ignore the missing document and hope it turns up eventually.\n\tD.	Notify the document owner about the missing document for resolution.\n\tE.	Consult with the IT department to see if the document can be recovered from backups.
            `,
            question:`<h4>Q11. You are a content manager and find that a blog post has been published with incorrect data.
What do you do?
</h4>
            <h7>A. Immediately update the post with accurate information.<br>
 B. Wait for readers to point out the mistakes before taking action.<br>
 C. Consult with the author about the errors and corrections.<br>
 D. Inform senior management about the mistake.<br>
 E. Issue an apology to the readers.
</h7>`,
            options : ["AEDCB","ADEBC","ACDEB"],
            correctAnswer:"ACDEB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:12,
            type:"MCQ",
            attachement:`\tA.	Immediately reach out to the client to address their concerns and offer solutions.\n\tB.	Disregard the feedback as an isolated incident.\n\tC.	Wait for the client to bring up the feedback again before taking action.\n\tD.	Inform the sales team about the negative feedback for future reference.\n\tE.	Consult with your manager before responding to the client.
            `,
            question:`<h4>Q12. As a logistics manager, you find that deliveries are consistently late. What is your first
action?</h4>
            <h7> A. Investigate the root cause of the delays.<br>
 B. Ignore the delays and hope they resolve on their own.<br>
 C. Inform the clients about the delays and provide updates.<br>
 D. Consult with the delivery team to find solutions.<br>
 E. Report the issue to senior management.</h7>`,
            options : ["BACDE","ADCBE","BDCEA"],
            correctAnswer:"ADCBE",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:13,
            type:"MCQ",
            attachement:`\tA.	Immediately place orders for replenishing the office supplies.\n\tB.	Wait until supplies are completely depleted before ordering more.\n\tC.	Ignore the low supplies and hope others notice and take action.\n\tD.	Inform department heads about the low supplies for their teams.\n\tE.	Check with other departments to see if they can share their supplies temporarily.
            `,
            question:`<h4>Q13. You are a training manager and notice that participation in training sessions is low. What do
you do?</h4>
            <h7> A. Survey employees to understand why participation is low.<br>
 B. Ignore the low participation and continue with the current training schedule.<br>
 C. Offer incentives for attending training sessions.<br>
 D. Inform senior management about the low participation.<br>
 E. Adjust the training schedule to better fit employees' needs.</h7>`,
            options : ["AECBD","CBDEA","ACDEB"],
            correctAnswer:"AECBD",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:14,
            type:"MCQ",
            attachement:`\tA.	Immediately inform the development team to fix the bug.\n\tB.	Ignore the bug and hope it doesn't affect users.\n\tC.	Wait for users to report the bug before taking action.\n\tD.	Inform the project manager about the bug and seek guidance.\n\tE.	Document the bug and its impact for future reference.
            `,
            question:`<h4>Q14. As a sales director, you find that your competitors have launched a successful new product.
What should you do?</h4>
            <h7> A. Conduct a competitive analysis to understand the new product.<br>
 B. Ignore the new product and continue with your current strategy.<br>
 C. Inform your team about the new product and discuss strategies.<br>
 D. Report the development to senior management.<br>
 E. Evaluate your product offerings and consider improvements.</h7>`,
            options : ["ACDEB","CBEAD","CEDBA"],
            correctAnswer:"ACDEB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:15,
            type:"MCQ",
            attachement:`\tA.	Immediately address the issue with the team and offer support.\n\tB.	Ignore the low morale to avoid confrontation.\n\tC.	Wait for team members to raise concerns before taking action.\n\tD.	Inform senior management about the low morale for intervention.\n\tE.	Organize team-building activities to boost morale.
            `,
            question:`<h4>Q15. You are an HR director and receive reports of low employee morale. What is your first step?</h4>
             <h7> A. Conduct a survey to understand the reasons for low morale.<br>
 B. Ignore the reports and hope morale improves.<br>
 C. Hold a meeting with employees to discuss their concerns.<br>
 D. Implement immediate morale-boosting activities.<br>
 E. Inform senior management about the issue.
</h7>`,
            options : ["CEDAB","CADEB","AECBD"],
            correctAnswer:"AECBD",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:16,
            type:"MCQ",
            attachement:`\tA.	Immediately address the safety hazard to prevent accidents.\n\tB.	Ignore the hazard and hope it doesn't cause harm.\n\tC.	Wait for someone else to notice the hazard before taking action.\n\tD.	Inform the safety committee about the hazard for resolution.\n\tE.	Consult with health and safety experts for guidance on addressing the hazard.
            `,
            question:`<h4>Q16. As a quality assurance manager, you find that the defect rate in production has increased.
What should you do first?</h4>
             <h7> A. Investigate the cause of the defects.<br>
 B. Ignore the issue and hope it improves.<br>
 C. Report the issue to senior management.<br>
 D. Inform the production team and collaborate on solutions.<br>
 E. Implement immediate quality checks to reduce defects.</h7>`,
            options : ["ADCEB","DCEAB","CEBDA"],
            correctAnswer:"ADCEB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:17,
            type:"MCQ",
            attachement:`\tA.	Immediately remove the inappropriate content and issue an apology.\n\tB.	Ignore the content and hope it goes unnoticed.\n\tC.	Wait for user complaints before taking action.\n\tD.	Inform the content creator about the inappropriate content for correction.\n\tE.	Consult with legal counsel before taking any action.
            `,
            question:`<h4>Q17. You are a compliance officer and discover that the company is not adhering to new
regulations. What is your immediate action?
</h4>
             <h7>A. Inform senior management about the non-compliance.<br>
 B. Ignore the issue to avoid conflict.<br>
 C. Develop a plan to bring the company into compliance.<br>
 D. Conduct a training session on the new regulations.<br>
 E. Monitor compliance closely to ensure adherence.
</h7>`,
            options : ["EBCDA","BEDAC","ACDEB"],
            correctAnswer:"ACDEB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:18,
            type:"MCQ",
            attachement:`\tA.	Immediately notify the recipient about the delay and provide updates.\n\tB.	Ignore the delay and hope the recipient doesn't notice.\n\tC.	Wait for the recipient to inquire about the delay before taking action.\n\tD.	Inform the shipping carrier about the delay in resolution.\n\tE.	Consult with senior management about potential solutions to expedite the shipment.
            `,
            question:`<h4>Q18. As a customer service manager, you receive several complaints about a particular
representative. What is your first step?
</h4>
            <h7> A. Investigate the complaints to understand the issue.<br>
 B. Ignore the complaints and hope they decrease.<br>
 C. Discuss the complaints with the representative and offer guidance.<br>
 D. Inform senior management about the issue.<br>
 E. Provide additional training to the representative.
</h7>`,
            options : ["EDBCA","ACDEB","CADEB"],
            correctAnswer:"ACDEB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:19,
            type:"MCQ",
            attachement:`\tA.	Immediately address the violations to ensure compliance.\n\tB.	Ignore the violations to avoid stirring up trouble.\n\tC.	Wait for regulatory agencies to discover the violations before taking action.\n\tD.	Inform the department heads about the violations for corrective action.\n\tE.	Consult with legal counsel about the best course of action to address the violations.
            `,
            question:`<h4>Q19. You are a facilities manager and find that the office building has several maintenance issues.
What do you do first?</h4>
            <h7>A. Address the most critical maintenance issues immediately.<br>
 B. Ignore the issues and hope they resolve on their own.<br>
 C. Inform senior management about the maintenance problems.<br>
 D. Develop a maintenance schedule to address all issues.<br>
 E. Consult with the maintenance team to prioritize repairs.
</h7>`,
            options : ["BADEC","ADECB","BDCEA"],
            correctAnswer:"ADECB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:20,
            type:"MCQ",
            attachement:`\tA.	Immediately inform both parties about the scheduling conflict and reschedule one of the meetings.\n\tB.	Ignore the double booking and hope one of the parties cancels.\n\tC.	Wait for someone else to notice the double booking before taking action.\n\tD.	Inform your supervisor about the scheduling conflict for guidance.\n\tE.	Delegate the task of rescheduling to another team member.
            `,
            question:`<h4>Q20. You are a project manager and realize that a key milestone is behind schedule. What should
you do first?</h4>
            <h7>A. Review the project plan to identify potential adjustments.<br>
B. Assess the reasons for the delay and create a recovery plan.<br>
C. Communicate the delay to the team and stakeholders.<br>
D. Reassign tasks to improve progress.<br>
E. Document the reasons for the delay and recovery steps taken.
</h7>`,
            options : ["ACEDB","BCEDA","CAEDB"],
            correctAnswer:"BCEDA",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:21,
            type:"MCQ",
            attachement:`\tA.	Immediately investigate the connectivity issues to identify the root cause.\n\tB.	Ignore the reports and hope the issues resolve themselves.\n\tC.	Wait for more reports before taking action.\n\tD.	Inform the network administrator about the reports for resolution.\n\tE.	Consult with external network experts for assistance.
            `,
            question:`<h4>Q21. As a customer support representative, you receive multiple complaints about a product
defect. What is your first step?</h4>
            <h7>A. Inform the product development team about the defect.<br>
B. Gather detailed information from the customers about the defect.<br>
C. Offer immediate refunds to the customers.<br>
D. Issue a public apology on social media.<br>
E. Document the complaints and actions taken for future reference.</h7>`,
            options : ["BACDE","EBCDA","CBEDA"],
            correctAnswer:"BACDE",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:22,
            type:"MCQ",
            attachement:`\tA.	Immediately correct the discrepancies in the data to ensure campaign accuracy.\n\tB.	Ignore the discrepancies and hope they don't affect campaign performance.\n\tC.	Wait for campaign performance metrics to identify the impact of the discrepancies.\n\tD.	Inform the marketing team about the discrepancies for future campaigns.\n\tE.	Consult with data experts to validate the accuracy of the data.
            `,
            question:`<h4>Q22. You are a team leader and notice that a team member is consistently missing deadlines. How
do you handle this?</h4>
            <h7>A. Discuss the issue privately with the team member and find out if there are any underlying
problems.<br>
B. Reassign the tasks to another team member.<br>
C. Publicly reprimand the team member.<br>
D. Ignore the issue and hope it improves.<br>
E. Document the performance issues and any steps taken to address them</h7>`,
            options : ["ADBEC","BADCE","BDEAC"],
            correctAnswer:"ADBEC",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:23,
            type:"MCQ",
            attachement:`\tA.	Immediately review staffing levels and reallocate resources to reduce wait times.\n\tB.	Ignore the complaints and hope they decrease over time.\n\tC.	Wait for more complaints before taking action.\n\tD.	Inform the IT department about the complaints about system upgrades.\n\tE.	Consult with call center experts for strategies to improve efficiency.
            `,
            question:`<h4>Q23. As a marketing manager, you notice a sudden drop in the engagement of your latest
campaign. What do you do?</h4>
            <h7>A. Analyze the data to identify possible reasons for the drop in engagement.<br>
B. Consult with the marketing team to brainstorm new ideas.<br>
C. Increase the budget for the campaign.<br>
D. Immediately cancel the campaign.<br>
E. Document the findings and any adjustments made for future campaigns.</h7>`,
            options : ["BDEAC","ABDCE","BADEC"],
            correctAnswer:"ABDCE",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:24,
            type:"MCQ",
            attachement:`\tA.	Immediately retract the article and issue a corrected version.\n\tB.	Ignore the errors and hope readers don't notice.\n\tC.	Wait for reader feedback before taking action.\n\tD.	Inform the content creator about the errors for correction.\n\tE.	Consult with the editorial team about the best approach for correction.
            `,
            question:`<h4>Q24. You are an HR manager and receive a report of harassment in the workplace. What is your
first action?</h4>
            </h7>A. Conduct an immediate and thorough investigation.<br>
B. Inform senior management and seek guidance.<br>
C. Discuss the report with the alleged harasser.<br>
D. Transfer the accused employee to another department.<br>
E. Document the report and investigation for future reference.</h7>`,
            options : ["DBAEC"," BCADE","DBEAC"],
            correctAnswer:" BCADE",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:25,
            type:"MCQ",
            attachement:`\tA.	Immediately inform the project stakeholders about the budget overrun and propose solutions.\n\tB.	Ignore the budget overrun and hope it doesn't impact project outcomes.\n\tC.	Wait for the next budget review meeting before addressing the issue.\n\tD.	Inform the finance department about the budget overrun for assistance.\n\tE.	Consult with the project team to identify areas where expenses can be reduced. 
            `,
            question:`<h4>Q25. As a finance manager, you find a significant error in the quarterly financial report. What
should you do?</h4>
            <h7>A. Correct the error and inform your supervisor.<br>
B. Submit the report with a note about the error.<br>
C. Ignore the error and submit the report.<br>
D. Correct the error but do not inform anyone.<br>
E. Document the error and corrective actions taken for future reference</h7> `,
            options : ["ABCDE","AEDCB","ABEDC"],
            correctAnswer:"AEDCB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:26,
            type:"MCQ",
            attachement:`\tA.	Immediately contact the supplier to inquire about the cause of the delays and discuss potential solutions.\n\tB.	Ignore the supplier's production delays and hope they resolve the issue internally.\n\tC.	Wait for the next scheduled meeting with the supplier before addressing the issue.\n\tD.	Inform the production team about the supplier's delays for contingency planning.\n\tE.	Consult with senior management about potential alternative suppliers to mitigate the impact of the delays.
            `,
            question:`<h4>Q26. You are a software developer and discover a critical security vulnerability in the application.
What is your immediate action?</h4>
            <h7>A. Inform the IT security team and work with them to fix it.<br>
B. Fix the vulnerability immediately and then inform the team.<br>
C. Ignore the vulnerability.<br>
D. Document the vulnerability and schedule it for a future update.<br>
E. Test the vulnerability further before taking any action.</h7>`,
            options : ["ABCDE","AECDB","ADEBC"],
            correctAnswer:"AECDB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:27,
            type:"MCQ",
            attachement:`\tA.	Ignore the reports and hope the situation resolves itself.\n\tB.	Wait for more employees to report incidents before taking action.\n\tC.	Inform the senior team member about the reports and seek their explanation.\n\tD.	Immediately launch an investigation into the reported incidents.\n\tE.	Consult with legal counsel before addressing the reported incidents
            `,
            question:`<h4>Q27. As a retail manager, you notice that an employee has been underperforming. What is your
first step?</h4>
            <h7>A. Discuss the performance issues with the employee and offer support.<br>
B. Reassign the employee to a different role.<br>
C. Fire the employee immediately.<br>
D. Ignore the issue and hope it improves.<br>
E. Document the performance issues and any steps taken to address them</h7>`,
            options : ["ADECB","ECDBA","DECBA"],
            correctAnswer:"ADECB",
            user_ans: "",
            explanation:"",
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
            <p style="margin-top: 20px; margin-left: -5%;">. ${q.question}</p>
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
    function resetGame() {
        clearInterval(timerInterval);
        currentQuestionIndex = 0;
        timeLeft = 600; // Reset time to 10 minutes
        totalTimeTaken = 0;
        correctAnswers = 0;
        timerElement.textContent = '10:00';
        questions.forEach(question => question.user_ans = ""); // Clear user answers
        showScreen(startScreen);
        updateProgressBar();
        updateProgressText();
    }

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
        // showScreen(instructionScreen);
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
    restartButton.addEventListener('click', resetGame);
    toggleResultsButton.addEventListener('click', showDetailedResults);
});

// Function to handle both marking the set as completed and redirecting
function handleDashboardRedirect() {
    // Mark set 1 as completed in localStorage
    localStorage.setItem('situationalSet2Completed', 'true');
    
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

   
//   // Send final score to the server
//   fetch('/save-result', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ username, scoresituational: score })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('Score saved successfully:', data);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });