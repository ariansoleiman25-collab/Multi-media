// ============================================
// PREMIUM QUIZ - Kurdish Sorani Edition
// ============================================

// --- State ---
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let userAnswers = [];

// --- Config ---
let activeQuestions = questions;
let currentMode = 'mcq';
const CIRCUMFERENCE = 2 * Math.PI * 90;

// --- Elements ---
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
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
const questionContent = document.querySelector('.question-content');

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

// --- Sound Manager ---
class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = 0.35;
        this.enabled = true;
        
        this.rainAudio = new Audio('rain.mp3');
        this.rainAudio.loop = true;
        this.rainAudio.volume = 0.25;
    }

    playTone(freq, type, duration, vol = 1) {
        if (!this.enabled || this.ctx.state === 'suspended') return;
        
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
        this.playTone(600, 'sine', 0.06, 0.2);
    }

    playCorrect() {
        if (!this.enabled) return;
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0, now + i * 0.07);
            gain.gain.linearRampToValueAtTime(0.2 * this.masterVolume, now + i * 0.07 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.07);
            osc.stop(now + i * 0.07 + 0.3);
        });
    }

    playWrong() {
        if (!this.enabled) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.15 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
    }

    toggleRain(enable) {
        if (enable && this.enabled) {
            this.rainAudio.play().catch(() => {});
        } else {
            this.rainAudio.pause();
        }
    }
}

const sfx = new SoundManager();

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initMagneticButtons();
    initRainEffect();
    initRippleEffect();
    initTiltEffect();
    animateIntro();
    
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            sfx.enabled = !sfx.enabled;
            sfx.toggleRain(sfx.enabled);
            soundToggle.classList.toggle('muted', !sfx.enabled);
            sfx.playClick();
        });
    }
});

// Event Listeners
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', restartQuiz);
saRevealBtn.addEventListener('click', revealAnswer);
gradeCorrect.addEventListener('click', () => rateAnswer(true));
gradeWrong.addEventListener('click', () => rateAnswer(false));

// Auto-play audio
const attemptAutoPlay = () => {
    if (sfx.ctx.state === 'suspended') sfx.ctx.resume();
    if (sfx.enabled && sfx.rainAudio.paused) sfx.toggleRain(true);
    ['click', 'keydown', 'touchstart'].forEach(evt => 
        document.removeEventListener(evt, attemptAutoPlay)
    );
};
['click', 'keydown', 'touchstart'].forEach(evt => 
    document.addEventListener(evt, attemptAutoPlay, { once: true, passive: true })
);

// ============================================
// CURSOR
// ============================================

function initCursor() {
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.08, ease: 'power2.out' });
    });

    gsap.ticker.add(() => {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        gsap.set(cursorFollower, { x: followerX, y: followerY });
    });

    const addHoverListeners = () => {
        document.querySelectorAll('button, .option-card, a').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    };
    addHoverListeners();
    
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================

function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.25, ease: 'power2.out' });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
    });
}

// ============================================
// RAIN EFFECT
// ============================================

