/**
 * 动画控制器
 * 管理实物计数动画
 */
class AnimationController {
    constructor() {
        this.objectContainer = null;
        this.currentObjects = [];
        this.itemsPerRow = 5; // 每行5个
        
        // 丰富的图标类型库
        this.iconCategories = {
            animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'],
            furniture: ['🛋️', '🪑', '🛏️', '🚪', '🪟', '🪞', '💡', '🖼️'],
            vehicles: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛴', '🚲'],
            planets: ['🌍', '🌎', '🌏', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '⭐', '🌟', '✨'],
            food: ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍊', '🍋', '🍍', '🥭', '🍈', '🍐'],
            nature: ['🌳', '🌲', '🌴', '🌵', '🌷', '🌹', '🌺', '🌻', '🌼', '🌸', '🌾', '🌿', '🍀'],
            toys: ['🧸', '🎈', '🎁', '🎀', '🎪', '🎭', '🎨', '🎯', '🎲', '🪀', '🪁'],
            sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🏒', '🏑', '🏏']
        };
        
        // 所有图标列表（用于随机选择）
        this.allIcons = [
            ...this.iconCategories.animals,
            ...this.iconCategories.furniture,
            ...this.iconCategories.vehicles,
            ...this.iconCategories.planets,
            ...this.iconCategories.food,
            ...this.iconCategories.nature,
            ...this.iconCategories.toys,
            ...this.iconCategories.sports
        ];
        
        // 为加法运算选择两种不同的图标类型
        this.selectIconTypes();
    }
    
    /**
     * 为当前题目选择两种不同的图标类型
     * 加法的两个图案从同一类别中选择
     */
    selectIconTypes() {
        // 获取所有类别名称
        const categoryNames = Object.keys(this.iconCategories);
        
        // 随机选择一个类别
        const selectedCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
        const iconsInCategory = this.iconCategories[selectedCategory];
        
        // 确保该类别至少有2个图标
        if (iconsInCategory.length < 2) {
            // 如果类别图标不足2个，从所有图标中选择
            const icon1 = this.allIcons[Math.floor(Math.random() * this.allIcons.length)];
            let icon2 = this.allIcons[Math.floor(Math.random() * this.allIcons.length)];
            while (icon2 === icon1) {
                icon2 = this.allIcons[Math.floor(Math.random() * this.allIcons.length)];
            }
            this.objectType1 = icon1;
            this.objectType2 = icon2;
        } else {
            // 从同一类别中选择两个不同的图标
            const icon1 = iconsInCategory[Math.floor(Math.random() * iconsInCategory.length)];
            let icon2 = iconsInCategory[Math.floor(Math.random() * iconsInCategory.length)];
            
            // 确保两个图标不同
            while (icon2 === icon1 && iconsInCategory.length > 1) {
                icon2 = iconsInCategory[Math.floor(Math.random() * iconsInCategory.length)];
            }
            
            this.objectType1 = icon1;
            this.objectType2 = icon2;
        }
    }

    /**
     * 初始化动画容器
     */
    init(objectContainerId) {
        this.objectContainer = document.getElementById(objectContainerId);
    }

    /**
     * 显示实物计数动画
     * 对于加法运算：显示两种不同的图案，每行5个
     */
    showObjectCounting(question) {
        if (!this.objectContainer) return;
        
        // 清空现有对象
        this.clearObjects();
        
        // 为每个新题目选择新的图标类型
        this.selectIconTypes();

        if (question.operator === '+') {
            // 加法：显示两种不同图案，上下两组合并
            this.showAdditionAnimation(question.num1, question.num2, question.answer);
        } else {
            // 减法：显示单一图案，gray out减掉的个数
            this.showSubtractionAnimation(question.num1, question.num2);
        }
    }

