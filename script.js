// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Counter functionality
    let counter = 0;
    const counterDisplay = document.getElementById('counter');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const resetBtn = document.getElementById('reset');

    function updateCounter() {
        counterDisplay.textContent = counter;
        counterDisplay.parentElement.classList.add('pulse');
        setTimeout(() => {
            counterDisplay.parentElement.classList.remove('pulse');
        }, 500);
    }

    incrementBtn.addEventListener('click', () => {
        counter++;
        updateCounter();
    });

    decrementBtn.addEventListener('click', () => {
        counter--;
        updateCounter();
    });

    resetBtn.addEventListener('click', () => {
        counter = 0;
        updateCounter();
    });

    // Theme switcher functionality
    const colorPreview = document.getElementById('color-preview');
    const redThemeBtn = document.getElementById('red-theme');
    const blueThemeBtn = document.getElementById('blue-theme');
    const greenThemeBtn = document.getElementById('green-theme');
    const darkThemeBtn = document.getElementById('dark-theme');

    function switchTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('red-theme', 'blue-theme', 'green-theme', 'dark-theme');
        
        // Add new theme class
        if (theme !== 'default') {
            document.body.classList.add(theme + '-theme');
        }

        // Update color preview
        const themeColors = {
            'red': 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
            'blue': 'linear-gradient(45deg, #4ecdc4, #44a08d)',
            'green': 'linear-gradient(45deg, #56ab2f, #a8e6cf)',
            'dark': 'linear-gradient(45deg, #2c3e50, #34495e)',
            'default': 'linear-gradient(45deg, #667eea, #764ba2)'
        };

        colorPreview.style.background = themeColors[theme] || themeColors['default'];
        colorPreview.classList.add('pulse');
        setTimeout(() => {
            colorPreview.classList.remove('pulse');
        }, 500);
    }

    redThemeBtn.addEventListener('click', () => switchTheme('red'));
    blueThemeBtn.addEventListener('click', () => switchTheme('blue'));
    greenThemeBtn.addEventListener('click', () => switchTheme('green'));
    darkThemeBtn.addEventListener('click', () => switchTheme('dark'));

    // Quote generator functionality
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Innovation distinguishes between a leader and a follower. - Steve Jobs",
        "Life is what happens to you while you're busy making other plans. - John Lennon",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "It is during our darkest moments that we must focus to see the light. - Aristotle",
        "The only impossible journey is the one you never begin. - Tony Robbins",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "Don't let yesterday take up too much of today. - Will Rogers",
        "You learn more from failure than from success. Don't let it stop you. Failure builds character. - Unknown",
        "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you. - Steve Jobs",
        "Experience is a hard teacher because she gives the test first, the lesson afterwards. - Vernon Law"
    ];

    const quoteDisplay = document.getElementById('quote-display');
    const generateQuoteBtn = document.getElementById('generate-quote');

    generateQuoteBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        
        // Add fade effect
        quoteDisplay.style.opacity = '0';
        setTimeout(() => {
            quoteDisplay.textContent = randomQuote;
            quoteDisplay.style.opacity = '1';
        }, 200);
    });

    // Interactive actions functionality
    const showAlertBtn = document.getElementById('show-alert');
    const toggleVisibilityBtn = document.getElementById('toggle-visibility');
    const animateBtn = document.getElementById('animate-btn');
    const toggleBox = document.getElementById('toggle-box');

    showAlertBtn.addEventListener('click', () => {
        alert('Hello! This is a functional button demo. 🎉');
    });

    toggleVisibilityBtn.addEventListener('click', () => {
        toggleBox.classList.toggle('hidden');
        toggleVisibilityBtn.textContent = toggleBox.classList.contains('hidden') ? 'Show Box' : 'Hide Box';
    });

    animateBtn.addEventListener('click', () => {
        animateBtn.classList.add('animate');
        setTimeout(() => {
            animateBtn.classList.remove('animate');
        }, 1000);
    });

    // Form functionality
    const userInput = document.getElementById('user-input');
    const greetBtn = document.getElementById('greet-btn');
    const clearInputBtn = document.getElementById('clear-input');
    const greetingOutput = document.getElementById('greeting-output');

    greetBtn.addEventListener('click', () => {
        const name = userInput.value.trim();
        if (name) {
            const greetings = [
                `Hello, ${name}! Welcome to our interactive demo! 👋`,
                `Hi there, ${name}! Hope you're having a great day! 😊`,
                `Greetings, ${name}! Thanks for trying out our buttons! 🎉`,
                `Hey ${name}! You're awesome for testing this out! ⭐`,
                `Nice to meet you, ${name}! Enjoy exploring! 🚀`
            ];
            const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
            greetingOutput.textContent = randomGreeting;
        } else {
            greetingOutput.textContent = 'Please enter your name first! 😊';
        }
    });

    clearInputBtn.addEventListener('click', () => {
        userInput.value = '';
        greetingOutput.textContent = '';
        userInput.focus();
    });

    // Allow Enter key to trigger greeting
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            greetBtn.click();
        }
    });

    // Timer functionality
    let timerInterval;
    let timerSeconds = 0;
    let isTimerRunning = false;

    const timerDisplay = document.getElementById('timer-display');
    const startTimerBtn = document.getElementById('start-timer');
    const pauseTimerBtn = document.getElementById('pause-timer');
    const stopTimerBtn = document.getElementById('stop-timer');

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(timerSeconds);
    }

    startTimerBtn.addEventListener('click', () => {
        if (!isTimerRunning) {
            isTimerRunning = true;
            timerInterval = setInterval(() => {
                timerSeconds++;
                updateTimerDisplay();
            }, 1000);
            
            startTimerBtn.textContent = 'Running...';
            startTimerBtn.disabled = true;
            pauseTimerBtn.disabled = false;
            stopTimerBtn.disabled = false;
        }
    });

    pauseTimerBtn.addEventListener('click', () => {
        if (isTimerRunning) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            
            startTimerBtn.textContent = 'Resume';
            startTimerBtn.disabled = false;
            pauseTimerBtn.disabled = true;
        }
    });

    stopTimerBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timerSeconds = 0;
        updateTimerDisplay();
        
        startTimerBtn.textContent = 'Start';
        startTimerBtn.disabled = false;
        pauseTimerBtn.disabled = true;
        stopTimerBtn.disabled = true;
    });

    // Initialize timer display
    updateTimerDisplay();
    pauseTimerBtn.disabled = true;
    stopTimerBtn.disabled = true;

    // Add some interactive feedback to all buttons
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add welcome message
    console.log('🎉 Interactive Button Demo loaded successfully!');
    console.log('Try clicking the buttons to see them in action!');
});