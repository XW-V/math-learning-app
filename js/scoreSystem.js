/**
 * 计分系统
 * 管理分数、连击、计时和统计
 */
class ScoreSystem {
    constructor() {
        this.score = 0;
        this.streak = 0;
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        this.startTime = null;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isTimerRunning = false;
        this.bestScore = this.loadBestScore();
        this.bestStreak = this.loadBestStreak();
    }

    /**
     * 从本地存储加载最佳分数
     */
    loadBestScore() {
        try {
            return parseInt(localStorage.getItem('mathApp_bestScore') || '0', 10);
        } catch (error) {
            return 0;
        }
    }

    /**
     * 保存最佳分数
     */
    saveBestScore() {
        try {
            if (this.score > this.bestScore) {
                this.bestScore = this.score;
                localStorage.setItem('mathApp_bestScore', this.bestScore.toString());
            }
        } catch (error) {
            console.warn('保存最佳分数失败:', error);
        }
    }

    /**
     * 从本地存储加载最佳连击
     */
    loadBestStreak() {
        try {
            return parseInt(localStorage.getItem('mathApp_bestStreak') || '0', 10);
        } catch (error) {
            return 0;
        }
    }

    /**
     * 保存最佳连击
     */
    saveBestStreak() {
        try {
            if (this.streak > this.bestStreak) {
                this.bestStreak = this.streak;
                localStorage.setItem('mathApp_bestStreak', this.bestStreak.toString());
            }
        } catch (error) {
            console.warn('保存最佳连击失败:', error);
        }
    }

    /**
     * 开始计时
     */
    startTimer() {
        if (this.isTimerRunning) return;
        
        this.startTime = Date.now() - this.elapsedTime;
        this.isTimerRunning = true;
        
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
            this.updateTimerDisplay();
        }, 100);
    }

    /**
     * 停止计时
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.isTimerRunning = false;
    }

    /**
     * 重置计时器
     */
    resetTimer() {
        this.stopTimer();
        this.elapsedTime = 0;
        this.startTime = null;
        this.updateTimerDisplay();
    }

    /**
     * 更新计时器显示
     */
    updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            const minutes = Math.floor(this.elapsedTime / 60000);
            const seconds = Math.floor((this.elapsedTime % 60000) / 1000);
            timerElement.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    /**
     * 答对题目
     */
    addCorrect() {
        this.score += 10; // 每答对一题得10分
        this.streak += 1;
        this.totalQuestions += 1;
        this.correctAnswers += 1;
        
        this.saveBestScore();
        this.saveBestStreak();
        this.updateDisplay();
    }

    /**
     * 答错题目
     */
    addWrong() {
        this.streak = 0; // 重置连击
        this.totalQuestions += 1;
        this.updateDisplay();
    }

    /**
     * 更新显示
     */
    updateDisplay() {
        const scoreElement = document.getElementById('score');
        const streakElement = document.getElementById('streak');
        
        if (scoreElement) {
            scoreElement.textContent = this.score;
            scoreElement.classList.add('score-increase');
            setTimeout(() => {
                scoreElement.classList.remove('score-increase');
            }, 500);
        }
        
        if (streakElement) {
            streakElement.textContent = this.streak;
        }
    }

    /**
     * 获取准确率
     */
    getAccuracy() {
        if (this.totalQuestions === 0) return 0;
        return Math.round((this.correctAnswers / this.totalQuestions) * 100);
    }

    /**
     * 获取平均答题时间（秒）
     */
    getAverageTime() {
        if (this.totalQuestions === 0) return 0;
        return Math.round(this.elapsedTime / this.totalQuestions / 1000);
    }

    /**
     * 重置所有数据
     */
    reset() {
        this.score = 0;
        this.streak = 0;
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        this.resetTimer();
        this.updateDisplay();
    }

    /**
     * 获取统计信息
     */
    getStats() {
        return {
            score: this.score,
            streak: this.streak,
            totalQuestions: this.totalQuestions,
            correctAnswers: this.correctAnswers,
            accuracy: this.getAccuracy(),
            averageTime: this.getAverageTime(),
            elapsedTime: this.elapsedTime,
            bestScore: this.bestScore,
            bestStreak: this.bestStreak
        };
    }
}

// 导出单例
const scoreSystem = new ScoreSystem();
