/**
 * 题目生成器
 * 生成20以内加减法题目
 */
class QuestionGenerator {
    constructor() {
        this.settings = {
            questionType: 'mixed', // 'addition', 'subtraction', 'mixed'
            numberRange: 20, // 最大数字范围
            minNumber: 1
        };
    }

    /**
     * 更新设置
     */
    updateSettings(settings) {
        this.settings = { ...this.settings, ...settings };
    }

    /**
     * 生成随机整数
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 生成加法题目
     */
    generateAddition() {
        const max = this.settings.numberRange;
        let num1, num2, answer;
        
        // 确保答案在0-20范围内
        do {
            num1 = this.randomInt(this.settings.minNumber, max);
            num2 = this.randomInt(this.settings.minNumber, max);
            answer = num1 + num2;
        } while (answer > max);
        
        return {
            num1,
            num2,
            operator: '+',
            answer,
            question: `${num1} + ${num2} = ?`
        };
    }

    /**
     * 生成减法题目
     */
    generateSubtraction() {
        const max = this.settings.numberRange;
        let num1, num2, answer;
        
        // 确保结果不为负数
        do {
            num1 = this.randomInt(this.settings.minNumber, max);
            num2 = this.randomInt(this.settings.minNumber, num1); // num2 <= num1
            answer = num1 - num2;
        } while (answer < 0 || answer > max);
        
        return {
            num1,
            num2,
            operator: '-',
            answer,
            question: `${num1} - ${num2} = ?`
        };
    }

    /**
     * 生成混合题目（随机加法或减法）
     */
    generateMixed() {
        const isAddition = Math.random() < 0.5;
        return isAddition ? this.generateAddition() : this.generateSubtraction();
    }

    /**
     * 生成新题目
     */
    generate() {
        let question;
        
        switch (this.settings.questionType) {
            case 'addition':
                question = this.generateAddition();
                break;
            case 'subtraction':
                question = this.generateSubtraction();
                break;
            case 'mixed':
            default:
                question = this.generateMixed();
                break;
        }
        
        return question;
    }

    /**
     * 验证答案
     */
    checkAnswer(question, userAnswer) {
        return question.answer === parseInt(userAnswer, 10);
    }
}

// 导出单例
const questionGenerator = new QuestionGenerator();
