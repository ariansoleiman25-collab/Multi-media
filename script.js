// script.js - Premium Edition with GSAP

// --- State ---
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// --- Config ---
const TOTAL_QUESTIONS = questions.length;
const CIRCUMFERENCE = 2 * Math.PI * 90; // for SVG circle

// --- Elements ---
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const questionCount = document.getElementById('question-count');
const scoreDisplay = document.getElementById('score-display');
const finalScore = document.getElementById('final-score');
const scoreRingCircle = document.getElementById('score-ring-circle');
const resultMessage = document.getElementById('result-message');

// --- Initialization ---
initCursor();
initMagneticButtons();
initRainEffect();
animateIntro();

// --- Event Listeners ---
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// --- Functions ---

function init3DBackground() {
    // Legacy holder
}

function initRainEffect() {
    const canvas = document.getElementById('rain-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Handle Resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const drops = [];
    const maxDrops = 100;

    for (let i = 0; i < maxDrops; i++) {
        drops.push({
            x: Math.random() * width,
            y: Math.random() * height,
            l: Math.random() * 10 + 10, // length
            vy: Math.random() * 5 + 10, // speed
            o: Math.random() * 0.5 + 0.2 // opacity
        });
    }

    function anim() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw Gradient Background manually if needed, or let CSS handle it.
        // CSS handles bg color, we just draw rain.
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Light rain color
        ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)'; // Blue-ish tint
        ctx.lineWidth = 1;

        drops.forEach(d => {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x, d.y + d.l);
            ctx.strokeStyle = `rgba(255, 255, 255, ${d.o})`;
            ctx.stroke();

            d.y += d.vy;
            if (d.y > height) {
                d.y = -d.l;
                d.x = Math.random() * width;
            }
        });
        
        requestAnimationFrame(anim);
    }
    
    anim();
    
    console.log("Custom Rain Engine Started");
}