function initRainEffect() {
    const canvas = document.getElementById('rain-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const drops = [];
    const maxDrops = 70;

    for (let i = 0; i < maxDrops; i++) {
        drops.push({
            x: Math.random() * width,
            y: Math.random() * height,
            l: Math.random() * 12 + 6,
            vy: Math.random() * 3 + 6,
        });
    }

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    function animate(currentTime) {
        if (document.hidden) {
            requestAnimationFrame(animate);
            return;
        }

        const delta = currentTime - lastTime;
        if (delta > interval) {
            lastTime = currentTime - (delta % interval);
            
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = 'rgba(140, 170, 210, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();

            for (const d of drops) {
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x, d.y + d.l);
                d.y += d.vy;
                if (d.y > height) {
                    d.y = -d.l;
                    d.x = Math.random() * width;
                }
            }
            ctx.stroke();
        }
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}

// ============================================
// RIPPLE EFFECT
// ============================================

function initRippleEffect() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.width = ripple.style.height = '80px';
        ripple.style.left = (e.clientX - 40) + 'px';
        ripple.style.top = (e.clientY - 40) + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// ============================================
// 3D TILT EFFECT
// ============================================

function initTiltEffect() {
    if (!questionContent) return;
    
    const handleMove = (e) => {
        const rect = questionContent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const rotateX = ((clientY - centerY) / rect.height) * -6;
        const rotateY = ((clientX - centerX) / rect.width) * 6;
        
        gsap.to(questionContent, { rotateX, rotateY, duration: 0.3, ease: 'power2.out' });
    };
    
    const handleLeave = () => {
        gsap.to(questionContent, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    };
    
    document.addEventListener('mousemove', (e) => {
        if (questionContent.matches(':hover')) handleMove(e);
    });
    
    questionContent.addEventListener('mouseleave', handleLeave);
    questionContent.addEventListener('touchmove', handleMove);
    questionContent.addEventListener('touchend', handleLeave);
}

// ============================================
// INTRO ANIMATION
// ============================================

function animateIntro() {
    gsap.from('.hero-title span', { 
        y: 40, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.7, 
        ease: 'power3.out',
        delay: 0.1
    });
    
    gsap.from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.3
    });
    
    gsap.from('.mode-select .magnetic-btn', { 
        y: 20, 
        duration: 0.5, 
        ease: 'power2.out',
        delay: 0.4
    });
}

// ============================================
// QUIZ LOGIC
// ============================================

function startQuiz(mode = 'mcq') {
    if (sfx.ctx.state === 'suspended') sfx.ctx.resume();
    sfx.playClick();
    sfx.toggleRain(true);
    
    currentMode = mode;
    activeQuestions = (mode === 'mcq') ? questions : (shortQuestions || []);
    
    const tl = gsap.timeline({
        onComplete: () => {
            startScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            
            gsap.fromTo(quizScreen, 
                { opacity: 0, y: 15 }, 
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
            
            currentQuestionIndex = 0;
            score = 0;
            streak = 0;
            userAnswers = new Array(activeQuestions.length).fill(null);
            
            showQuestion(activeQuestions[currentQuestionIndex]);
        }
    });
    
    tl.to('.hero-content > *', {
        y: -30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.35,
        ease: 'power2.in'
    });
}

// Convert number to Kurdish/Arabic numerals
function toKurdishNum(num) {
    const kurdishNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).split('').map(d => kurdishNums[parseInt(d)] || d).join('');
}

