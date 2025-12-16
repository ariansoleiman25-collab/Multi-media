// script.js - Premium Edition with GSAP

// --- State ---
let currentQuestionIndex = 0;
let score = 0;
let streak = 0; // New Combo Streak
let userAnswers = [];

// --- Config ---
let activeQuestions = questions; // Default to MCQ
let currentMode = 'mcq'; // 'mcq' or 'sa'
const TOTAL_QUESTIONS_MAX = 55; // For progress bar calc
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

const questionWrapper = document.querySelector('.question-wrapper');

// Short Answer Elements
const saContainer = document.getElementById('sa-container');
const saInput = document.getElementById('sa-input');
const saRevealBtn = document.getElementById('sa-reveal-btn');
const saModelAnswer = document.getElementById('sa-model-answer');
const saAnswerText = document.getElementById('sa-answer-text');
const gradeCorrect = document.getElementById('grade-correct');
const gradeWrong = document.getElementById('grade-wrong');

// Streak Element
const streakCounter = document.getElementById('streak-counter');
const streakValue = document.getElementById('streak-value');

// --- Initialization ---
initCursor();
initMagneticButtons();
initRainEffect();
animateIntro();
initRippleEffect(); // New
initTiltEffect();   // New

// --- Event Listeners ---
// --- Event Listeners ---
// Start Buttons (handled inline in HTML or needs selection now)
// We successfully changed HTML to use onclick="startQuiz('mode')", so no listener needed here for start.
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Short Answer Listeners
saRevealBtn.addEventListener('click', revealAnswer);
gradeCorrect.addEventListener('click', () => rateAnswer(true));
gradeWrong.addEventListener('click', () => { rateAnswer(false); sfx.playClick(); });

// Mute Toggle Listener (will be added to HTML)
document.addEventListener('DOMContentLoaded', () => {
    const soundToggle = document.getElementById('sound-toggle');
    if(soundToggle) {
        soundToggle.addEventListener('click', () => {
            sfx.enabled = !sfx.enabled;
            sfx.toggleRain(sfx.enabled); // Actually start/stop rain noise
            soundToggle.classList.toggle('muted', !sfx.enabled);
            soundToggle.innerHTML = sfx.enabled ? 
                '<svg viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-4 0c-4.01.91-7 4.49-7 8.77s2.99 7.86 7 8.77v-2.06c-2.89-.86-5-3.54-5-6.71s2.11-5.85 5-6.71V3.23zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM8 9H5v6h3l5 5V4L8 9z"/></svg>' : 
                '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
            sfx.playClick();
        });
    }
});

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

    let animationId;
    let lastTime = 0;
    const fps = 30; // Throttle to 30fps for performance
    const interval = 1000 / fps;

    function anim(currentTime) {
        if (document.hidden) return; // Stop if hidden

        animationId = requestAnimationFrame(anim);
        
        const delta = currentTime - lastTime;
        if (delta > interval) {
            lastTime = currentTime - (delta % interval);
            
            ctx.clearRect(0, 0, width, height);
            
            // Batch drawing
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
            ctx.lineWidth = 1;

            for (let i = 0; i < maxDrops; i++) {
                const d = drops[i];
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x, d.y + d.l);

                d.y += d.vy;
                if (d.y > height) {
                    d.y = -d.l;
                    d.x = Math.random() * width;
                }
            }
            ctx.stroke(); // Single draw call
        }
    }
    
    // Restart on visibility change
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            cancelAnimationFrame(animationId);
            anim(performance.now());
        }
    });

    anim(performance.now());
    console.log("Custom Rain Engine (Optimized 30fps) Started");
}

// --- Global Auto-Play Logic ---
const attemptAutoPlay = () => {
    if (sfx.ctx.state === 'suspended') sfx.ctx.resume();
    // Try to play rain if not already playing
    if (sfx.enabled && sfx.rainAudio.paused) {
        sfx.toggleRain(true);
        console.log("Auto-Play triggered by interaction");
    }
    // Remove listeners once successful
    ['click', 'keydown', 'touchstart', 'scroll'].forEach(evt => 
        document.removeEventListener(evt, attemptAutoPlay)
    );
};
['click', 'keydown', 'touchstart', 'scroll'].forEach(evt => 
    document.addEventListener(evt, attemptAutoPlay, { once: true, passive: true })
);

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
            duration: 0.1,
            force3D: true
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

