// Систем за евидентирање прегледа и лајкова - ФИНАЛНА ВЕРЗИЈА
class EngagementTracker {
    constructor(articleSlug) {
        this.articleSlug = articleSlug;
        this.apiUrl = 'api/engagement.php';
        this.init();
    }
    
    init() {
        // Региструј преглед и учитај тренутне бројеве
        this.registerView();
        
        // Постави лајк дугме
        this.setupLikeButton();
    }
    
    async registerView() {
        try {
            const response = await fetch(`${this.apiUrl}?action=view&article=${this.articleSlug}`);
            const data = await response.json();
            
            if (data.error) {
                console.error('Грешка:', data.error);
                return;
            }
            
            this.updateUI(data);
        } catch (error) {
            console.error('Грешка при регистровању прегледа:', error);
        }
    }
    
    async toggleLike() {
        const likeBtn = document.querySelector('.like-btn');
        if (!likeBtn) return;
        
        // Привремено онемогући дугме
        likeBtn.disabled = true;
        
        try {
            const response = await fetch(`${this.apiUrl}?action=like&article=${this.articleSlug}`);
            const data = await response.json();
            
            if (data.error) {
                console.error('Грешка:', data.error);
                likeBtn.disabled = false;
                return;
            }
            
            this.updateUI(data);
            
            // Анимација
            likeBtn.classList.add('liked-animation');
            setTimeout(() => {
                likeBtn.classList.remove('liked-animation');
                likeBtn.disabled = false;
            }, 300);
            
        } catch (error) {
            console.error('Грешка при лајковању:', error);
            likeBtn.disabled = false;
        }
    }
    
    setupLikeButton() {
        const likeBtn = document.querySelector('.like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLike();
            });
        }
    }
    
    updateUI(data) {
        // Ажурирај број прегледа - СВИХ елемената (meta + engagement panel)
        const viewsElements = document.querySelectorAll('.views-count, .views-count-large');
        viewsElements.forEach(el => {
            el.textContent = this.formatNumber(data.views || 0);
        });
        
        // Ажурирај број лајкова - СВИХ елемената (meta + engagement panel)
        const likesElements = document.querySelectorAll('.likes-count, .likes-count-large');
        likesElements.forEach(el => {
            el.textContent = this.formatNumber(data.likes || 0);
        });
        
        // Ажурирај лајк дугме
        const likeBtn = document.querySelector('.like-btn');
        if (likeBtn && data.hasOwnProperty('liked')) {
            if (data.liked) {
                likeBtn.classList.add('liked');
                likeBtn.querySelector('i').className = 'fas fa-heart';
            } else {
                likeBtn.classList.remove('liked');
                likeBtn.querySelector('i').className = 'far fa-heart';
            }
        }
    }
    
    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
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