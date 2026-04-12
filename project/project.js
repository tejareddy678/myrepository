let currentPosition = 0;
let userAnswers = new Array(15).fill(null);
let flaggedQuestions = new Array(15).fill(false);
let warningsCount = 0;
const MAX_WARNINGS = 3;
let timerSeconds = 600; 

const questionsData = [
    { q: "What is HTML?", options: ["Markup Language", "Database", "OS", "Compiler"], answer: 0 },
    { q: "CSS is used for?", options: ["Logic", "Styling", "Database", "Server"], answer: 1 },
    { q: "SQL stands for?", options: ["Structured Query Language", "Simple Query List", "System Query Language", "None"], answer: 0 },
    { q: "Which tag is used for links?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
    { q: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "bgcolor"], answer: 2 },
    { q: "JavaScript is?", options: ["Compiled", "Interpreted", "Database", "Styling"], answer: 1 },
    { q: "Which is NOT a JS framework?", options: ["React", "Angular", "Vue", "MySQL"], answer: 3 },
    { q: "Which SQL command retrieves data?", options: ["GET", "SELECT", "FETCH", "RETRIEVE"], answer: 1 },
    { q: "Which HTML tag is for images?", options: ["<img>", "<image>", "<src>", "<pic>"], answer: 0 },
    { q: "Which CSS is priority?", options: ["Inline", "External", "Internal", "None"], answer: 0 },
    { q: "Which symbol is used for comments in JS?", options: ["//", "<!-- -->", "#", "/* */"], answer: 0 },
    { q: "Which database is used with XAMPP?", options: ["MongoDB", "MySQL", "Oracle", "PostgreSQL"], answer: 1 },
    { q: "Which method sends data to server?", options: ["FETCH", "POST", "GET", "Both POST & GET"], answer: 3 },
    { q: "Which is backend language?", options: ["HTML", "CSS", "JavaScript", "PHP"], answer: 3 },
    { q: "Which tag creates input field?", options: ["<input>", "<form>", "<field>", "<textbox>"], answer: 0 }
];

function init() {
    if (window.location.protocol === 'file:') {
        alert("CRITICAL WARNING: The portal is opened via 'file://'. \n\nPLEASE USE: http://localhost/project/project.html \n\nDirect file access will block the database connection.");
    }
    renderNavigation();
    renderQuestion();
    startTimer();
    startCamera();
    updateProgress();
}

function renderNavigation() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;
    sidebar.innerHTML = "";
    questionsData.forEach((_, i) => {
        let statusClass = "";
        if (i === currentPosition) statusClass = "active";
        else if (flaggedQuestions[i]) statusClass = "review";
        else if (userAnswers[i] !== null) statusClass = "answered";
        sidebar.innerHTML += `<div class="q-num ${statusClass}" onclick="jumpTo(${i})">${i + 1}</div>`;
    });
}

function jumpTo(index) {
    if (index < 0 || index >= questionsData.length) return;
    currentPosition = index;
    renderQuestion();
    renderNavigation();
}

function renderQuestion() {
    const qData = questionsData[currentPosition];
    const quizDiv = document.getElementById("quiz");
    if (!quizDiv || !qData) return;
    const options = qData.options || [];
    quizDiv.innerHTML = `
        <div class="question-box">
            <h3>${currentPosition + 1}. ${qData.q}</h3>
            <div class="options-list">
                ${options.map((opt, i) => `
                    <div class="option ${userAnswers[currentPosition] === i ? 'selected' : ''}" onclick="selectOption(${i})">
                        <div class="option-marker"></div>
                        <span>${opt}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        if (currentPosition === questionsData.length - 1) {
            nextBtn.innerHTML = `Review & Final Submit <span class="material-icons">send</span>`;
            nextBtn.onclick = confirmSubmit;
        } else {
            nextBtn.innerHTML = `Next Question <span class="material-icons">arrow_forward</span>`;
            nextBtn.onclick = nextQuestion;
        }
    }
}

function selectOption(index) {
    userAnswers[currentPosition] = index;
    renderQuestion();
    renderNavigation();
    updateProgress();
}