function startQuiz(mode = 'mcq') {
    // Start Audio Context & Rain
    if (sfx.ctx.state === 'suspended') sfx.ctx.resume();
    sfx.playClick(); 
    sfx.toggleRain(true); // Ensure rain starts on first interaction
    
    currentMode = mode;
    activeQuestions = (mode === 'mcq') ? questions : shortQuestions;
    
    // Transition out Start Screen
    const tl = gsap.timeline({
        onComplete: () => {
            startScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            gsap.fromTo(quizScreen, { opacity: 0 }, { opacity: 1, duration: 0.5 });
            
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = new Array(activeQuestions.length).fill(null);
            
            showQuestion(activeQuestions[currentQuestionIndex]);
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
    gsap.set('.question-content, .options-grid', { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', clearProps: 'all' });

    // Clear and Rebuild Options - logic proceeds
    
    // MORPH STEP 1: Lock Height
    const startHeight = questionWrapper.offsetHeight;
    questionWrapper.style.height = startHeight + 'px';
    questionWrapper.style.overflow = 'hidden'; // Prevent spill during morph

    // Update Text
    questionText.innerHTML = `<span class="q-num">${question.n}.</span> ${question.q}`;
    questionCount.innerText = `${(currentQuestionIndex + 1).toString().padStart(2, '0')} / ${activeQuestions.length}`;
    scoreDisplay.innerText = `نمرە: ${score}`;
    
    // Animate Progress Bar
    gsap.to(progressBar, {
        width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%`,
        duration: 0.5,
        ease: 'power2.out'
    });

    // Clear and Rebuild Options / SA
    optionsContainer.innerHTML = '';
    saContainer.classList.add('hidden'); // Default hide
    optionsContainer.classList.remove('hidden'); // Default show

    if (currentMode === 'mcq') {
        question.a.forEach((option, index) => {
            const card = document.createElement('div');
            card.classList.add('option-card');
            card.innerHTML = `<div class="index">${String.fromCharCode(65 + index)}</div> ${option}`;
            card.addEventListener('click', () => selectAnswer(index));
            card.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            card.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            optionsContainer.appendChild(card);
        });
    } else {
        // Short Answer Mode
        optionsContainer.classList.add('hidden');
        saContainer.classList.remove('hidden');
        
        // Reset SA UI
        saInput.value = '';
        saModelAnswer.classList.add('hidden');
        saRevealBtn.classList.remove('hidden');
        saAnswerText.innerText = question.a; // Using 'a' from shortQuestions as answer
        
        // Re-enable grading buttons for new question
        saModelAnswer.querySelectorAll('.grade-btn').forEach(btn => btn.disabled = false);
    }

    // MORPH STEP 2: Measure New Height & Animate
    questionWrapper.style.height = 'auto';
    const finalHeight = questionWrapper.offsetHeight;
    questionWrapper.style.height = startHeight + 'px'; // Snap back

    gsap.to(questionWrapper, {
        height: finalHeight,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
             questionWrapper.style.height = 'auto';
             questionWrapper.style.overflow = 'visible';
        }
    });

    // Hide Next Button initially (Logic continues...)
    nextBtn.classList.add('hidden');

    // Animate Elements In
    const tl = gsap.timeline();
    tl.from(questionText, { 
        y: 20, 
        opacity: 0, 
        filter: 'blur(15px)', 
        scale: 0.98,
        duration: 1.5, 
        ease: 'power4.out' 
    });

    if (currentMode === 'mcq') {
        tl.from('.option-card', { 
            opacity: 0, 
            y: 15, 
            filter: 'blur(8px)',
            scale: 0.95,
            stagger: 0.08, 
            duration: 0.6, 
            ease: 'back.out(1.2)',
            clearProps: 'all' 
        }, '-=1.0');
    } else {
        tl.from('.sa-input-group', {
             opacity: 0,
             y: 15,
             filter: 'blur(8px)',
             duration: 1.2,
             ease: 'power3.out'
        }, '-=1.0');
    }
}

function revealAnswer() {
    saInput.blur(); // dismiss keyboard
    saRevealBtn.classList.add('hidden');
    saModelAnswer.classList.remove('hidden');

    // MORPH: Measure Start Height
    const startHeight = questionWrapper.offsetHeight;
    questionWrapper.style.height = startHeight + 'px';
    questionWrapper.style.overflow = 'hidden';

    // MORPH: Measure Final Height (temporarily allow auto flow)
    questionWrapper.style.height = 'auto'; // allow expansion
    const finalHeight = questionWrapper.offsetHeight;
    questionWrapper.style.height = startHeight + 'px'; // snap back

    // 1. Animate Container Height
    gsap.to(questionWrapper, {
        height: finalHeight,
        duration: 0.8, // Match slower morph
        ease: 'power2.inOut',
        onComplete: () => {
             questionWrapper.style.height = 'auto';
             questionWrapper.style.overflow = 'visible';
        }
    });
    
    // 2. Animate Content In
    gsap.from(saModelAnswer, {
        height: 0, 
        opacity: 0,
        y: 10,
        filter: 'blur(5px)', 
        duration: 1.0, 
        ease: 'power4.out',
        clearProps: 'height',
        onStart: () => sfx.playClick() // Sound on reveal
    });
}

function rateAnswer(isCorrect) {
    if (userAnswers[currentQuestionIndex] !== null) return;
    
    userAnswers[currentQuestionIndex] = isCorrect ? 1 : 0; // Simple binary tracking
    if (isCorrect) {
        score++;
        streak++; // Streak Up
        sfx.playCorrect();
    } else {
        streak = 0; // Streak Reset
        sfx.playWrong();
    }
    
    scoreDisplay.innerText = `نمرە: ${score}`;
    updateStreakUI(); // Update Visuals
    
    // Auto-advance or show next button? 
    // Let's mimic selectAnswer behavior - shows Next Button
    saModelAnswer.querySelectorAll('.grade-btn').forEach(btn => btn.disabled = true);
    
    nextBtn.classList.remove('hidden');
    gsap.fromTo(nextBtn, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
    );
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
        streak++; // Streak Up
        sfx.playCorrect();
        // Pulse animation for correct
        gsap.to(cards[selectedIndex], { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1 });
    } else {
        cards[selectedIndex].classList.add('wrong');
        streak = 0; // Streak Reset
        sfx.playWrong();
        gsap.to(cards[selectedIndex], { x: 10, duration: 0.1, yoyo: true, repeat: 3 }); // Shane animation
        
        // Highlight correct one
        if (correctIndex !== -1 && correctIndex < cards.length) {
            cards[correctIndex].classList.add('correct');
        }
    }
    
    scoreDisplay.innerText = `نمرە: ${score}`;
    updateStreakUI(); // Update Visuals

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
            if (currentQuestionIndex < activeQuestions.length) {
                showQuestion(activeQuestions[currentQuestionIndex]);
            } else {
                showResultsScreen();
            }
        }
    });

    tl.to('.question-content, .options-grid', {
        y: -20,
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.95,
        duration: 0.5,
        ease: 'power2.in'
    });
}

function showResultsScreen() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    gsap.fromTo(resultScreen, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    
    // Animate Score Ring
    const percentage = score / activeQuestions.length;
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
    if (percentage >= 0.9) {
        resultMessage.innerText = "!نایابە، تۆ شارەزایت";
        triggerConfetti();
    }
    else if (percentage >= 0.7) {
        resultMessage.innerText = "!کارێکی نایاب";
        triggerConfetti();
    }
    else if (percentage >= 0.5) resultMessage.innerText = ".باشە، بەڵام هەوڵی زیاتر بدە";
    else resultMessage.innerText = ".بەردەوام بە لە هەوڵدان";

    // Initialize Review
    renderReview();
}

function triggerConfetti() {
    // Colors for the explosion
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    // Use DOM elements for confetti to avoid Canvas conflicts with Rain
    const container = document.body;
    const fragment = document.createDocumentFragment(); // Batch updates
    
    for (let i = 0; i < 100; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'fixed';
        conf.style.left = '50%';
        conf.style.top = '50%';
        conf.style.width = '8px';
        conf.style.height = '8px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.pointerEvents = 'none';
        conf.style.zIndex = '9999';
        conf.style.willChange = 'transform, opacity'; // Hardware Accel hint
        fragment.appendChild(conf);
        
        const destX = (Math.random() - 0.5) * window.innerWidth;
        const destY = (Math.random() - 0.5) * window.innerHeight;
        
        gsap.to(conf, {
            x: destX,
            y: destY,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 2 + Math.random(),
            ease: 'power4.out',
            onComplete: () => conf.remove()
        });
    }
    container.appendChild(fragment); // Single reflow
}

function renderReview() {
    saModelAnswer.querySelectorAll('.grade-btn').forEach(btn => btn.disabled = false); // Reset grading buttons
    
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = ''; // Clear previous

    if (currentMode === 'mcq') {
        activeQuestions.forEach((q, index) => {
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
                            <span class="badge badge-correct">وەڵامەکەت</span>
                            <span class="answer-text">${userOptionText}</span>
                        </div>
                     `;
                 } else {
                     feedbackHTML = `
                        <div class="feedback-row">
                            <span class="badge badge-wrong">وەڵامەکەت</span>
                            <span class="answer-text">${userOptionText}</span>
                        </div>
                        <div class="feedback-row">
                            <span class="badge badge-correct">وەڵامی ڕاست</span>
                            <span class="answer-text">${correctOptionText}</span>
                        </div>
                     `;
                 }
            } else {
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
    } else {
         reviewContainer.innerHTML = '<p style="text-align:center; color:white;">پێداچوونەوە بەردەست نییە بۆ وەڵامی کورت.</p>';
    }
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

// --- Sound Effects Manager (Web Audio API) ---
class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = 0.5;
        this.enabled = true;
        
        // MP3 Rain Audio (User Requested)
        this.rainAudio = new Audio('rain.mp3');
        this.rainAudio.loop = true;
        this.rainAudio.volume = 0.5; 
    }

    playTone(freq, type, duration, vol = 1) {
        if (!this.enabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.type = type;
        
        gain.gain.setValueAtTime(vol * this.masterVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playClick() {
        // High, short blip
        this.playTone(800, 'sine', 0.1, 0.3);
    }

    playCorrect() {
        // Major chord arpeggio
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, i) => { // C Major
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0, now + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.3 * this.masterVolume, now + i * 0.1 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.5);
        });
    }

    playWrong() {
        // Soft low thud (Sine wave slide down)
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3); // Pitch drop
        osc.type = 'sine'; // Soft wave
        
        gain.gain.setValueAtTime(0.3 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }

    toggleRain(enable) {
        if (enable && this.enabled) {
            // Play MP3
            this.rainAudio.play().catch(e => console.log("Audio play failed (interaction needed):", e));
        } else {
            // Stop MP3
            this.rainAudio.pause();
            this.rainAudio.currentTime = 0; // Reset to start (optional)
        }
    }
}

const sfx = new SoundManager();


// --- Visual Polish Functions ---

function initRippleEffect() {
    document.addEventListener('click', (e) => {
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        document.body.appendChild(ripple);
        
        // Position at cursor
        const size = 100; // base size
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - size/2) + 'px';
        ripple.style.top = (e.clientY - size/2) + 'px';
        
        // Auto remove
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
}

function initTiltEffect() {
    // Desktop Mouse Tilt
    document.addEventListener('mousemove', (e) => {
        if (questionWrapper) {
            const rect = questionWrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from center (normalized -1 to 1)
            const x = (e.clientX - centerX) / (window.innerWidth / 2);
            const y = (e.clientY - centerY) / (window.innerHeight / 2);
            
            // Apply tilt (Max 5 degrees)
            gsap.to(questionWrapper, {
                rotationY: x * 5, 
                rotationX: -y * 5,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        }
    });
    
    // Mobile Touch Tilt (simpler)
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0 && questionWrapper) {
             const touch = e.touches[0];
             const rect = questionWrapper.getBoundingClientRect();
             const centerX = rect.left + rect.width / 2;
             const centerY = rect.top + rect.height / 2;
             
             const x = (touch.clientX - centerX) / (window.innerWidth / 2);
             const y = (touch.clientY - centerY) / (window.innerHeight / 2);
             
             gsap.to(questionWrapper, {
                rotationY: x * 8, // More sensitive on mobile
                rotationX: -y * 8,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        }
    });

    document.addEventListener('touchend', () => {
         gsap.to(questionWrapper, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
}

function updateStreakUI() {
    streakValue.innerText = streak;
    
    if (streak >= 2) {
        streakCounter.classList.remove('hidden');
        
        // Intensify logic
        if (streak >= 5) {
            streakCounter.classList.add('super-streak');
            streakCounter.classList.remove('high-streak');
        } else if (streak >= 3) {
            streakCounter.classList.add('high-streak');
            streakCounter.classList.remove('super-streak');
        } else {
             streakCounter.classList.remove('high-streak', 'super-streak');
        }
        
        // Pop animation
        gsap.fromTo(streakCounter, 
            { scale: 1.5 },
            { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
        );
    } else {
        streakCounter.classList.add('hidden');
    }
}