function showQuestion(question) {
    gsap.set(['.question-content', '.options-grid', '#options-container'], { clearProps: 'all' });
    
    questionText.innerHTML = `<span class="q-num">${question.n}.</span> ${question.q}`;
    questionCount.innerText = `${toKurdishNum(String(currentQuestionIndex + 1).padStart(2, '0'))} / ${toKurdishNum(activeQuestions.length)}`;
    scoreDisplay.innerText = `نمرە: ${toKurdishNum(score)}`;
    
    gsap.to(progressBar, {
        width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%`,
        duration: 0.5,
        ease: 'power2.out'
    });

    optionsContainer.innerHTML = '';
    saContainer.classList.add('hidden');
    optionsContainer.classList.remove('hidden');

    if (currentMode === 'mcq') {
        question.a.forEach((option, index) => {
            const card = document.createElement('div');
            card.classList.add('option-card');
            card.innerHTML = `<div class="index">${String.fromCharCode(65 + index)}</div><span>${option}</span>`;
            card.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(card);
        });
    } else {
        optionsContainer.classList.add('hidden');
        saContainer.classList.remove('hidden');
        saInput.value = '';
        saModelAnswer.classList.add('hidden');
        saRevealBtn.classList.remove('hidden');
        saAnswerText.innerText = question.a;
        saModelAnswer.querySelectorAll('.grade-btn').forEach(btn => btn.disabled = false);
    }

    nextBtn.classList.add('hidden');

    const tl = gsap.timeline();
    tl.from(questionText, { y: 20, opacity: 0, filter: 'blur(8px)', duration: 0.6, ease: 'power3.out' });

    if (currentMode === 'mcq') {
        tl.from('.option-card', { 
            opacity: 0, 
            y: 15, 
            scale: 0.97,
            stagger: 0.08, 
            duration: 0.4, 
            ease: 'back.out(1.3)',
            clearProps: 'all'
        }, '-=0.3');
    }
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (userAnswers[currentQuestionIndex] !== null) return;
    
    userAnswers[currentQuestionIndex] = selectedIndex;
    
    const cards = document.querySelectorAll('.option-card');
    const correctIndex = typeof question.correct === 'number' 
        ? question.correct 
        : getCorrectIndexFromChar(question.correct);

    if (selectedIndex === correctIndex) {
        cards[selectedIndex].classList.add('correct');
        score++;
        streak++;
        sfx.playCorrect();
        gsap.to(cards[selectedIndex], { scale: 1.02, duration: 0.12, yoyo: true, repeat: 1 });
    } else {
        cards[selectedIndex].classList.add('wrong');
        streak = 0;
        sfx.playWrong();
        if (correctIndex >= 0 && correctIndex < cards.length) {
            cards[correctIndex].classList.add('correct');
        }
    }
    
    scoreDisplay.innerText = `نمرە: ${toKurdishNum(score)}`;
    updateStreakUI();

    nextBtn.classList.remove('hidden');
    gsap.fromTo(nextBtn, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' });
}

function revealAnswer() {
    saInput.blur();
    saRevealBtn.classList.add('hidden');
    saModelAnswer.classList.remove('hidden');
    sfx.playClick();
    
    gsap.from(saModelAnswer, { height: 0, opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' });
}

function rateAnswer(isCorrect) {
    if (userAnswers[currentQuestionIndex] !== null) return;
    
    userAnswers[currentQuestionIndex] = isCorrect ? 1 : 0;
    
    if (isCorrect) {
        score++;
        streak++;
        sfx.playCorrect();
    } else {
        streak = 0;
        sfx.playWrong();
    }
    
    scoreDisplay.innerText = `نمرە: ${toKurdishNum(score)}`;
    updateStreakUI();
    
    saModelAnswer.querySelectorAll('.grade-btn').forEach(btn => btn.disabled = true);
    
    nextBtn.classList.remove('hidden');
    gsap.fromTo(nextBtn, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' });
}

function loadNextQuestion() {
    sfx.playClick();
    
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

    tl.to(['.question-content', '.options-grid', '.sa-container'], {
        y: -25,
        opacity: 0,
        filter: 'blur(6px)',
        duration: 0.35,
        ease: 'power2.in'
    });
}

function updateStreakUI() {
    if (streak >= 2) {
        streakCounter.classList.remove('hidden');
        streakValue.innerText = streak;
        
        gsap.fromTo(streakCounter, { scale: 0.8 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
        
        streakCounter.classList.remove('high-streak', 'super-streak');
        if (streak >= 7) {
            streakCounter.classList.add('super-streak');
        } else if (streak >= 4) {
            streakCounter.classList.add('high-streak');
        }
    } else {
        streakCounter.classList.add('hidden');
    }
}

// ============================================
// RESULTS
// ============================================

function showResultsScreen() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    gsap.fromTo(resultScreen, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    
    const percentage = score / activeQuestions.length;
    const offset = CIRCUMFERENCE - (percentage * CIRCUMFERENCE);
    
    gsap.to(scoreRingCircle, { strokeDashoffset: offset, duration: 1.3, ease: 'power3.out', delay: 0.2 });
    
    gsap.fromTo(finalScore, 
        { innerText: 0 }, 
        { innerText: score, duration: 1.3, snap: { innerText: 1 }, ease: 'power3.out', delay: 0.2 }
    );

    const tl = gsap.timeline({ delay: 0.3 });
    tl.from('.result-title', { y: 20, opacity: 0, duration: 0.4 })
      .from('.result-msg', { y: 15, opacity: 0, duration: 0.4 }, '-=0.2')
      .from('#restart-btn', { scale: 0.9, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.2');
      
    // Kurdish messages
    if (percentage >= 0.9) {
        resultMessage.innerText = "🏆 زۆر نایاب! تۆ شارەزایت!";
        triggerConfetti();
    } else if (percentage >= 0.7) {
        resultMessage.innerText = "🎉 کارێکی باش! بەرەکەتبێت!";
        triggerConfetti();
    } else if (percentage >= 0.5) {
        resultMessage.innerText = "👍 باشە! هەوڵی زیاتر بدە!";
    } else {
        resultMessage.innerText = "💪 بەردەوام بە لە هەوڵدان!";
    }

    renderReview();
}

function triggerConfetti() {
    const colors = ['#d4a373', '#e9c46a', '#22c55e', '#6366f1', '#f59e0b', '#ef4444'];
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < 60; i++) {
        const conf = document.createElement('div');
        conf.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            width: ${Math.random() * 6 + 3}px;
            height: ${Math.random() * 6 + 3}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 10000;
        `;
        fragment.appendChild(conf);
        
        gsap.to(conf, {
            x: (Math.random() - 0.5) * window.innerWidth * 0.7,
            y: (Math.random() - 0.5) * window.innerHeight * 0.7,
            rotation: Math.random() * 720 - 360,
            opacity: 0,
            duration: 1.8 + Math.random() * 0.5,
            ease: 'power4.out',
            onComplete: () => conf.remove()
        });
    }
    document.body.appendChild(fragment);
}

function renderReview() {
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';

    if (currentMode === 'mcq') {
        activeQuestions.forEach((q, index) => {
            const userIndex = userAnswers[index];
            const correctIndex = typeof q.correct === 'number' ? q.correct : getCorrectIndexFromChar(q.correct);
            const isCorrect = userIndex === correctIndex;
            
            const item = document.createElement('div');
            item.classList.add('review-item');
            
            let feedbackHTML = '';
            
            if (userIndex !== null && userIndex !== undefined) {
                const userOptionText = q.a[userIndex] || 'N/A';
                const correctOptionText = q.a[correctIndex] || 'N/A';

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
                            <span class="badge badge-correct">ڕاست</span>
                            <span class="answer-text">${correctOptionText}</span>
                        </div>
                    `;
                }
            } else {
                feedbackHTML = `<div class="feedback-row"><span class="badge badge-wrong">تێپەڕێنرا</span></div>`;
            }

            item.innerHTML = `
                <div class="review-question"><strong>${index + 1}.</strong> ${q.q}</div>
                <div class="review-feedback">${feedbackHTML}</div>
            `;
            
            reviewContainer.appendChild(item);
        });
    } else {
        reviewContainer.innerHTML = '<p style="text-align:center; color: rgba(255,255,255,0.5);">پێداچوونەوە بەردەست نییە بۆ وەڵامی کورت.</p>';
    }
}

function restartQuiz() {
    sfx.playClick();
    
    const tl = gsap.timeline({
        onComplete: () => {
            resultScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
            
            gsap.set(scoreRingCircle, { strokeDashoffset: CIRCUMFERENCE });
            gsap.set('.hero-content > *', { clearProps: 'all' });
            
            animateIntro();
        }
    });
    
    tl.to('.result-content > *', {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.3,
        ease: 'power2.in'
    });
}

function getCorrectIndexFromChar(char) {
    if (!char) return -1;
    const map = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    return map[char] !== undefined ? map[char] : -1;
}