function toggleFlag() {
    flaggedQuestions[currentPosition] = !flaggedQuestions[currentPosition];
    renderNavigation();
}

function nextQuestion() {
    if (currentPosition < questionsData.length - 1) jumpTo(currentPosition + 1);
}

function prevQuestion() {
    if (currentPosition > 0) jumpTo(currentPosition - 1);
}

function updateProgress() {
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const badge = document.getElementById("answered-badge");
    if (badge) badge.innerText = `${answeredCount}/${questionsData.length}`;
}

function confirmSubmit() {
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const modalCount = document.getElementById("modal-q-count");
    if (modalCount) modalCount.innerText = answeredCount;
    const modal = document.getElementById("submit-modal");
    if (modal) modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("submit-modal");
    if (modal) modal.style.display = "none";
}

async function submitExam() {
    let score = 0;
    questionsData.forEach((q, i) => {
        if (userAnswers[i] === q.answer) score++;
    });

    try {
        const response = await fetch('project.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score })
        });
        const text = await response.text();
        let result;
        try { result = JSON.parse(text); } catch (e) { throw new Error("Server returned non-JSON response: " + text); }
        if (response.ok && result.status === "success") {
            showResultsScreen(score);
        } else {
            throw new Error(result.message || "Failed to communicate with Database.");
        }
    } catch (err) {
        alert("ERROR: " + err.message + "\n\n1. Check XAMPP Apache.\n2. Use http://localhost/project/project.html\n3. Check your MySQL Connection.");
    }
}

function showResultsScreen(score) {
    document.body.innerHTML = `
        <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f172a; color: white; text-align: center; font-family: 'Outfit', sans-serif;">
            <div style="background: #1e293b; padding: 60px; border-radius: 40px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 40px 80px rgba(0,0,0,0.6);">
                <span class="material-icons" style="font-size: 100px; color: #10b981; margin-bottom: 20px;">task_alt</span>
                <h1 style="font-size: 40px; font-weight: 800; margin-bottom: 10px;">Submission Success!</h1>
                <p style="color: #94a3b8; font-size: 18px; margin-bottom: 40px;">Your responses have been securely archived in the database.</p>
                <div style="font-size: 72px; font-weight: 900; color: #7c3aed; line-height: 1;">${score}/${questionsData.length}</div>
                <p style="margin-top: 15px; font-weight: 600; opacity: 0.6; text-transform: uppercase; letter-spacing: 2px;">Final Score</p>
                <button onclick="location.reload()" style="margin-top: 50px; background: #7c3aed; color: white; border: none; padding: 16px 40px; border-radius: 16px; font-weight: 700; cursor: pointer; transition: 0.3s;">Close Session</button>
            </div>
        </div>`;
}

function startTimer() {
    const timerElement = document.getElementById("timer");
    const widget = document.getElementById("timer-widget");
    if (!timerElement) return;
    const interval = setInterval(() => {
        let mins = Math.floor(timerSeconds / 60);
        let secs = timerSeconds % 60;
        timerElement.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        if (timerSeconds <= 60 && widget) {
            widget.style.background = "rgba(239, 68, 68, 0.2)";
            widget.style.borderColor = "#ef4444";
        }
        if (timerSeconds <= 0) { clearInterval(interval); submitExam(); }
        timerSeconds--;
    }, 1000);
}

function handleWarning(msg) {
    warningsCount++;
    if (warningsCount >= MAX_WARNINGS) {
        alert("Multiple Violations Detected. Automatic Submission Triggered.");
        submitExam();
    } else {
        alert(`SECURITY BREACH (${warningsCount}/${MAX_WARNINGS}): ${msg}`);
        if (!document.fullscreenElement) enterFullscreen();
    }
}

function enterFullscreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
}

document.addEventListener("visibilitychange", () => { if (document.hidden) handleWarning("Window Switch Detected"); });
document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) handleWarning("Security Mode Exit Detected"); });

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const camEl = document.getElementById("camera");
        if (camEl) camEl.srcObject = stream;
    } catch { console.warn("Monitoring camera unavailable"); }
}

window.addEventListener('load', init);
document.body.addEventListener('click', () => enterFullscreen(), { once: true });