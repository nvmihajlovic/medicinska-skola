// JavaScript за лајкове и прегледе
class EngagementTracker {
    constructor(articleSlug) {
        this.articleSlug = articleSlug;
        this.init();
    }
    
    init() {
        // Учитај тренутне бројеве
        this.loadStats();
        
        // Региструј преглед
        this.registerView();
        
        // Додај лајк дугме
        this.setupLikeButton();
    }
    
    async loadStats() {
        try {
            const response = await fetch(`api/engagement.php?action=get&article=${this.articleSlug}`);
            const data = await response.json();
            
            this.updateUI(data);
        } catch (error) {
            console.log('Грешка при учитавању статистика:', error);
        }
    }
    
    async registerView() {
        try {
            const response = await fetch(`api/engagement.php?action=view&article=${this.articleSlug}`);
            const data = await response.json();
            
            this.updateUI(data);
        } catch (error) {
            console.log('Грешка при регистровању прегледа:', error);
        }
    }
    
    async toggleLike() {
        try {
            const response = await fetch(`api/engagement.php?action=like&article=${this.articleSlug}`);
            const data = await response.json();
            
            this.updateUI(data);
            
            // Анимација лајк дугмета
            const likeBtn = document.querySelector('.like-btn');
            likeBtn.classList.add('liked-animation');
            setTimeout(() => likeBtn.classList.remove('liked-animation'), 300);
            
        } catch (error) {
            console.log('Грешка при лајковању:', error);
        }
    }
    
    setupLikeButton() {
        const likeBtn = document.querySelector('.like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', () => this.toggleLike());
        }
    }
    
    updateUI(data) {
        // Ажурирај бројеве
        const viewsElement = document.querySelector('.views-count');
        const likesElement = document.querySelector('.likes-count');
        const likeBtn = document.querySelector('.like-btn');
        
        if (viewsElement) viewsElement.textContent = data.views || 0;
        if (likesElement) likesElement.textContent = data.likes || 0;
        
        // Ажурирај лајк дугме
        if (likeBtn && data.hasOwnProperty('liked')) {
            if (data.liked) {
                likeBtn.classList.add('liked');
                likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                likeBtn.classList.remove('liked');
                likeBtn.innerHTML = '<i class="far fa-heart"></i>';
            }
        }
    }
}

// CSS стајлови за лајкове и прегледе
const engagementStyles = `
.engagement-stats {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
    padding: 15px;
    background: rgba(74, 144, 226, 0.1);
    border-radius: 8px;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #4a90e2;
    font-weight: 500;
}

.stat-item i {
    font-size: 18px;
}

.like-btn {
    background: none;
    border: 2px solid #4a90e2;
    color: #4a90e2;
    padding: 8px 15px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
}

.like-btn:hover {
    background: #4a90e2;
    color: white;
    transform: translateY(-2px);
}

.like-btn.liked {
    background: #e74c3c;
    border-color: #e74c3c;
    color: white;
}

.like-btn.liked:hover {
    background: #c0392b;
    border-color: #c0392b;
}

.liked-animation {
    animation: likeAnimation 0.3s ease;
}

@keyframes likeAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

.views-count, .likes-count {
    font-weight: 600;
    color: #2c3e50;
}
`;

// Додај стајлове у head
const styleSheet = document.createElement('style');
styleSheet.textContent = engagementStyles;
document.head.appendChild(styleSheet);

// Експортуј за коришћење
window.EngagementTracker = EngagementTracker;