    /**
     * 显示加法动画：两种不同图案，上下两组合并，第二组填充在第一组末尾
     */
    showAdditionAnimation(num1, num2, answer) {
        const container = this.objectContainer;
        const rowElements = [];
        let currentRowIndex = 0;
        let itemsInCurrentRow = 0;

        // 创建第一行
        const createRow = () => {
            const row = document.createElement('div');
            row.className = 'object-row';
            container.appendChild(row);
            rowElements.push(row);
            return rowElements.length - 1;
        };

        // 第一组：显示num1个第一种图案
        for (let i = 0; i < num1; i++) {
            if (itemsInCurrentRow === 0 || itemsInCurrentRow >= this.itemsPerRow) {
                currentRowIndex = createRow();
                itemsInCurrentRow = 0;
            }

            const obj = this.createCountingObject(this.objectType1);
            const rowIndex = currentRowIndex;
            
            setTimeout(() => {
                rowElements[rowIndex].appendChild(obj);
                this.currentObjects.push(obj);
            }, i * 80);
            
            itemsInCurrentRow++;
        }

        // 计算第一组最后一行剩余空间
        const remainingSpace = this.itemsPerRow - itemsInCurrentRow;

        // 第二组：显示num2个第二种图案，填充在第一组末尾
        setTimeout(() => {
            // 先填充第一组最后一行剩余空间
            const fillInLastRow = Math.min(num2, remainingSpace);
            for (let i = 0; i < fillInLastRow; i++) {
                const obj = this.createCountingObject(this.objectType2, 'group2');
                setTimeout(() => {
                    rowElements[currentRowIndex].appendChild(obj);
                    this.currentObjects.push(obj);
                    obj.classList.add('merging');
                }, i * 80);
            }

            // 剩余的第二组图案在新行显示
            const remainingSecondGroup = num2 - fillInLastRow;
            let secondGroupRowIndex = currentRowIndex;
            let secondGroupItemsInRow = itemsInCurrentRow + fillInLastRow;

            for (let i = 0; i < remainingSecondGroup; i++) {
                if (secondGroupItemsInRow >= this.itemsPerRow) {
                    secondGroupRowIndex = createRow();
                    secondGroupItemsInRow = 0;
                }

                const obj = this.createCountingObject(this.objectType2, 'group2');
                const rowIndex = secondGroupRowIndex;
                
                setTimeout(() => {
                    rowElements[rowIndex].appendChild(obj);
                    this.currentObjects.push(obj);
                    obj.classList.add('merging');
                }, (fillInLastRow + i) * 80);
                
                secondGroupItemsInRow++;
            }
        }, num1 * 80 + 300);
    }

    /**
     * 显示减法动画：单一图案，gray out减掉的个数
     */
    showSubtractionAnimation(num1, num2) {
        const container = this.objectContainer;
        const rows = Math.ceil(num1 / this.itemsPerRow);
        
        // 创建所有行
        const rowElements = [];
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.className = 'object-row';
            container.appendChild(row);
            rowElements.push(row);
        }

        // 显示num1个对象
        for (let i = 0; i < num1; i++) {
            const rowIndex = Math.floor(i / this.itemsPerRow);
            const obj = this.createCountingObject(this.objectType1);
            
            setTimeout(() => {
                rowElements[rowIndex].appendChild(obj);
                this.currentObjects.push(obj);
            }, i * 80);
        }

        // 延迟gray out num2个对象（从末尾开始）
        setTimeout(() => {
            const objectsToGrayOut = this.currentObjects.slice(-num2);
            objectsToGrayOut.forEach((obj, index) => {
                setTimeout(() => {
                    obj.classList.add('grayed-out');
                }, index * 100);
            });
        }, num1 * 80 + 300);
    }

    /**
     * 创建计数对象
     * @param {string} icon - 图标表情符号
     * @param {string} group - 组别标识（'group1' 或 'group2'），用于加法运算区分
     */
    createCountingObject(icon, group = null) {
        const obj = document.createElement('div');
        obj.className = 'counting-object';
        
        // 根据图标类型添加不同的样式类
        // 使用图标本身作为标识
        obj.setAttribute('data-icon', icon);
        
        // 如果是加法运算，添加组别标识
        if (group) {
            obj.classList.add(group);
        }
        
        // 添加表情符号
        obj.textContent = icon;
        
        // 根据图标类型添加背景色
        this.applyIconStyle(obj, icon);
        
        return obj;
    }
    
    /**
     * 根据图标类型应用样式
     */
    applyIconStyle(obj, icon) {
        // 根据图标类别应用不同的背景色
        if (this.iconCategories.animals.includes(icon)) {
            obj.classList.add('icon-animal');
        } else if (this.iconCategories.furniture.includes(icon)) {
            obj.classList.add('icon-furniture');
        } else if (this.iconCategories.vehicles.includes(icon)) {
            obj.classList.add('icon-vehicle');
        } else if (this.iconCategories.planets.includes(icon)) {
            obj.classList.add('icon-planet');
        } else if (this.iconCategories.food.includes(icon)) {
            obj.classList.add('icon-food');
        } else if (this.iconCategories.nature.includes(icon)) {
            obj.classList.add('icon-nature');
        } else if (this.iconCategories.toys.includes(icon)) {
            obj.classList.add('icon-toy');
        } else if (this.iconCategories.sports.includes(icon)) {
            obj.classList.add('icon-sport');
        } else {
            obj.classList.add('icon-default');
        }
    }

    /**
     * 清除所有计数对象
     */
    clearObjects() {
        if (this.objectContainer) {
            this.objectContainer.innerHTML = '';
        }
        this.currentObjects = [];
    }

    /**
     * 显示题目动画
     */
    animateQuestion(questionElement) {
        if (questionElement) {
            questionElement.classList.add('question-fade');
            setTimeout(() => {
                questionElement.classList.remove('question-fade');
            }, 400);
        }
    }
}

// 导出单例
const animationController = new AnimationController();
