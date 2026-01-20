/**
 * 奖励动画管理器
 * 管理答对时的各种庆祝动画，支持随机选择
 */
class RewardAnimations {
    constructor() {
        this.rewardContainer = null;
        this.animationTypes = [];
        this.init();
    }

    init() {
        this.rewardContainer = document.getElementById('rewardContainer');
        
        // 定义所有可用的动画类型
        this.animationTypes = [
            'stars',           // 星星动画
            'confetti',        // 彩纸动画
            'fireworks',       // 烟花动画
            'emojiRain',       // Emoji雨
            'celebration',     // 庆祝动画
            'bounce',          // 弹跳动画
            'sparkle',         // 闪烁动画
            'rainbow',         // 彩虹动画
            'party',           // 派对动画
            'victory'          // 胜利动画
        ];
    }

    /**
     * 随机选择一个动画类型并播放
     */
    playRandomAnimation() {
        if (!this.rewardContainer) return;

        const randomType = this.animationTypes[Math.floor(Math.random() * this.animationTypes.length)];
        
        switch (randomType) {
            case 'stars':
                this.showStars();
                break;
            case 'confetti':
                this.showConfetti();
                break;
            case 'fireworks':
                this.showFireworks();
                break;
            case 'emojiRain':
                this.showEmojiRain();
                break;
            case 'celebration':
                this.showCelebration();
                break;
            case 'bounce':
                this.showBounce();
                break;
            case 'sparkle':
                this.showSparkle();
                break;
            case 'rainbow':
                this.showRainbow();
                break;
            case 'party':
                this.showParty();
                break;
            case 'victory':
                this.showVictory();
                break;
            default:
                this.showStars(); // 默认动画
        }
    }

    /**
     * 星星动画
     */
    showStars() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'reward-star';
                star.textContent = '⭐';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 50 + 25}%`;
                this.rewardContainer.appendChild(star);

                setTimeout(() => {
                    star.remove();
                }, 1500);
            }, i * 80);
        }
    }

    /**
     * 彩纸动画
     */
    showConfetti() {
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#BA68C8'];
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'reward-confetti';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = '-10px';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                this.rewardContainer.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 2000);
            }, i * 30);
        }
    }

    /**
     * 烟花动画
     */
    showFireworks() {
        const positions = [
            { x: 20, y: 30 },
            { x: 50, y: 25 },
            { x: 80, y: 30 }
        ];

        positions.forEach((pos, index) => {
            setTimeout(() => {
                // 创建烟花中心
                const center = document.createElement('div');
                center.className = 'reward-firework-center';
                center.style.left = `${pos.x}%`;
                center.style.top = `${pos.y}%`;
                this.rewardContainer.appendChild(center);

                // 创建烟花粒子
                for (let i = 0; i < 12; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'reward-firework-particle';
                    particle.style.left = `${pos.x}%`;
                    particle.style.top = `${pos.y}%`;
                    particle.style.transform = `rotate(${i * 30}deg)`;
                    this.rewardContainer.appendChild(particle);

                    setTimeout(() => {
                        particle.remove();
                    }, 1000);
                }

                setTimeout(() => {
                    center.remove();
                }, 1000);
            }, index * 200);
        });
    }

    /**
     * Emoji雨动画
     */
    showEmojiRain() {
        const emojis = ['🎉', '✨', '🌟', '💫', '🎊', '🎈', '🎁', '🏆', '👏', '👍'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'reward-emoji-rain';
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.left = `${Math.random() * 100}%`;
                emoji.style.top = '-20px';
                emoji.style.animationDelay = `${Math.random() * 0.5}s`;
                this.rewardContainer.appendChild(emoji);

                setTimeout(() => {
                    emoji.remove();
                }, 2000);
            }, i * 50);
        }
    }

    /**
     * 庆祝动画（使用在线GIF）
     */
    showCelebration() {
        const gifUrls = [
            'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif', // 庆祝
            'https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif', // 成功
            'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif'  // 欢呼
        ];

        const gifUrl = gifUrls[Math.floor(Math.random() * gifUrls.length)];
        const gif = document.createElement('img');
        gif.className = 'reward-celebration-gif';
        gif.src = gifUrl;
        gif.alt = '庆祝';
        gif.style.left = '50%';
        gif.style.top = '50%';
        gif.style.transform = 'translate(-50%, -50%)';
        this.rewardContainer.appendChild(gif);

        setTimeout(() => {
            gif.remove();
        }, 2000);
    }

    /**
     * 弹跳动画
     */
    showBounce() {
        const bounceEmojis = ['🎯', '🎪', '🎨', '🎭'];
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const bounce = document.createElement('div');
                bounce.className = 'reward-bounce';
                bounce.textContent = bounceEmojis[Math.floor(Math.random() * bounceEmojis.length)];
                bounce.style.left = `${20 + i * 15}%`;
                bounce.style.top = '40%';
                this.rewardContainer.appendChild(bounce);

                setTimeout(() => {
                    bounce.remove();
                }, 1500);
            }, i * 100);
        }
    }

    /**
     * 闪烁动画
     */
    showSparkle() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'reward-sparkle';
                sparkle.textContent = '✨';
                sparkle.style.left = `${Math.random() * 100}%`;
                sparkle.style.top = `${Math.random() * 100}%`;
                this.rewardContainer.appendChild(sparkle);

                setTimeout(() => {
                    sparkle.remove();
                }, 1200);
            }, i * 60);
        }
    }

    /**
     * 彩虹动画
     */
    showRainbow() {
        const rainbow = document.createElement('div');
        rainbow.className = 'reward-rainbow';
        rainbow.style.left = '50%';
        rainbow.style.top = '30%';
        rainbow.style.transform = 'translateX(-50%)';
        this.rewardContainer.appendChild(rainbow);

        setTimeout(() => {
            rainbow.remove();
        }, 2000);
    }

    /**
     * 派对动画
     */
    showParty() {
        const partyEmojis = ['🎉', '🎊', '🎈', '🎁', '🎪'];
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const party = document.createElement('div');
                party.className = 'reward-party';
                party.textContent = partyEmojis[Math.floor(Math.random() * partyEmojis.length)];
                party.style.left = `${Math.random() * 100}%`;
                party.style.top = `${Math.random() * 100}%`;
                party.style.transform = `rotate(${Math.random() * 360}deg)`;
                this.rewardContainer.appendChild(party);

                setTimeout(() => {
                    party.remove();
                }, 1800);
            }, i * 80);
        }
    }

    /**
     * 胜利动画
     */
    showVictory() {
        const victory = document.createElement('div');
        victory.className = 'reward-victory';
        victory.innerHTML = '🏆<br>太棒了！';
        victory.style.left = '50%';
        victory.style.top = '40%';
        victory.style.transform = 'translate(-50%, -50%)';
        this.rewardContainer.appendChild(victory);

        setTimeout(() => {
            victory.remove();
        }, 2000);
    }
}

// 导出单例
const rewardAnimations = new RewardAnimations();
