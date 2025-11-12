// CMS - Sistem za upravljanje sadržajem
class SimpleCMS {
    constructor() {
        this.init();
    }

    init() {
        // Učitaj konfiguraciju i prikaz sadržaj
        this.loadContent();
        this.addEditMode();
    }

    loadContent() {
        // Učitaj navigation
        this.updateNavigation();
        
        // Učitaj hero sekciju
        this.updateHero();
        
        // Učitaj profile sekciju
        this.updateProfiles();
        
        // Učitaj school info
        this.updateSchoolInfo();
        
        // Učitaj vesti
        this.updateNews();
        
        // Učitaj footer
        this.updateFooter();
    }

    updateNavigation() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && websiteConfig.navigation) {
            navMenu.innerHTML = '';
            websiteConfig.navigation.forEach((item, index) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.className = index === websiteConfig.navigation.length - 1 ? 'nav-link contact-btn' : 'nav-link';
                a.textContent = item;
                li.appendChild(a);
                navMenu.appendChild(li);
            });
        }
    }

    updateHero() {
        const heroTitle = document.querySelector('.hero-title');
        const ctaButton = document.querySelector('.cta-button');
        
        if (heroTitle && websiteConfig.hero.title) {
            heroTitle.textContent = websiteConfig.hero.title;
        }
        
        if (ctaButton && websiteConfig.hero.buttonText) {
            ctaButton.textContent = websiteConfig.hero.buttonText;
        }
    }

    updateProfiles() {
        const profileTitle = document.querySelector('.section-left h2');
        const profileDescription = document.querySelector('.section-left p');
        const profileList = document.querySelector('.profile-list');
        const additionalText = document.querySelector('.section-left p:last-child');

        if (profileTitle && websiteConfig.profiles.title) {
            profileTitle.textContent = websiteConfig.profiles.title;
        }

        if (profileDescription && websiteConfig.profiles.description) {
            profileDescription.textContent = websiteConfig.profiles.description;
        }

        if (profileList && websiteConfig.profiles.list) {
            profileList.innerHTML = '';
            websiteConfig.profiles.list.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-medical-cross"></i> ${item}`;
                profileList.appendChild(li);
            });
        }

        if (additionalText && websiteConfig.profiles.additionalText) {
            additionalText.textContent = websiteConfig.profiles.additionalText;
        }
    }

    updateSchoolInfo() {
        const schoolTitle = document.querySelector('.section-right h3');
        const schoolItems = document.querySelector('.school-info');

        if (schoolTitle && websiteConfig.schoolInfo.title) {
            schoolTitle.textContent = websiteConfig.schoolInfo.title;
        }

        if (schoolItems && websiteConfig.schoolInfo.items) {
            schoolItems.innerHTML = '';
            websiteConfig.schoolInfo.items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'info-item';
                div.innerHTML = `<i class="fas fa-plus"></i><span>${item}</span>`;
                schoolItems.appendChild(div);
            });
        }
    }

    updateNews() {
        const newsTitle = document.querySelector('.news-section h2');
        const newsGrid = document.querySelector('.news-grid');

        if (newsTitle && websiteConfig.news.title) {
            newsTitle.textContent = websiteConfig.news.title;
        }

        if (newsGrid && websiteConfig.news.articles) {
            newsGrid.innerHTML = '';
            websiteConfig.news.articles.forEach((article, index) => {
                const articleElement = document.createElement('article');
                articleElement.className = 'news-card';
                articleElement.setAttribute('onclick', `openNewsPage('news-${index}')`);
                articleElement.innerHTML = `
                    <div class="news-content">
                        <div class="news-image-frame">
                            <img src="${article.image}" alt="${article.title}">
                        </div>
                        <h3>${article.title}</h3>
                        <div class="news-divider"></div>
                        <p class="news-date">${article.date} | ${article.comments}</p>
                        <p class="news-excerpt">${article.excerpt}</p>
                    </div>
                `;
                newsGrid.appendChild(articleElement);
            });
        }
    }

    updateFooter() {
        const footerSchoolName = document.querySelector('.footer-info p:first-child');
        const usefulLinksTitle = document.querySelector('.footer-column:first-child h4');
        const usefulLinksList = document.querySelector('.footer-column:first-child ul');
        const contactTitle = document.querySelector('.footer-column:last-child h4');
        const contactInfo = document.querySelector('.footer-column:last-child p');

        if (footerSchoolName && websiteConfig.footer.schoolName) {
            footerSchoolName.innerHTML = websiteConfig.footer.schoolName;
        }

        if (usefulLinksTitle && websiteConfig.footer.usefulLinks.title) {
            usefulLinksTitle.textContent = websiteConfig.footer.usefulLinks.title;
        }

        if (usefulLinksList && websiteConfig.footer.usefulLinks.links) {
            usefulLinksList.innerHTML = '';
            websiteConfig.footer.usefulLinks.links.forEach(link => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="#">${link}</a>`;
                usefulLinksList.appendChild(li);
            });
        }

        if (contactTitle && websiteConfig.footer.contact.title) {
            contactTitle.textContent = websiteConfig.footer.contact.title;
        }

        if (contactInfo && websiteConfig.footer.contact.info) {
            contactInfo.innerHTML = websiteConfig.footer.contact.info;
        }
    }

    // Dodaj edit mode za lakše uređivanje
    addEditMode() {
        // Dodaj edit dugme (samo za development)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const editButton = document.createElement('button');
            editButton.textContent = '✏️ Edit Mode';
            editButton.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 9999;
                padding: 10px;
                background: #e74c3c;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            `;
            editButton.onclick = () => this.toggleEditMode();
            document.body.appendChild(editButton);
        }
    }

    toggleEditMode() {
        alert('Edit mode bi ovde omogućio inline editing. Za sada menjaj sadržaj u config.js fajlu!');
    }

    // Funkcija za dodavanje novih vesti
    addNews(newsData) {
        websiteConfig.news.articles.unshift(newsData);
        this.updateNews();
    }

    // Funkcija za uklanjanje vesti
    removeNews(index) {
        websiteConfig.news.articles.splice(index, 1);
        this.updateNews();
    }
}

// Pokreni CMS kada se stranica učita
document.addEventListener('DOMContentLoaded', function() {
    window.cms = new SimpleCMS();
});