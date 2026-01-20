/**
 * 音频管理器
 * 处理所有音效播放
 * 支持随机选择 sounds 目录下以 correct/wrong/success 开头的 mp3 文件
 */
class AudioManager {
    constructor() {
        // 存储每种类型的音频文件数组
        this.soundPools = {
            correct: [],
            wrong: [],
            success: []
        };
        this.enabled = true;
        this.init();
    }

    init() {
        // 预定义可能的文件名模式（支持 correct1.mp3, correct2.mp3 等）
        const filePatterns = {
            correct: ['correct', 'correct1', 'correct2', 'correct3', 'correct4', 'correct5', 'correct6', 'correct7', 'correct8'],
            wrong: ['wrong', 'wrong1', 'wrong2', 'wrong3', 'wrong4', 'wrong5'],
            success: ['success', 'success1', 'success2', 'success3', 'success4', 'success5', 'success6', 'success7', 'success8']
        };

        // 加载所有可能的音频文件
        Object.keys(filePatterns).forEach(type => {
            filePatterns[type].forEach(fileName => {
                const audio = new Audio(`assets/sounds/${fileName}.mp3`);
                audio.volume = 0.5;
                audio.preload = 'auto';
                
                // 尝试加载文件，如果成功则添加到池中
                audio.addEventListener('canplaythrough', () => {
                    if (!this.soundPools[type].includes(audio)) {
                        this.soundPools[type].push(audio);
                    }
                }, { once: true });
                
                // 处理加载错误（静默处理）
                audio.addEventListener('error', () => {
                    // 文件不存在，忽略
                }, { once: true });
            });
        });
    }

    /**
     * 从音频池中随机选择一个音频对象
     */
    getRandomSound(type) {
        const pool = this.soundPools[type];
        if (pool && pool.length > 0) {
            const randomIndex = Math.floor(Math.random() * pool.length);
            return pool[randomIndex];
        }
        return null;
    }

    /**
     * 播放音频
     */
    playSound(type) {
        if (!this.enabled) return;
        
        const sound = this.getRandomSound(type);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(err => {
                console.warn(`播放${type}音效失败:`, err);
            });
        }
    }

    /**
     * 播放正确音效
     */
    playCorrect() {
        this.playSound('correct');
    }

    /**
     * 播放错误音效
     */
    playWrong() {
        this.playSound('wrong');
    }

    /**
     * 播放成功音效
     */
    playSuccess() {
        this.playSound('success');
    }

    /**
     * 播放连击音效（使用 success 池）
     */
    playStreak() {
        this.playSound('success');
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
