/**
 * XehTern Solutions - УЛЬТРА улучшенная версия
 * 3D карточки, улучшенный AI ассистент, матричная анимация текста
 */

// Матричный фон
class MatrixBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.matrixBg = document.getElementById('matrix');
        this.matrixBg.appendChild(this.canvas);
        
        this.chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&!*^()-=+[]{}|;:,.<>?/~`";
        this.charArray = this.chars.split('');
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px 'Share Tech Mono', monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Матрица на экране компьютера
class ComputerMatrix {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.matrixScreen = document.getElementById('matrixScreen');
        this.matrixScreen.appendChild(this.canvas);
        
        this.chars = "01";
        this.charArray = this.chars.split('');
        this.fontSize = 12;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.resize();
    }
    
    resize() {
        this.canvas.width = this.matrixScreen.clientWidth;
        this.canvas.height = this.matrixScreen.clientHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(0, 17, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px 'Share Tech Mono', monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Улучшенная матричная анимация для заголовка с падением букв
class MatrixTitle {
    constructor() {
        this.title = document.getElementById('matrixTitle');
        this.text = "XehTern Solutions";
        this.init();
    }
    
    init() {
        this.createFallingLetters();
    }
    
    createFallingLetters() {
        this.title.innerHTML = '';
        
        for (let i = 0; i < this.text.length; i++) {
            const char = this.text[i];
            
            if (char === ' ') {
                const space = document.createElement('span');
                space.className = 'title-space';
                this.title.appendChild(space);
                continue;
            }
            
            const charElement = document.createElement('span');
            charElement.className = 'title-char';
            charElement.textContent = char;
            charElement.style.animationDelay = `${i * 0.1 + 0.5}s`;
            
            // Запускаем анимацию падения
            setTimeout(() => {
                charElement.style.animation = `charFall 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
                
                // После падения добавляем мерцание
                setTimeout(() => {
                    charElement.classList.add('visible');
                }, 800);
            }, i * 100 + 500);
            
            this.title.appendChild(charElement);
        }
    }
}

// Навигационная система
class NavigationSystem {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isAnimating) return;
                
                const targetId = link.getAttribute('href').substring(1);
                this.showSection(targetId);
                this.updateActiveLink(link);
            });
        });
        
        this.showSection('home');
        this.initSkillsAnimation();
    }
    
    showSection(sectionId) {
        this.isAnimating = true;
        
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            if (sectionId === 'about') {
                setTimeout(() => {
                    this.animateSkills();
                }, 300);
            }
        }
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    initSkillsAnimation() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            this.observer.observe(aboutSection);
        }
    }
    
    animateSkills() {
        const skillProgresses = document.querySelectorAll('.skill-progress');
        skillProgresses.forEach(progress => {
            const level = progress.getAttribute('data-level');
            setTimeout(() => {
                progress.style.width = level + '%';
            }, 500);
        });
    }
}

