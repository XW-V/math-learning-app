/**
 * 音频管理器
 * 处理所有音效播放
 */
class AudioManager {
    constructor() {
        this.sounds = {
            correct: null,
            wrong: null,
            success: null,
            streak: null
        };
        this.enabled = true;
        this.init();
    }

    init() {
        // 创建音频对象（如果音频文件存在）
        // 注意：实际使用时需要添加音频文件到 assets/sounds/ 目录
        try {
            this.sounds.correct = new Audio('assets/sounds/correct.mp3');
            this.sounds.wrong = new Audio('assets/sounds/wrong.mp3');
            this.sounds.success = new Audio('assets/sounds/success.mp3');
            this.sounds.streak = new Audio('assets/sounds/success.mp3'); // 复用成功音效
            
            // 设置音量
            Object.values(this.sounds).forEach(sound => {
                if (sound) {
                    sound.volume = 0.5;
                    sound.preload = 'auto';
                }
            });
        } catch (error) {
            console.warn('音频文件加载失败，将使用静默模式:', error);
        }
    }

    /**
     * 播放正确音效
     */
    playCorrect() {
        if (this.enabled && this.sounds.correct) {
            this.sounds.correct.currentTime = 0;
            this.sounds.correct.play().catch(err => {
                console.warn('播放音效失败:', err);
            });
        }
    }

    /**
     * 播放错误音效
     */
    playWrong() {
        if (this.enabled && this.sounds.wrong) {
            this.sounds.wrong.currentTime = 0;
            this.sounds.wrong.play().catch(err => {
                console.warn('播放音效失败:', err);
            });
        }
    }

    /**
     * 播放成功音效
     */
    playSuccess() {
        if (this.enabled && this.sounds.success) {
            this.sounds.success.currentTime = 0;
            this.sounds.success.play().catch(err => {
                console.warn('播放音效失败:', err);
            });
        }
    }

    /**
     * 播放连击音效
     */
    playStreak() {
        if (this.enabled && this.sounds.streak) {
            this.sounds.streak.currentTime = 0;
            this.sounds.streak.play().catch(err => {
                console.warn('播放音效失败:', err);
            });
        }
    }

    /**
     * 启用/禁用音效
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * 切换音效状态
     */
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// 导出单例
const audioManager = new AudioManager();