function initCursor() {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate cursor movement
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.1
        });
    });

    // Smooth follower movement
    gsap.ticker.add(() => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        gsap.set(cursorFollower, {
            x: followerX,
            y: followerY
        });
    });

    // Hover effects on clickable items
    const clickables = document.querySelectorAll('button, .option-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

function initMagneticButtons() {
    const magnets = document.querySelectorAll('.magnetic-btn');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

function animateIntro() {
    const tl = gsap.timeline();
    
    tl.from('.pill-badge', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.hero-title span', { y: 100, opacity: 0, stagger: 0.1, duration: 1, ease: 'power4.out' }, '-=0.5')
      .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('#start-btn', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5');
}

function startQuiz() {
    // Transition out Start Screen
    const tl = gsap.timeline({
        onComplete: () => {
            startScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            gsap.fromTo(quizScreen, { opacity: 0 }, { opacity: 1, duration: 0.5 });
            
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = new Array(TOTAL_QUESTIONS).fill(null);
            
            showQuestion(questions[currentQuestionIndex]);
        }
    });
    
    tl.to('#start-screen .hero-content > *', {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.in'
    });
}

function showQuestion(question) {
    // RESET PARENT CONTAINERS (Fix for "Next" button hiding them)
    gsap.set('.question-content, .options-grid', { opacity: 1, y: 0, clearProps: 'all' });

    // Update Text
    questionText.innerHTML = `<span class="q-num">${question.n}.</span> ${question.q}`;
    // Convert to Eastern Arabic numerals if you want, but Standard numerals are often used in tech. 
    // Let's stick to standard for the numbers to match the data, but translate the static text.
    questionCount.innerText = `${(currentQuestionIndex + 1).toString().padStart(2, '0')} / ${TOTAL_QUESTIONS}`;
    scoreDisplay.innerText = `نمرە: ${score}`;
    
    // Animate Progress Bar
    gsap.to(progressBar, {
        width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%`,
        duration: 0.5,
        ease: 'power2.out'
    });

    // Clear and Rebuild Options
    optionsContainer.innerHTML = '';
    
    question.a.forEach((option, index) => {
        const card = document.createElement('div');
        card.classList.add('option-card');
        card.innerHTML = `<div class="index">${String.fromCharCode(65 + index)}</div> ${option}`;
        card.addEventListener('click', () => selectAnswer(index));
        // Add hover listener for cursor
        card.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        card.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        
        optionsContainer.appendChild(card);
    });

    // Hide Next Button initially
    nextBtn.classList.add('hidden');

    // Animate Elements In
    const tl = gsap.timeline();
    tl.from(questionText, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' })
      .from('.option-card', { 
          opacity: 0, 
          y: 20, 
          stagger: 0.1, 
          duration: 0.4, 
          clearProps: 'all' // Ensure props are cleared after animation to prevent "stuck" states
      }, '-=0.3');
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (userAnswers[currentQuestionIndex] !== null) return; // Prevent re-answering
    
    userAnswers[currentQuestionIndex] = selectedIndex;
    
    const cards = document.querySelectorAll('.option-card');
    const correctIndex = typeof question.correct === 'number' 
        ? question.correct 
        : getCorrectIndexFromChar(question.correct);

    // Styling
    if (selectedIndex === correctIndex) {
        cards[selectedIndex].classList.add('correct');
        score++;
        // Pulse animation for correct
        gsap.to(cards[selectedIndex], { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1 });
    } else {
        cards[selectedIndex].classList.add('wrong');
        gsap.to(cards[selectedIndex], { x: 10, duration: 0.1, yoyo: true, repeat: 3 }); // Shane animation
        
        // Highlight correct one
        if (correctIndex !== -1 && correctIndex < cards.length) {
            cards[correctIndex].classList.add('correct');
        }
    }
    
    scoreDisplay.innerText = `نمرە: ${score}`;

    // Show Next Button
    nextBtn.classList.remove('hidden');
    gsap.fromTo(nextBtn, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
    );
}

function loadNextQuestion() {
    // Animate Out
    const tl = gsap.timeline({
        onComplete: () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < TOTAL_QUESTIONS) {
                showQuestion(questions[currentQuestionIndex]);
            } else {
                showResultsScreen();
            }
        }
    });

    tl.to('.question-content, .options-grid', {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
    });
}

function showResultsScreen() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    gsap.fromTo(resultScreen, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    
    // Animate Score Ring
    const percentage = score / TOTAL_QUESTIONS;
    const offset = CIRCUMFERENCE - (percentage * CIRCUMFERENCE);
    
    gsap.to(scoreRingCircle, {
        strokeDashoffset: offset,
        duration: 2,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Count up score
    gsap.fromTo(finalScore, 
        { innerText: 0 }, 
        { 
            innerText: score, 
            duration: 2, 
            snap: { innerText: 1 }, 
            ease: 'power3.out' 
        }
    );

    // Text animations
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from('.result-title', { y: 30, opacity: 0, duration: 0.6 })
      .from('.result-msg', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('#restart-btn', { scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4');
      
    // Set Message
    if (percentage >= 0.9) resultMessage.innerText = "!نایابە، تۆ شارەزایت";
    else if (percentage >= 0.7) resultMessage.innerText = "!کارێکی نایاب";
    else if (percentage >= 0.5) resultMessage.innerText = ".باشە، بەڵام هەوڵی زیاتر بدە";
    else resultMessage.innerText = ".بەردەوام بە لە هەوڵدان";

    // Initialize Review
    renderReview();
}

function renderReview() {
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = ''; // Clear previous

    questions.forEach((q, index) => {
        const userIndex = userAnswers[index];
        const correctIndex = typeof q.correct === 'number' ? q.correct : getCorrectIndexFromChar(q.correct);
        
        const isCorrect = userIndex === correctIndex;
        
        // Generate Question Item
        const item = document.createElement('div');
        item.classList.add('review-item');
        
        let feedbackHTML = '';
        
        // If user answered
        if (userIndex !== null && userIndex !== undefined) {
             const userOptionText = q.a[userIndex];
             const correctOptionText = q.a[correctIndex];

             if (isCorrect) {
                 feedbackHTML = `
                    <div class="feedback-row">
                        <span class="badge badge-correct">You Answered</span>
                        <span class="answer-text">${userOptionText}</span>
                    </div>
                 `;
             } else {
                 feedbackHTML = `
                    <div class="feedback-row">
                        <span class="badge badge-wrong">You Answered</span>
                        <span class="answer-text">${userOptionText}</span>
                    </div>
                    <div class="feedback-row">
                        <span class="badge badge-correct">Correct Answer</span>
                        <span class="answer-text">${correctOptionText}</span>
                    </div>
                 `;
             }
        } else {
             // Unanswered (shouldn't happen in this flow but safety check)
             feedbackHTML = `<div class="feedback-row"><span class="badge badge-wrong">Skipped</span></div>`;
        }

        item.innerHTML = `
            <div class="review-question"><strong>${index + 1}.</strong> ${q.q}</div>
            <div class="review-feedback">
                ${feedbackHTML}
            </div>
        `;
        
        reviewContainer.appendChild(item);
    });
}

function restartQuiz() {
    // Transition back to start
    const tl = gsap.timeline({
        onComplete: () => {
            resultScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
            gsap.set('#score-ring-circle', { strokeDashoffset: CIRCUMFERENCE }); // Reset ring
            
            // RESET START SCREEN ELEMENTS
            gsap.set('#start-screen .hero-content > *', { opacity: 1, y: 0, clearProps: 'all' });
            
            animateIntro();
        }
    });
    
    tl.to('#result-screen .result-content > *', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.in'
    });
}

function getCorrectIndexFromChar(char) {
    if (!char) return -1;
    const map = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    return map[char] !== undefined ? map[char] : -1;
}