// Система для форм
class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.addInputEffects();
        }
    }
    
    addInputEffects() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        if (submitBtn) {
            submitBtn.innerHTML = 'Отправка...';
            submitBtn.disabled = true;
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showSuccessMessage();
            this.form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--neon-green);
            color: var(--primary-bg);
            padding: 15px 25px;
            border-radius: 5px;
            font-family: 'Share Tech Mono', monospace;
            z-index: 10000;
        `;
        message.textContent = '✅ Сообщение отправлено!';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Система модальных окон для услуг
class ServiceModals {
    constructor() {
        this.modals = {
            audit: document.getElementById('auditModal'),
            development: document.getElementById('developmentModal'),
            crisis: document.getElementById('crisisModal')
        };
        
        this.init();
    }
    
    init() {
        // Закрытие модальных окон
        document.querySelectorAll('.close-modal').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });
        
        // Закрытие по клику вне модального окна
        Object.values(this.modals).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    openModal(modalKey) {
        this.closeAllModals();
        
        if (this.modals[modalKey]) {
            this.modals[modalKey].style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Анимация появления
            setTimeout(() => {
                this.modals[modalKey].classList.add('active');
            }, 10);
        }
    }
    
    closeAllModals() {
        Object.values(this.modals).forEach(modal => {
            modal.style.display = 'none';
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
}

// Улучшенный AI Ассистент с синтезом речи
class AIAssistant {
    constructor() {
        this.assistant = document.getElementById('aiAssistant');
        this.voiceBtn = this.assistant.querySelector('.ai-voice-btn');
        this.speakBtn = this.assistant.querySelector('.ai-speak-btn');
        this.chat = this.assistant.querySelector('.ai-chat');
        this.message = this.assistant.querySelector('.ai-message');
        this.isListening = false;
        this.isSpeaking = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        
        this.commands = {
            'навигация': () => this.navigateTo('home'),
            'главная': () => this.navigateTo('home'),
            'домой': () => this.navigateTo('home'),
            'услуги': () => this.navigateTo('services'),
            'сервисы': () => this.navigateTo('services'),
            'о себе': () => this.navigateTo('about'),
            'обо мне': () => this.navigateTo('about'),
            'контакты': () => this.navigateTo('contact'),
            'связаться': () => this.navigateTo('contact'),
            'помощь': () => this.showHelp(),
            'help': () => this.showHelp(),
            'привет': () => this.showGreeting(),
            'здравствуй': () => this.showGreeting()
        };
        
        this.responses = {
            'greeting': [
                "Привет! Я ваш AI-помощник XehTern. Чем могу помочь?",
                "Здравствуйте! Готов помочь с навигацией по сайту.",
                "Приветствую! Скажите 'помощь' для списка команд."
            ],
            'help': "Доступные команды: навигация, услуги, обо мне, контакты, помощь. Вы также можете использовать голосовое управление!",
            'unknown': "Не понял команду. Попробуйте сказать: навигация, услуги, контакты или помощь."
        };
        
        this.init();
    }
    
    init() {
        // Инициализация распознавания речи
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'ru-RU';
            
            this.recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };
            
            this.recognition.onend = () => {
                this.stopListening();
            };
            
            this.recognition.onerror = (event) => {
                this.showMessage('Ошибка распознавания: ' + event.error);
                this.stopListening();
            };
        }
        
        // Обработчики событий
        this.assistant.addEventListener('click', (e) => {
            if (!this.assistant.classList.contains('expanded')) {
                this.expand();
            } else if (e.target === this.voiceBtn || e.target === this.speakBtn) {
                // Обрабатывается в отдельных обработчиках
            }
        });
        
        this.voiceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleVoice();
        });
        
        this.speakBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSpeech();
        });
        
        this.startAutoMessages();
    }
    
    expand() {
        this.assistant.classList.add('expanded');
        this.showMessage('Чем могу помочь? Скажите "помощь" для списка команд.');
    }
    
    toggleVoice() {
        if (!this.recognition) {
            this.showMessage('Голосовое управление не поддерживается в вашем браузере');
            return;
        }
        
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }
    
    toggleSpeech() {
        if (this.isSpeaking) {
            this.stopSpeech();
        } else {
            this.speakMessage(this.message.textContent);
        }
    }
    
    startListening() {
        try {
            this.recognition.start();
            this.isListening = true;
            this.voiceBtn.classList.add('listening');
            this.voiceBtn.textContent = '🔴';
            this.showMessage('Слушаю...');
        } catch (error) {
            this.showMessage('Ошибка микрофона');
            this.stopListening();
        }
    }
    
    stopListening() {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (e) {}
        }
        this.isListening = false;
        this.voiceBtn.classList.remove('listening');
        this.voiceBtn.textContent = '🎤';
    }
    
    speakMessage(text) {
        if (!this.synthesis) {
            this.showMessage('Синтез речи не поддерживается');
            return;
        }
        
        this.stopSpeech();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ru-RU';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        utterance.onstart = () => {
            this.isSpeaking = true;
            this.speakBtn.classList.add('speaking');
            this.assistant.classList.add('speaking');
        };
        
        utterance.onend = () => {
            this.isSpeaking = false;
            this.speakBtn.classList.remove('speaking');
            this.assistant.classList.remove('speaking');
        };
        
        this.synthesis.speak(utterance);
    }
    
    stopSpeech() {
        if (this.synthesis) {
            this.synthesis.cancel();
        }
        this.isSpeaking = false;
        this.speakBtn.classList.remove('speaking');
        this.assistant.classList.remove('speaking');
    }
    
    processVoiceCommand(command) {
        this.showMessage(`Вы сказали: "${command}"`);
        
        let handled = false;
        for (const [key, action] of Object.entries(this.commands)) {
            if (command.includes(key)) {
                action();
                handled = true;
                break;
            }
        }
        
        if (!handled) {
            this.showMessage(this.responses.unknown);
        }
    }
    
    navigateTo(section) {
        this.showMessage(`Перехожу к разделу...`);
        setTimeout(() => {
            scrollToSection(section);
            this.showMessage(`Вы в разделе "${this.getSectionName(section)}". Чем еще могу помочь?`);
        }, 1000);
    }
    
    getSectionName(section) {
        const names = {
            'home': 'Главная',
            'services': 'Услуги',
            'about': 'Обо мне',
            'contact': 'Контакты'
        };
        return names[section] || section;
    }
    
    showHelp() {
        this.showMessage(this.responses.help);
        this.speakMessage(this.responses.help);
    }
    
    showGreeting() {
        const greeting = this.responses.greeting[Math.floor(Math.random() * this.responses.greeting.length)];
        this.showMessage(greeting);
        this.speakMessage(greeting);
    }
    
    showMessage(text) {
        this.message.textContent = text;
    }
    
    startAutoMessages() {
        const messages = [
            "Привет! Я твой AI-помощник",
            "Используй голосовое управление!",
            "Скажи 'Помощь' для списка команд",
            "Попробуй 3D карточки услуг!",
            "Работай в терминале - там есть секреты!"
        ];
        
        let index = 0;
        setInterval(() => {
            if (!this.isListening && !this.assistant.classList.contains('expanded')) {
                this.showMessage(messages[index]);
                index = (index + 1) % messages.length;
            }
        }, 5000);
    }
}

// Хакерский терминал
class HackerTerminal {
    constructor() {
        this.terminalInput = document.getElementById('terminalInput');
        this.terminalOutput = document.getElementById('terminalOutput');
        this.commands = {
            help: this.showHelp,
            clear: this.clearTerminal,
            scan: this.scanNetwork,
            encrypt: this.encryptData,
            decrypt: this.decryptData,
            status: this.showStatus,
            whoami: this.whoAmI,
            matrix: this.showMatrix,
            secret: this.showSecret
        };
        
        this.init();
    }
    
    init() {
        this.terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.terminalInput.value);
                this.terminalInput.value = '';
            }
        });
        
        this.startAutoMessages();
    }
    
    processCommand(input) {
        this.addLine(`<div>> ${input}</div>`);
        
        const command = input.trim().toLowerCase();
        if (this.commands[command]) {
            this.commands[command].call(this);
        } else if (command) {
            this.addLine(`<div><span class="status-red">Command not found: ${command}</span></div>`);
            this.addLine(`<div>Type 'help' for available commands</div>`);
        }
        
        this.scrollToBottom();
    }
    
    addLine(html) {
        this.terminalOutput.innerHTML += html;
    }
    
    scrollToBottom() {
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }
    
    showHelp() {
        this.addLine(`<div>Available commands:</div>`);
        this.addLine(`<div>  help     - Show this help message</div>`);
        this.addLine(`<div>  clear    - Clear terminal</div>`);
        this.addLine(`<div>  scan     - Perform network scan</div>`);
        this.addLine(`<div>  encrypt  - Encrypt data</div>`);
        this.addLine(`<div>  decrypt  - Decrypt data</div>`);
        this.addLine(`<div>  status   - Show system status</div>`);
        this.addLine(`<div>  whoami   - Show user info</div>`);
        this.addLine(`<div>  matrix   - Display matrix effect</div>`);
        this.addLine(`<div>  secret   - Show secret message</div>`);
    }
    
    clearTerminal() {
        this.terminalOutput.innerHTML = '';
    }
    
    scanNetwork() {
        this.addLine(`<div>> Starting network scan...</div>`);
        setTimeout(() => {
            this.addLine(`<div>> Scanning 192.168.1.0/24...</div>`);
            setTimeout(() => {
                this.addLine(`<div>> Found 8 active hosts</div>`);
                setTimeout(() => {
                    this.addLine(`<div>> Vulnerability assessment complete</div>`);
                    this.addLine(`<div>> <span class="status-green">Scan completed successfully</span></div>`);
                    this.scrollToBottom();
                }, 500);
            }, 800);
        }, 500);
    }
    
    encryptData() {
        this.addLine(`<div>> Initializing AES-256 encryption...</div>`);
        setTimeout(() => {
            this.addLine(`<div>> Generating encryption key...</div>`);
            setTimeout(() => {
                this.addLine(`<div>> Data encrypted successfully</div>`);
                this.addLine(`<div>> Key: XT-${Math.random().toString(36).substr(2, 16).toUpperCase()}</div>`);
                this.scrollToBottom();
            }, 600);
        }, 500);
    }
    
    decryptData() {
        this.addLine(`<div>> This function requires elevated privileges</div>`);
        this.addLine(`<div>> <span class="status-red">Access denied</span></div>`);
    }
    
    showStatus() {
        this.addLine(`<div>> System Status Report:</div>`);
        this.addLine(`<div>>   Firewall: <span class="status-green">ACTIVE</span></div>`);
        this.addLine(`<div>>   Intrusion Detection: <span class="status-green">ONLINE</span></div>`);
        this.addLine(`<div>>   Encryption: <span class="status-green">ENABLED</span></div>`);
        this.addLine(`<div>>   Threat Level: <span class="status-green">LOW</span></div>`);
    }
    
    whoAmI() {
        this.addLine(`<div>> User: XehTern (root)</div>`);
        this.addLine(`<div>> Access Level: Administrator</div>`);
        this.addLine(`<div>> Security Clearance: TOP SECRET</div>`);
        this.addLine(`<div>> Last Login: ${new Date().toLocaleString()}</div>`);
    }
    
    showMatrix() {
        this.addLine(`<div>> Initializing Matrix simulation...</div>`);
        const matrixChars = "0101010101010101010101010101010101010101";
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const randomChars = matrixChars.split('').sort(() => 0.5 - Math.random()).join('');
                this.addLine(`<div>> ${randomChars}</div>`);
                this.scrollToBottom();
            }, i * 200);
        }
        setTimeout(() => {
            this.addLine(`<div>> <span class="status-green">Matrix simulation complete</span></div>`);
            this.scrollToBottom();
        }, 1200);
    }
    
    showSecret() {
        this.addLine(`<div>> Accessing secret database...</div>`);
        setTimeout(() => {
            this.addLine(`<div>> You found the secret message!</div>`);
            this.addLine(`<div>> <span class="status-green">"The best code is no code at all"</span></div>`);
            this.addLine(`<div>> - Ancient Developer Proverb</div>`);
            this.scrollToBottom();
        }, 1000);
    }
    
    startAutoMessages() {
        const messages = [
            "> Monitoring network traffic...",
            "> Firewall rules updated",
            "> Security protocols reinforced",
            "> Threat database synchronized",
            "> All systems operational"
        ];
        
        let index = 0;
        setInterval(() => {
            if (this.terminalOutput.children.length < 15) {
                this.addLine(`<div>${messages[index]}</div>`);
                this.scrollToBottom();
                index = (index + 1) % messages.length;
            }
        }, 10000);
    }
}

// Глобальные функции
function scrollToSection(sectionId) {
    if (window.navigationSystem) {
        window.navigationSystem.showSection(sectionId);
    }
}

function openModal(modalName) {
    if (window.serviceModals) {
        window.serviceModals.openModal(modalName);
    }
}

function openContactForm(serviceType) {
    if (window.serviceModals) {
        window.serviceModals.closeAllModals();
    }
    
    scrollToSection('contact');
    
    setTimeout(() => {
        const textarea = document.querySelector('.contact-form textarea');
        if (textarea) {
            textarea.value = `Здравствуйте! Меня интересует услуга: ${serviceType}. Пожалуйста, свяжитесь со мной для обсуждения деталей.`;
            textarea.focus();
            textarea.parentElement.classList.add('focused');
        }
    }, 800);
}

// Инициализация всех систем
document.addEventListener('DOMContentLoaded', function() {
    window.matrixBg = new MatrixBackground();
    window.computerMatrix = new ComputerMatrix();
    window.matrixTitle = new MatrixTitle();
    window.navigationSystem = new NavigationSystem();
    window.formHandler = new FormHandler();
    window.serviceModals = new ServiceModals();
    window.aiAssistant = new AIAssistant();
    window.hackerTerminal = new HackerTerminal();
    
    console.log('🚀 XehTern ULTRA PRO Systems activated!');
    console.log('✨ Features: 3D Cards, Advanced AI, Matrix Animations');
});