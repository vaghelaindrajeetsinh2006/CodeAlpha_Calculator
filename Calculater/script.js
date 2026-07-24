class CalculatorPro {
    constructor() {
        // Core Elements
        this.currentInputEl = document.getElementById('current-input');
        this.expressionPreviewEl = document.getElementById('expression-preview');
        this.liveResultEl = document.getElementById('live-result');
        this.historyListEl = document.getElementById('history-list');
        this.historyPanel = document.getElementById('history-panel');
        this.clickSound = document.getElementById('click-sound');
        
        // State Management
        this.expression = '';
        this.currentValue = '0';
        this.memory = 0;
        this.history = JSON.parse(localStorage.getItem('calc_pro_history')) || [];
        this.shouldResetScreen = false;
        this.isDarkTheme = localStorage.getItem('calc_pro_theme') !== 'light';

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
        this.renderHistory();
        this.applyTheme();
    }

    bindEvents() {
        // Main Button Grid
        document.querySelector('.button-grid').addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;

            this.handleInteraction(btn, e);
        });

        // Memory Actions
        document.querySelectorAll('.mem-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.playFX();
                this.handleMemory(btn.dataset.action);
            });
        });

        // Panel Controls
        document.getElementById('history-open').addEventListener('click', () => this.toggleHistory(true));
        document.getElementById('history-close').addEventListener('click', () => this.toggleHistory(false));
        document.getElementById('history-back').addEventListener('click', () => this.toggleHistory(false));
        document.getElementById('clear-history').addEventListener('click', () => this.confirmClearHistory());
        
        // Utility Controls
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('copy-btn').addEventListener('click', () => this.copyToClipboard());

        // Keyboard
        window.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleInteraction(btn, event) {
        this.playFX();
        this.createRipple(event, btn);

        const value = btn.dataset.value;
        const action = btn.dataset.action;

        if (value) this.input(value);
        else if (action) this.action(action);
    }

    input(val) {
        if (this.shouldResetScreen && !this.isOperator(val)) {
            this.currentValue = '';
            this.shouldResetScreen = false;
        }
        if (val === '.' && this.currentValue.includes('.')) return;
        if (this.currentValue === '0' && val !== '.') {
            this.currentValue = val;
        } else {
            this.currentValue += val;
        }
        this.updateDisplay();
        this.preview();
    }

    action(type) {
        switch (type) {
            case 'clear': this.clearAll(); break;
            case 'delete': this.backspace(); break;
            case 'calculate': this.evaluate(); break;
        }
    }

    evaluate() {
        if (!this.expression && this.currentValue === '0') return;

        let fullExp = this.expression + this.currentValue;
        let cleanExp = fullExp.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100');

        try {
            // Check for division by zero
            if (/\/0(?!\.)/.test(cleanExp)) throw new Error('DivByZero');

            const result = new Function(`return ${cleanExp}`)();
            
            if (!isFinite(result)) throw new Error('Infinity');
            
            const formattedRes = this.format(result);
            
            this.saveToHistory(fullExp, formattedRes);
            
            this.expression = '';
            this.currentValue = formattedRes;
            this.shouldResetScreen = true;
            this.liveResultEl.textContent = '';
            this.updateDisplay();

        } catch (err) {
            this.handleError(err);
        }
    }

    preview() {
        let exp = this.expression + this.currentValue;
        if (!exp || this.isOperator(this.currentValue)) {
            this.liveResultEl.textContent = '';
            return;
        }

        let clean = exp.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100');
        
        try {
            if (/\d$/.test(clean)) {
                const res = new Function(`return ${clean}`)();
                if (isFinite(res)) {
                    this.liveResultEl.textContent = '= ' + this.format(res);
                }
            }
        } catch (e) {
            this.liveResultEl.textContent = '';
        }
    }

    handleError(err) {
        let msg = 'Error';
        if (err.message === 'DivByZero') msg = 'Can\'t divide by 0';
        else if (err.message === 'Infinity') msg = 'Limit Exceeded';

        this.currentValue = msg;
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    clearAll() {
        this.expression = '';
        this.currentValue = '0';
        this.shouldResetScreen = false;
        this.liveResultEl.textContent = '';
        this.updateDisplay();
    }

    backspace() {
        if (this.shouldResetScreen) {
            this.clearAll();
            return;
        }
        this.currentValue = this.currentValue.length > 1 ? this.currentValue.slice(0, -1) : '0';
        this.updateDisplay();
        this.preview();
    }

    format(num) {
        if (Math.abs(num) > 1e12) return num.toExponential(4);
        return parseFloat(num.toFixed(10)).toString();
    }

    isOperator(char) {
        return ['+', '-', '*', '/', '×', '÷'].includes(char);
    }

    // --- History Logic ---
    saveToHistory(exp, res) {
        const now = new Date();
        const entry = {
            exp,
            res,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: now.getTime()
        };

        this.history.unshift(entry);
        if (this.history.length > 50) this.history.pop();
        
        localStorage.setItem('calc_pro_history', JSON.stringify(this.history));
        this.renderHistory();
    }

    renderHistory() {
        if (this.history.length === 0) {
            this.historyListEl.innerHTML = '<p class="empty-state">No history yet</p>';
            return;
        }

        this.historyListEl.innerHTML = this.history.map((item, idx) => `
            <div class="history-card" data-idx="${idx}">
                <div class="meta">
                    <span>${item.date}</span>
                    <span>${item.time}</span>
                </div>
                <div class="exp">${item.exp} =</div>
                <div class="res">${item.res}</div>
            </div>
        `).join('');

        this.historyListEl.querySelectorAll('.history-card').forEach(card => {
            card.addEventListener('click', () => {
                const item = this.history[card.dataset.idx];
                this.currentValue = item.res;
                this.toggleHistory(false);
                this.updateDisplay();
            });
        });
    }

    toggleHistory(show) {
        if (show) this.historyPanel.classList.remove('hidden');
        else this.historyPanel.classList.add('hidden');
    }

    confirmClearHistory() {
        if (confirm('Are you sure you want to clear all history?')) {
            this.history = [];
            localStorage.removeItem('calc_pro_history');
            this.renderHistory();
        }
    }

    // --- Memory ---
    handleMemory(action) {
        const val = parseFloat(this.currentValue) || 0;
        switch (action) {
            case 'mc': this.memory = 0; break;
            case 'mr': 
                this.currentValue = this.memory.toString();
                this.updateDisplay();
                break;
            case 'm-plus': this.memory += val; break;
            case 'm-minus': this.memory -= val; break;
        }
    }

    // --- Theme & Utils ---
    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.applyTheme();
        localStorage.setItem('calc_pro_theme', this.isDarkTheme ? 'dark' : 'light');
    }

    applyTheme() {
        document.body.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
    }

    copyToClipboard() {
        navigator.clipboard.writeText(this.currentValue).then(() => {
            const old = this.currentInputEl.textContent;
            this.currentInputEl.textContent = 'Copied!';
            setTimeout(() => this.currentInputEl.textContent = old, 800);
        });
    }

    updateDisplay() {
        // Font sizing logic
        const len = this.currentValue.length;
        if (len > 12) this.currentInputEl.style.fontSize = '1.6rem';
        else if (len > 8) this.currentInputEl.style.fontSize = '2.2rem';
        else this.currentInputEl.style.fontSize = '2.8rem';

        this.currentInputEl.textContent = this.currentValue;
        this.expressionPreviewEl.textContent = this.expression;
    }

    handleKeyboard(e) {
        const key = e.key;
        if (/[0-9.]/.test(key)) this.input(key);
        else if (key === '+') this.input('+');
        else if (key === '-') this.input('-');
        else if (key === '*') this.input('×');
        else if (key === '/') { e.preventDefault(); this.input('÷'); }
        else if (key === '%') this.input('%');
        else if (key === 'Enter' || key === '=') { e.preventDefault(); this.evaluate(); }
        else if (key === 'Backspace') this.backspace();
        else if (key === 'Delete' || key === 'Escape') this.clearAll();
    }

    createRipple(e, btn) {
        const circle = document.createElement('span');
        const d = Math.max(btn.clientWidth, btn.clientHeight);
        const rect = btn.getBoundingClientRect();
        
        circle.style.width = circle.style.height = `${d}px`;
        circle.style.left = `${e.clientX - rect.left - d/2}px`;
        circle.style.top = `${e.clientY - rect.top - d/2}px`;
        circle.classList.add('ripple');

        const existing = btn.querySelector('.ripple');
        if (existing) existing.remove();
        btn.appendChild(circle);
    }

    playFX() {
        this.clickSound.currentTime = 0;
        this.clickSound.play().catch(() => {});
    }
}

document.addEventListener('DOMContentLoaded', () => new CalculatorPro());
