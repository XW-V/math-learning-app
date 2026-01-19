/**
 * 主应用逻辑
 * 整合所有模块，控制应用流程
 */
class MathLearningApp {
    constructor() {
        this.currentQuestion = null;
        this.pendingQuestion = null; // 待显示的题目
        this.settings = {
            questionType: 'mixed',
            numberRange: 20,
            enableTimer: true
        };
        this.init();
    }

    /**
     * 初始化应用
     */
    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.setupNumberPad();
        animationController.init('objectCounting');
        this.generateNewQuestion();
        
        if (this.settings.enableTimer) {
            scoreSystem.startTimer();
        }
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 提交按钮
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.handleSubmit());
        }

        // 回车键提交
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSubmit();
                }
            });
        }
        
        // 显示动画按钮
        const showAnimationBtn = document.getElementById('showAnimationBtn');
        if (showAnimationBtn) {
            showAnimationBtn.addEventListener('click', () => {
                this.hideAnimationButton();
            });
        }

        // 设置按钮
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsModal = document.getElementById('settingsModal');
        const closeSettingsBtn = document.getElementById('closeSettingsBtn');
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.openSettings();
            });
        }
        
        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', () => {
                this.closeSettings();
            });
        }

        // 点击模态框外部关闭
        if (settingsModal) {
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    this.closeSettings();
                }
            });
        }

        // 保存设置
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                this.saveSettings();
            });
        }

        // 重置分数
        const resetScoreBtn = document.getElementById('resetScoreBtn');
        if (resetScoreBtn) {
            resetScoreBtn.addEventListener('click', () => {
                if (confirm('确定要重置分数吗？')) {
                    scoreSystem.reset();
                }
            });
        }
    }

    /**
     * 设置数字键盘
     */
    setupNumberPad() {
        const numberPad = document.getElementById('numberPad');
        const answerInput = document.getElementById('answerInput');
        const deleteBtn = document.getElementById('deleteBtn');
        const clearBtn = document.getElementById('clearBtn');

        if (!numberPad || !answerInput) return;

        // 数字按钮
        numberPad.querySelectorAll('.num-btn[data-value]').forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.getAttribute('data-value');
                answerInput.value += value;
                answerInput.focus();
            });
        });

        // 删除按钮
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                answerInput.value = answerInput.value.slice(0, -1);
                answerInput.focus();
            });
        }

        // 清除按钮
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                answerInput.value = '';
                answerInput.focus();
            });
        }
    }

    /**
     * 生成新题目
     */
    generateNewQuestion() {
        // 更新题目生成器设置
        questionGenerator.updateSettings({
            questionType: this.settings.questionType,
            numberRange: this.settings.numberRange
        });

        // 生成题目
        this.currentQuestion = questionGenerator.generate();
        
        // 显示题目
        this.displayQuestion(this.currentQuestion);
        
        // 重置动画区域，显示按钮
        this.resetAnimationArea();
        
        // 显示动画（会显示按钮，不直接显示动画）
        this.showAnimations(this.currentQuestion);
        
        // 清空答案输入
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.value = '';
            answerInput.focus();
        }
    }
    
    /**
     * 重置动画区域
     */
    resetAnimationArea() {
        const objectCounting = document.getElementById('objectCounting');
        if (objectCounting) {
            // 清空动画内容
            objectCounting.innerHTML = '';
            // 隐藏动画区域
            objectCounting.style.display = 'none';
        }
    }

    /**
     * 显示题目
     */
    displayQuestion(question) {
        const num1El = document.getElementById('num1');
        const num2El = document.getElementById('num2');
        const operatorEl = document.getElementById('operator');
        const answerEl = document.getElementById('answer');
        const questionDisplay = document.getElementById('questionDisplay');

        if (num1El) num1El.textContent = question.num1;
        if (num2El) num2El.textContent = question.num2;
        if (operatorEl) operatorEl.textContent = question.operator;
        if (answerEl) answerEl.textContent = '?';

        // 添加淡入动画
        if (questionDisplay) {
            animationController.animateQuestion(questionDisplay);
        }
    }

    /**
     * 显示动画
     */
    showAnimations(question) {
        // 不自动显示动画，等待用户点击按钮
        // 保存当前题目，以便点击按钮时显示
        this.pendingQuestion = question;
        
        // 显示动画控制按钮
        this.showAnimationButton();
    }
    
    /**
     * 重置动画区域
     */
    resetAnimationArea() {
        const objectCounting = document.getElementById('objectCounting');
        if (objectCounting) {
            // 清空动画内容
            objectCounting.innerHTML = '';
            // 隐藏动画区域
            objectCounting.style.display = 'none';
        }
    }
    
    /**
     * 显示动画控制按钮
     */
    showAnimationButton() {
        const animationControl = document.getElementById('animationControl');
        const objectCounting = document.getElementById('objectCounting');
        const showAnimationBtn = document.getElementById('showAnimationBtn');
        
        if (animationControl && objectCounting && showAnimationBtn) {
            // 隐藏动画区域
            objectCounting.style.display = 'none';
            // 显示按钮
            animationControl.style.display = 'flex';
            showAnimationBtn.classList.remove('hidden');
        }
    }
    
    /**
     * 隐藏动画控制按钮并显示动画
     */
    hideAnimationButton() {
        const animationControl = document.getElementById('animationControl');
        const objectCounting = document.getElementById('objectCounting');
        const showAnimationBtn = document.getElementById('showAnimationBtn');
        
        if (animationControl && objectCounting && showAnimationBtn) {
            // 隐藏按钮
            animationControl.style.display = 'none';
            showAnimationBtn.classList.add('hidden');
            // 显示动画区域
            objectCounting.style.display = 'flex';
            
            // 如果有待显示的题目，显示动画
            if (this.pendingQuestion) {
                animationController.showObjectCounting(this.pendingQuestion);
            }
        }
    }

    /**
     * 处理提交答案
     */
    handleSubmit() {
        const answerInput = document.getElementById('answerInput');
        if (!answerInput || !this.currentQuestion) return;

        const userAnswer = answerInput.value.trim();
        if (!userAnswer) {
            this.showFeedback('请输入答案！', 'wrong');
            return;
        }

        const isCorrect = questionGenerator.checkAnswer(this.currentQuestion, userAnswer);
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }
    }

    /**
     * 处理正确答案
     */
    handleCorrectAnswer() {
        // 播放音效
        audioManager.playCorrect();

        // 更新分数
        scoreSystem.addCorrect();

        // 显示反馈
        this.showFeedback('太棒了！✨', 'correct');

        // 显示奖励动画
        this.showRewardAnimation();

        // 检查连击奖励
        const streak = scoreSystem.streak;
        if (streak > 0 && streak % 3 === 0) {
            this.showStreakReward(streak);
        }

        // 延迟生成新题目
        setTimeout(() => {
            this.generateNewQuestion();
        }, 1500);
    }

    /**
     * 处理错误答案
     */
    handleWrongAnswer() {
        // 播放音效
        audioManager.playWrong();

        // 更新分数
        scoreSystem.addWrong();

        // 显示正确答案
        const correctAnswer = this.currentQuestion.answer;
        this.showFeedback(`正确答案是 ${correctAnswer}，再试试吧！`, 'wrong');

        // 显示正确答案动画
        const answerEl = document.getElementById('answer');
        if (answerEl) {
            answerEl.textContent = correctAnswer;
            answerEl.classList.add('feedback-wrong');
            setTimeout(() => {
                answerEl.classList.remove('feedback-wrong');
            }, 1000);
        }

        // 延迟生成新题目
        setTimeout(() => {
            this.generateNewQuestion();
        }, 2000);
    }

    /**
     * 显示反馈消息
     */
    showFeedback(message, type) {
        const feedbackEl = document.getElementById('feedbackMessage');
        if (!feedbackEl) return;

        feedbackEl.textContent = message;
        feedbackEl.className = `feedback-message ${type} show`;

        setTimeout(() => {
            feedbackEl.classList.remove('show');
        }, 2000);
    }

    /**
     * 显示奖励动画
     */
    showRewardAnimation() {
        const rewardContainer = document.getElementById('rewardContainer');
        if (!rewardContainer) return;

        // 创建星星动画
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'star-reward';
                star.textContent = '⭐';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 50 + 25}%`;
                rewardContainer.appendChild(star);

                setTimeout(() => {
                    star.remove();
                }, 1000);
            }, i * 100);
        }
    }

    /**
     * 显示连击奖励
     */
    showStreakReward(streak) {
        audioManager.playStreak();
        
        const rewardContainer = document.getElementById('rewardContainer');
        if (!rewardContainer) return;

        const streakEl = document.createElement('div');
        streakEl.className = 'streak-reward';
        streakEl.textContent = `${streak} 连击！🔥`;
        streakEl.style.left = '50%';
        streakEl.style.top = '30%';
        streakEl.style.transform = 'translateX(-50%)';
        rewardContainer.appendChild(streakEl);

        setTimeout(() => {
            streakEl.remove();
        }, 1000);
    }

    /**
     * 打开设置面板
     */
    openSettings() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            // 加载当前设置到表单
            this.loadSettingsToForm();
            modal.classList.add('show');
        }
    }

    /**
     * 关闭设置面板
     */
    closeSettings() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    /**
     * 加载设置到表单
     */
    loadSettingsToForm() {
        // 题目类型
        const questionTypeRadios = document.querySelectorAll('input[name="questionType"]');
        questionTypeRadios.forEach(radio => {
            if (radio.value === this.settings.questionType) {
                radio.checked = true;
            }
        });

        // 数字范围
        const numberRangeSelect = document.getElementById('numberRange');
        if (numberRangeSelect) {
            numberRangeSelect.value = this.settings.numberRange;
        }

        // 计时器
        const enableTimerCheckbox = document.getElementById('enableTimer');
        if (enableTimerCheckbox) {
            enableTimerCheckbox.checked = this.settings.enableTimer;
        }
    }

    /**
     * 保存设置
     */
    saveSettings() {
        // 获取题目类型
        const questionTypeRadio = document.querySelector('input[name="questionType"]:checked');
        if (questionTypeRadio) {
            this.settings.questionType = questionTypeRadio.value;
        }

        // 获取数字范围
        const numberRangeSelect = document.getElementById('numberRange');
        if (numberRangeSelect) {
            this.settings.numberRange = parseInt(numberRangeSelect.value, 10);
        }

        // 获取计时器设置
        const enableTimerCheckbox = document.getElementById('enableTimer');
        if (enableTimerCheckbox) {
            this.settings.enableTimer = enableTimerCheckbox.checked;
            if (this.settings.enableTimer) {
                scoreSystem.startTimer();
            } else {
                scoreSystem.stopTimer();
            }
        }

        // 保存到本地存储
        this.saveSettingsToStorage();

        // 关闭设置面板
        this.closeSettings();

        // 生成新题目以应用设置
        this.generateNewQuestion();
    }

    /**
     * 从本地存储加载设置
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('mathApp_settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('加载设置失败:', error);
        }
    }

    /**
     * 保存设置到本地存储
     */
    saveSettingsToStorage() {
        try {
            localStorage.setItem('mathApp_settings', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('保存设置失败:', error);
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new MathLearningApp();
    window.mathApp = app; // 方便调试
});
