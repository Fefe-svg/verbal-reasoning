document.addEventListener('DOMContentLoaded', () => {
    // Define variables to identify the current set number
    const setNumber = 3; // Example: Set number can be 1, 2, or 3 based on the quiz set
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
            question: `<strong>You are a product manager and discover that a new product feature is not working as
intended. What do you do first?</strong>

           <br><br><h7>A. Review the feature specifications and identify the issue.<br>
B. Inform the development team about the issue and work on a solution.<br>
C. Communicate the issue to stakeholders and provide a revised timeline.<br>
D. Ignore the issue and hope it resolves itself.<br>
E. Document the issue and steps taken to resolve it.
</h7>`,
            options: ["BCEDA", "BADCE", "ADCBE"],
            correctAnswer: "BADCE",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 2,
            type: "MCQ",
            question: `<strong>As a logistics coordinator, you find out that a shipment is delayed due to unforeseen
circumstances. What do you do?</strong>
             <br><br><h7>A. Immediately notify the recipient about the delay and provide updates.<br>
B. Consult with senior management about potential solutions to expedite the shipment.<br>
C. Ignore the delay and hope the recipient doesn’t notice.<br>
D. Inform the shipping carrier about the delay in resolution.<br>
E. Document the delay and any actions taken for future reference.<br>
</h7>`,
            options: ["BCEAD", "ACBDE", "AECBD"],
            correctAnswer: "AECBD",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 3,
            type: "MCQ",
            question: `<strong>You are an event planner and realize that a venue has been double-booked for an
important event. What should you do first?</strong>
             <br><br><h7>A. Immediately contact the venue to resolve the double-booking issue<br>
 B. Inform the client about the double booking and propose alternative solutions.<br>
 C. Ignore the issue and hope it resolves itself.<br>
 D. Inform the production team about the issue for quality control.<br>
 E. Document the double booking and steps taken to resolve it for future reference.
</h7>`,
            options: ["BDECA", "ADBCE", "ABDEC"],
            correctAnswer: "ADBCE",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 4,
            type: "MCQ",
            question: `<strong>As a training coordinator, you notice that the training materials are outdated. What is
your first action?</strong>
             <br><br><h7>A. Update the training materials to ensure they are current.<br>
B. Inform the trainees about the outdated materials and provide interim solutions.<br>
C. Ignore the issue and proceed with the training.<br>
D. Consult with senior management about the necessary updates.<br>
E. Document the issue and any updates made for future reference.
</h7>`,
            options: ["CDEBA", " ADEBC", "ECADB"],
            correctAnswer: "ADEBC",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 5,
            type: "MCQ",
            question: `<strong>You are an IT support specialist and receive reports of network connectivity issues.
What action should you prioritize?
</strong>
             <br><br><h7>A. Investigate the connectivity issues to identify the root cause.<br>
B. Inform the network administrator about the reports for resolution.<br>
C. Ignore the reports and hope the issues resolve themselves.<br>
D. Wait for more reports before taking action.<br>
E. Document the issue and any actions taken to resolve it for future reference.

</h7>`,
            options: ["ABCDE", "ACBED", "ADEBC"],
            correctAnswer: "ADEBC",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 6,
            type: "MCQ",
            question: `<strong>You are a customer service manager and receive multiple complaints about long wait
times on the support hotline. What action should you prioritize?
</strong>
             <br><br><h7>A. Review staffing levels and reallocate resources to reduce wait times.<br>
B. Consult with call center experts for strategies to improve efficiency.<br>
C. Ignore the complaints and hope they decrease over time.<br>
D. Wait for more complaints before taking action.<br>
E. Document the complaints and any actions taken for future reference.

</h7>`,
            options: ["ACBED", "CDBEA", "DBECA"],
            correctAnswer: "ACBED",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 7,
            type: "MCQ",
            question: `<strong>You are a facilities manager and discover a safety hazard in the workplace. What is
your immediate action?
</strong>
             <br><br><h7>A. Address the safety hazards to prevent accidents.<br>
B. Inform the safety committee about the hazard for resolution.<br>
C. Ignore the hazard and hope it doesn’t cause harm.<br>
D. Consult with health and safety experts for guidance on addressing the hazard.<br>
E. Document the hazard and any actions taken to address it for future reference.
</h7>`,
            options: ["ADCBE", "ADEBC", "ADBCE"],
            correctAnswer: "ADEBC",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 8,
            type: "MCQ",
            question: `<strong>As a marketing analyst, you discover discrepancies in the data used for a marketing
campaign. What is your next step??</strong>
             <br><br><h7>A. Correct the discrepancies in the data to ensure campaign accuracy.<br>
B. Consult with data experts to validate the accuracy of the data.<br>
C. Ignore the discrepancies and hope they don’t affect campaign performance.<br>
D. Wait for campaign performance metrics to identify the impact of the discrepancies.<br>
E. Document the discrepancies and any corrections made for future reference.
</h7>`,
            options: ["AECBD", "ABCED", "ADCEB"],
            correctAnswer: "AECBD",
            user_ans: "",
            explanation: "",
        },
        {
            Sno: 9,
            type: "MCQ",
            question: `<strong>You are a content editor and notice grammatical errors in a published article. What is
your immediate action?
</strong>
             <br><br><h7>A. Immediately retract the article and issue a corrected version.<br>
B. Inform the content creator about the errors for correction.<br>
C. Ignore the errors and hope readers don’t notice.<br>
D. Consult with the editorial team about the best approach for correction.<br>
E. Document the errors and any corrections made for future reference.
</h7>`,
            options: ["BAECD", "CADEB", "ABDCE"],
            correctAnswer: "ABDCE",
            user_ans: "",
            explanation: "",
        },
        {
            Sno:10,
            type:"MCQ",
            attachement:`\tA.	Immediately reschedule one of the events to avoid conflicts.\n\tB.	Wait until the last minute to see if anyone notices the double booking.\n\tC.	Cancel one of the events and apologize to the affected participants.\n\tD.	Inform your supervisor about the double booking for guidance.\n\tE.	Delegate the task of rescheduling to another team member.
            `,
            question:`<strong>You are a project coordinator and discover that a crucial project document is missing
from the shared drive. What action should you take?</strong>
             <br><br><h7> A. Inform the project team and search for the missing document.<br>
B. Notify the document owner about the missing document for resolution.<br>
C. Consult with the IT department to see if the document can be recovered from backups.<br>
D. Ignore the missing document and hope it turns up eventually.<br>
E. Document the missing document and any recovery efforts for future reference.
</h7>`,
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
            question:`<strong>As a customer success manager, you receive negative feedback from a high-profile
client. How do you respond?
</strong>
             <br><br><h7>A. Reach out to the client to address their concerns and offer solutions.<br>
B. Consult with your manager before responding to the client.<br>
C. Disregard the feedback as an isolated incident.<br>
D. Wait for the client to bring up the feedback again before taking action.<br>
E. Document the feedback and any actions taken to address it for future reference.

</h7>`,
            options : ["AEDCB","ADEBC","AECBD"],
            correctAnswer:"AECBD",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:12,
            type:"MCQ",
            attachement:`\tA.	Immediately reach out to the client to address their concerns and offer solutions.\n\tB.	Disregard the feedback as an isolated incident.\n\tC.	Wait for the client to bring up the feedback again before taking action.\n\tD.	Inform the sales team about the negative feedback for future reference.\n\tE.	Consult with your manager before responding to the client.
            `,
            question:`<strong>You are an operations manager and discover that a key supplier is experiencing
production delays that could affect your company’s production schedule. What is your
immediate action?</strong>
            <br><br><h7> A. Contact the supplier to inquire about the cause of the delays and discuss potential
solutions.<br>
B. Consult with senior management about potential alternative suppliers to mitigate the
impact of the delays.<br>
C. Ignore the supplier’s production delays and hope they resolve the issue internally.<br>
D. Inform the production team about the supplier’s delays for contingency planning.<br>
E. Document the delays and any actions taken to mitigate them for future</h7>`,
            options : ["BACDE","AEDCB","BDCEA"],
            correctAnswer:"AEDCB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:13,
            type:"MCQ",
            attachement:`\tA.	Immediately place orders for replenishing the office supplies.\n\tB.	Wait until supplies are completely depleted before ordering more.\n\tC.	Ignore the low supplies and hope others notice and take action.\n\tD.	Inform department heads about the low supplies for their teams.\n\tE.	Check with other departments to see if they can share their supplies temporarily.
            `,
            question:`<strong>You are an HR manager and discover that an employee's personal information has
been leaked. What is your first step?
</strong>
             <br><br><h7> A. Inform the affected employee immediately and provide support.<br>
B. Conduct an investigation to determine how the leak occurred.<br>
C. Notify senior management and seek guidance.<br>
D. Ignore the issue and hope it doesn’t escalate.<br>
E. Document the incident and the steps taken to address it.
</h7>`,
            options : ["ACBED","CBDEA","ACDEB"],
            correctAnswer:"ACBED",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:14,
            type:"MCQ",
            attachement:`\tA.	Immediately inform the development team to fix the bug.\n\tB.	Ignore the bug and hope it doesn't affect users.\n\tC.	Wait for users to report the bug before taking action.\n\tD.	Inform the project manager about the bug and seek guidance.\n\tE.	Document the bug and its impact for future reference.
            `,
            question:`<strong>As a sales manager, you notice that sales numbers have been declining for the past
three months. What should you do first?
</strong>
             <br><br><h7> A. Analyze sales data to identify trends and issues.<br>
B. Hold a meeting with the sales team to discuss strategies.<br>
C. Consult with marketing to align efforts.<br>
D. Ignore the decline and hope it improves.<br>
E. Document the analysis and strategies discussed for future reference.
</h7>`,
            options : ["ADBEC","CBEAD","CEDBA"],
            correctAnswer:"ADBEC",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:15,
            type:"MCQ",
            attachement:`\tA.	Immediately address the issue with the team and offer support.\n\tB.	Ignore the low morale to avoid confrontation.\n\tC.	Wait for team members to raise concerns before taking action.\n\tD.	Inform senior management about the low morale for intervention.\n\tE.	Organize team-building activities to boost morale.
            `,
            question:`<strong>You are a customer service representative and a customer is furious about a billing
error. What is your immediate action?</strong>
              <br><br><h7> A. Apologize to the customer and offer to correct the error immediately.<br>
B. Ignore the customer’s frustration and proceed with normal protocols.<br>
C. Inform your manager about the situation for guidance.<br>
D. Offer the customer a discount on their next purchase.<br>
E. Document the complaint and the resolution provided.
</h7>`,
            options : ["CEDAB","CADEB","ACBED"],
            correctAnswer:"ACBED",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:16,
            type:"MCQ",
            attachement:`\tA.	Immediately address the safety hazard to prevent accidents.\n\tB.	Ignore the hazard and hope it doesn't cause harm.\n\tC.	Wait for someone else to notice the hazard before taking action.\n\tD.	Inform the safety committee about the hazard for resolution.\n\tE.	Consult with health and safety experts for guidance on addressing the hazard.
            `,
            question:`<strong>You are an office manager and discover that a critical office supply is running low.
What should you do?</strong>
              <br><br><h7> A. Place an order for the supplies immediately.<br>
B. Check with other departments for surplus supplies.<br>
C. Inform staff about the low supplies and ask them to conserve.<br>
D. Ignore the issue and hope it resolves itself.<br>
E. Document the low supplies and steps taken to address the issue.</h7>`,
            options : ["ADEBC","DCEAB","CEBDA"],
            correctAnswer:"ADEBC",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:17,
            type:"MCQ",
            attachement:`\tA.	Immediately remove the inappropriate content and issue an apology.\n\tB.	Ignore the content and hope it goes unnoticed.\n\tC.	Wait for user complaints before taking action.\n\tD.	Inform the content creator about the inappropriate content for correction.\n\tE.	Consult with legal counsel before taking any action.
            `,
            question:`<strong>As a product manager, you receive feedback that a new feature is confusing to users.
What is your first action?
</strong>
              <br><br><h7>A. Review the feedback to understand the specific issues.<br>
B. Consult with the development team to make the feature more user-friendly.<br>
C. Communicate the feedback to the team and propose changes.<br>
D. Ignore the feedback and hope users adapt.<br>
E. Document the feedback and the changes made for future reference.
</h7>`,
            options : ["EBCDA","BEDAC","ACDBE"],
            correctAnswer:"ACDBE",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:18,
            type:"MCQ",
            attachement:`\tA.	Immediately notify the recipient about the delay and provide updates.\n\tB.	Ignore the delay and hope the recipient doesn't notice.\n\tC.	Wait for the recipient to inquire about the delay before taking action.\n\tD.	Inform the shipping carrier about the delay in resolution.\n\tE.	Consult with senior management about potential solutions to expedite the shipment.
            `,
            question:`<strong>You are a team leader and one of your team members reports feeling overwhelmed
with their workload. What should you do first?
</strong>
             <br><br><h7> A. Discuss their workload and find ways to redistribute tasks.<br>
B. Encourage them to manage their time better.<br>
C. Ignore their concerns and ask them to keep working.<br>
D. Provide resources and support to help them manage their workload.<br>
E. Document the discussion and any actions taken to address their concerns
</h7>`,
            options : ["EDBCA","ADECB","CADEB"],
            correctAnswer:"ADECB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:19,
            type:"MCQ",
            attachement:`\tA.	Immediately address the violations to ensure compliance.\n\tB.	Ignore the violations to avoid stirring up trouble.\n\tC.	Wait for regulatory agencies to discover the violations before taking action.\n\tD.	Inform the department heads about the violations for corrective action.\n\tE.	Consult with legal counsel about the best course of action to address the violations.
            `,
            question:`<strong>As a compliance officer, you discover that your company is not adhering to a new
regulation. What is your immediate action?</strong>
             <br><br><h7>A. Inform the relevant department heads and provide guidance on compliance.<br>
B. Conduct a compliance audit to assess the extent of the issue.<br>
C. Ignore the non-compliance and hope it goes unnoticed.<br>
D. Consult with legal counsel about the best course of action.<br>
E. Document the non-compliance and the steps taken to address it.
</h7>`,
            options : ["BADEC","ABDEC","BDCEA"],
            correctAnswer:"ABDEC",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:20,
            type:"MCQ",
            attachement:`\tA.	Immediately inform both parties about the scheduling conflict and reschedule one of the meetings.\n\tB.	Ignore the double booking and hope one of the parties cancels.\n\tC.	Wait for someone else to notice the double booking before taking action.\n\tD.	Inform your supervisor about the scheduling conflict for guidance.\n\tE.	Delegate the task of rescheduling to another team member.
            `,
            question:`<strong>You are a project coordinator and find that the project budget has been exceeded.
What is your first step?</strong>
             <br><br><h7>A. Review the budget to identify areas of overspending.<br>
B. Inform the project stakeholders about the budget overrun.<br>
C. Create a revised budget and seek approval.<br>
D. Ignore the budget overrun and hope it resolves itself.<br>
E. Document the overspending and the revised budget for future reference.
</h7>`,
            options : ["ACEDB","ABDEC","CAEDB"],
            correctAnswer:"ABDEC",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:21,
            type:"MCQ",
            attachement:`\tA.	Immediately investigate the connectivity issues to identify the root cause.\n\tB.	Ignore the reports and hope the issues resolve themselves.\n\tC.	Wait for more reports before taking action.\n\tD.	Inform the network administrator about the reports for resolution.\n\tE.	Consult with external network experts for assistance.
            `,
            question:`<strong>As an IT manager, you discover that an employee has been accessing unauthorized
files. What should you do first?</strong>
             <br><br><h7>A. Investigate the unauthorized access to determine the extent of the breach.<br>
B. Confront the employee about their actions.<br>
C. Inform senior management and seek guidance.<br>
D. Ignore the issue and hope it doesn’t escalate.<br>
E. Document the breach and any actions taken to address it</h7>`,
            options : ["ACDEB","EBCDA","CBEDA"],
            correctAnswer:"ACDEB",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:22,
            type:"MCQ",
            attachement:`\tA.	Immediately correct the discrepancies in the data to ensure campaign accuracy.\n\tB.	Ignore the discrepancies and hope they don't affect campaign performance.\n\tC.	Wait for campaign performance metrics to identify the impact of the discrepancies.\n\tD.	Inform the marketing team about the discrepancies for future campaigns.\n\tE.	Consult with data experts to validate the accuracy of the data.
            `,
            question:`<strong>You are a content manager and notice that a blog post contains outdated information.
What is your first action?</strong>
             <br><br><h7>A. Update the blog post with current information.<br>
B. Inform the content creator about the need for updates.<br>
C. Ignore the outdated information and hope readers don’t notice.<br>
D. Consult with the editorial team about the best approach for updates.<br>
E. Document the updates and any actions taken for future reference.
</h7>`,
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
            question:`<strong>As a logistics coordinator, you find that a shipment has been lost in transit. What is
your immediate action?</strong>
             <br><br><h7>A. Contact the shipping company to investigate the lost shipment.<br>
B. Inform the customer about the lost shipment and offer a solution.<br>
C. Arrange for a replacement shipment immediately.<br>
D. Ignore the issue and hope the shipment is found.<br>
E. Document the lost shipment and any actions taken to resolve it.
</h7>`,
            options : ["BDEAC","ABDEC","BADEC"],
            correctAnswer:"ABDEC",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:24,
            type:"MCQ",
            attachement:`\tA.	Immediately retract the article and issue a corrected version.\n\tB.	Ignore the errors and hope readers don't notice.\n\tC.	Wait for reader feedback before taking action.\n\tD.	Inform the content creator about the errors for correction.\n\tE.	Consult with the editorial team about the best approach for correction.
            `,
            question:`<strong>You are a project manager and discover that your team is not meeting their
productivity targets. What should you do first?
</strong>
             <br><br></h7>A. Review the productivity data to identify the root cause.<br>
B. Hold a meeting with the team to discuss the issue and find solutions.<br>
C. Increase the targets to motivate the team.<br>
D. Ignore the issue and hope it resolves itself.<br>
E. Document the productivity issues and any actions taken to address them.</h7>`,
            options : ["DBAEC","ABDEC","DBEAC"],
            correctAnswer:"ABDEC",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:25,
            type:"MCQ",
            attachement:`\tA.	Immediately inform the project stakeholders about the budget overrun and propose solutions.\n\tB.	Ignore the budget overrun and hope it doesn't impact project outcomes.\n\tC.	Wait for the next budget review meeting before addressing the issue.\n\tD.	Inform the finance department about the budget overrun for assistance.\n\tE.	Consult with the project team to identify areas where expenses can be reduced. 
            `,
            question:`<strong> As a store manager, you notice that thefts have increased recently. What is your first step?</strong>
             <br><br><br><h7>A. Review security footage to identify any suspects.<br>
B. Increase security measures in the store.<br>
C. Inform the staff about the increase in thefts and discuss preventive measures.<br>
D. Ignore the issue and hope it decreases on its own.<br>
E. Document the incidents and any actions taken to address the issue.
</h7> `,
            options : ["ABCDE","ABDEC","ABEDC"],
            correctAnswer:"ABDEC",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:26,
            type:"MCQ",
            attachement:`\tA.	Immediately contact the supplier to inquire about the cause of the delays and discuss potential solutions.\n\tB.	Ignore the supplier's production delays and hope they resolve the issue internally.\n\tC.	Wait for the next scheduled meeting with the supplier before addressing the issue.\n\tD.	Inform the production team about the supplier's delays for contingency planning.\n\tE.	Consult with senior management about potential alternative suppliers to mitigate the impact of the delays.
            `,
            question:`<strong>You are a quality assurance manager and find that a batch of products does not meet
quality standards. What should you do first?</strong>
             <br><br><h7>A. Stop the distribution of the affected batch immediately.<br>
B. Inform the production team and investigate the cause of the issue.<br>
C. Ignore the issue and hope it resolves itself.<br>
D. Consult with senior management about the best course of action.<br>
E. Document the quality issues and any actions taken to resolve them.
</h7>`,
            options : ["ABCDE","ABDEC","ADEBC"],
            correctAnswer:"ABDEC",
            user_ans: "",
            explanation:"",
        },
        {
            Sno:27,
            type:"MCQ",
            attachement:`\tA.	Ignore the reports and hope the situation resolves itself.\n\tB.	Wait for more employees to report incidents before taking action.\n\tC.	Inform the senior team member about the reports and seek their explanation.\n\tD.	Immediately launch an investigation into the reported incidents.\n\tE.	Consult with legal counsel before addressing the reported incidents
            `,
            question:`<strong>As a human resources manager, you discover that an employee has been falsifying
their timesheets. What is your immediate action?</strong>
             <br><br><h7>A. Conduct an investigation to gather evidence.<br>
B. Confront the employee about their actions.<br>
C. Inform senior management and seek guidance.<br>
D. Ignore the issue and hope it resolves itself.<br>
E. Document the falsification and any actions taken to address it.</h7>`,
            options : ["ACDEB","ECDBA","DECBA"],
            correctAnswer:"ACDEB",
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
             <p style="display: flex; align-items: center; ">
        <span style="margin-top:-145px; transform: translateX(-20%);" ><strong>Q${currentQuestionIndex + 1}.</strong></span>
        <span >${q.question}</span>
    </p>
            <div style="margin-left:25px;" class="options-container">${optionsHtml}</div>
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
        finalScoreElement.style.marginLeft = '8%'; // Adjust '20px' as per your need
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
        // showScreen(gameScreen);
        // startTimer();
        // loadQuestion();
        showScreen(instructionScreen);
    });

    continueButton.addEventListener('click', () => {
        showScreen(gameScreen);
        startTimer();
        loadQuestion();
    });

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
    localStorage.setItem('situationalSet3Completed', 'true');
    
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