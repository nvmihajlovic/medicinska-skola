// Sticky Navigation - Aktivira se tek kada napusti hero sekciju
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Aktiviraj glassy efekat tek kada potpuno napusti hero sekciju
        if (scrollPosition > heroHeight - 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    } else {
        // Fallback za slučaj da nema hero sekciju
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile Menu Toggle with overlay
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Create overlay if it doesn't exist
let menuOverlay = document.querySelector('.menu-overlay');
if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
}

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking overlay
menuOverlay.addEventListener('click', function() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Active page indicator - Desktop navbar enhancement
(function setActivePage() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    // Get all nav links (both in main menu and dropdowns)
    const allNavLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
    
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remove any existing active class
        link.classList.remove('active');
        
        // Check if this link matches current page
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
            
            // If it's in a dropdown, mark the parent dropdown link as active too
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const parentLink = parentDropdown.querySelector(':scope > .nav-link');
                if (parentLink) {
                    parentLink.classList.add('active');
                }
            }
        }
    });
})();


// Close mobile menu when clicking on a link (except dropdown toggles)
document.querySelectorAll('.nav-link:not(.dropdown > .nav-link)').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Mobile dropdown toggle
document.querySelectorAll('.dropdown > .nav-link').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 1300) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event from bubbling up
            const dropdown = this.parentElement;
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // Toggle show class
            dropdownMenu.classList.toggle('show');
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('show');
                }
            });
        }
    });
});

// Close dropdowns and mobile menu when clicking dropdown items on mobile
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1300) {
            // Close all dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Desktop dropdown hover handling (prevents accidental flashes)
const desktopDropdowns = document.querySelectorAll('.dropdown');

desktopDropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1300) {
            clearTimeout(dropdown._hoverTimer);
            dropdown._hoverTimer = setTimeout(() => {
                dropdown.classList.add('open');
            }, 120);
        }
    });

    dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 1300) {
            clearTimeout(dropdown._hoverTimer);
            dropdown._hoverTimer = null;
            dropdown.classList.remove('open');
        }
    });

    dropdown.addEventListener('focusout', event => {
        if (window.innerWidth > 1300) {
            const nextTarget = event.relatedTarget;
            if (!dropdown.contains(nextTarget)) {
                clearTimeout(dropdown._hoverTimer);
                dropdown._hoverTimer = null;
                dropdown.classList.remove('open');
            }
        }
    });
});

document.querySelectorAll('.nav-menu > li:not(.dropdown)').forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1300) {
            desktopDropdowns.forEach(dropdown => {
                clearTimeout(dropdown._hoverTimer);
                dropdown._hoverTimer = null;
                dropdown.classList.remove('open');
            });
        }
    });

    item.querySelectorAll('a').forEach(link => {
        link.addEventListener('focus', () => {
            if (window.innerWidth > 1300) {
                desktopDropdowns.forEach(dropdown => {
                    clearTimeout(dropdown._hoverTimer);
                    dropdown._hoverTimer = null;
                    dropdown.classList.remove('open');
                });
            }
        });
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth <= 1300) {
        desktopDropdowns.forEach(dropdown => {
            clearTimeout(dropdown._hoverTimer);
            dropdown._hoverTimer = null;
            dropdown.classList.remove('open');
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero button scroll to profiles section
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('.profiles-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.news-card, .info-item, .section-left, .section-right');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Add hover effect for info items
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add click effect for news cards
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('click', function() {
        // You can add navigation to full article here
        console.log('Clicked on news card:', this.querySelector('h3').textContent);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Add search functionality (placeholder)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Претражи...';
    searchInput.className = 'search-input';
    
    // You can add this to navigation if needed
    // document.querySelector('.nav-container').appendChild(searchInput);
}

// Form validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add error styles
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error {
        border: 2px solid #e74c3c !important;
        background-color: rgba(231, 76, 60, 0.1) !important;
    }
`;
document.head.appendChild(errorStyle);

// News page navigation function
function openNewsPage(newsId) {
    // Redirect to dedicated news article pages
    const newsPages = {
        'strucna-praksa': 'strucna-praksa.html',
        'dan-planete': 'dan-planete.html',
        'dan-planete-2': 'dan-planete.html',
        'donacija-krvi': 'donacija-krvi.html',
        'donacija-krvi-2': 'donacija-krvi.html',
        'fruska-gora-maraton': 'fruska-gora-maraton.html',
        'fruska-gora-maraton-2': 'fruska-gora-maraton.html',
        'svetski-dan-poezije': 'svetski-dan-poezije.html',
        'svetski-dan-poezije-2': 'svetski-dan-poezije.html',
        'humanitarna-akcija': 'humanitarna-akcija.html',
        'raspored-ispita': 'raspored-ispita.html',
        'raspored-ispita-2': 'raspored-ispita.html'
    };
    
    if (newsPages[newsId]) {
        window.location.href = newsPages[newsId];
        return;
    }
    
    // Fallback for other news, show modal for now
    const newsData = {
        'humanitarna-akcija': {
            title: 'Хуманитарна кувана стране',
            date: '6. септембар 2023',
            content: 'Дана 6. септембра 2023. године наша школа је организовала хуманитарну акцију прикупљања помоћи за нашег ученика који се налази у тешкој материјалној ситуацији. Ученици и наставници су показали велику солидарност и хуманост. Прикупљена средства ће бити усмерена за подршку породице нашег ученика. Овакве акције показују да наша школска заjedница увек стоји уз оне којима је помоћ потребна.'
        },
        'dan-planete': {
            title: 'Обележавање светског дана планете',
            date: '5. април 2023',
            content: 'У оквиру обележавања Светског дана планете Земље наши ученици су учествовали у еколошким активностима и подизању свести о заштити животне средине. Организоване су различите активности за очување природе, укључујући и садње дрвећа, чишћење околине и едукативне радионице о рециклажи. Ученици су показали велики ентузијазам за заштиту планете.'
        },
        'donacija-krvi': {
            title: 'Акција добровољног давалаца крви 2023',
            date: '6. септембар 2023',
            content: 'Наша школа је поново показала своју хуманост организовањем акције добровољног давања крви. Учествовало је више од 50 ученика и наставника који су дали свој допринос овој племенитој акцији. Крв је драгоцен ресурс који може спасити животе, и наша школска заједница је поново показала спремност да помогне онима којима је то потребно.'
        }
    };
    
    const news = newsData[newsId];
    if (news) {
        // Create a simple modal for now - this can be expanded to full pages later
        alert(`${news.title}\n\n${news.date}\n\n${news.content}`);
        
        // Alternative: You could redirect to separate HTML pages
        // window.location.href = `news/${newsId}.html`;
    }
}

// Hero Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 7000; // 7 seconds

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            indicators[i].classList.remove('active');
        });

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slides
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Click handlers for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            
            // Reset auto-advance timer
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });

    // Pause carousel on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });

        heroSection.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    }
});

// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isActive = accordionItem.classList.contains('active');
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').classList.remove('active');
                }
            });
            
            // Toggle current accordion item
            if (isActive) {
                accordionItem.classList.remove('active');
                accordionContent.classList.remove('active');
            } else {
                accordionItem.classList.add('active');
                accordionContent.classList.add('active');
            }
        });
    });
});

// News Pagination Functionality
document.addEventListener('DOMContentLoaded', function() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const newsPages = {
        1: document.getElementById('news-page-1'),
        2: document.getElementById('news-page-2')
    };
    
    let currentPage = 1;
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetPage = parseInt(this.dataset.page);
            
            if (targetPage === currentPage) return;
            
            // Add loading animation to clicked button
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Add fade-out animation to current page
            newsPages[currentPage].classList.add('fade-out');
            
            // Remove active class from all buttons
            paginationBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // After fade-out animation completes, switch pages
            setTimeout(() => {
                // Hide current page
                newsPages[currentPage].style.display = 'none';
                newsPages[currentPage].classList.remove('fade-out');
                
                // Show target page
                newsPages[targetPage].style.display = 'grid';
                newsPages[targetPage].classList.add('fade-in');
                
                // Reset card animations
                const newCards = newsPages[targetPage].querySelectorAll('.news-card');
                newCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(50px)';
                    card.style.animation = 'none';
                    
                    setTimeout(() => {
                        card.style.animation = `cardFadeIn 0.6s ease forwards`;
                        card.style.animationDelay = `${(index + 1) * 0.1}s`;
                    }, 50);
                });
                
                // Update current page
                currentPage = targetPage;
                
                // Remove fade-in class after animation
                setTimeout(() => {
                    newsPages[targetPage].classList.remove('fade-in');
                }, 600);
            }, 300);
        });
    });
    
    // Initialize first page cards animation
    setTimeout(() => {
        const initialCards = newsPages[1].querySelectorAll('.news-card');
        initialCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            setTimeout(() => {
                card.style.animation = `cardFadeIn 0.6s ease forwards`;
                card.style.animationDelay = `${(index + 1) * 0.1}s`;
            }, 100);
        });
    }, 500);
});

// Weather Widget Functionality
async function initWeatherWidget() {
    try {
        // Try to get weather data from wttr.in (free service, no API key required)
        const response = await fetch('https://wttr.in/Novi%20Sad?format=j1');
        
        if (response.ok) {
            const weatherData = await response.json();
            const current = weatherData.current_condition[0];
            
            // Update weather info with real data
            document.getElementById('temp-value').textContent = current.temp_C;
            document.getElementById('weather-location').textContent = 'Нови Сад, Србија';
            document.getElementById('weather-description').textContent = translateWeatherDesc(current.weatherDesc[0].value);
            document.getElementById('humidity').textContent = current.humidity;
            document.getElementById('wind-speed').textContent = current.windspeedKmph;
            
            // Set weather icon based on weather code
            const weatherIcon = document.getElementById('weather-icon');
            const iconClass = getWeatherIconFromCode(current.weatherCode);
            weatherIcon.innerHTML = `<i class="${iconClass}"></i>`;
            
        } else {
            throw new Error('Weather API failed');
        }
        
    } catch (error) {
        console.log('Using dynamic fallback weather data');
        // Intelligent fallback with realistic seasonal data
        loadDynamicWeather();
    }
    
    // Update time and date
    updateDateTime();
    
    // Update time every second
    setInterval(updateDateTime, 1000);
}

function loadDynamicWeather() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMonth = now.getMonth(); // 0-11
    
    // Realistic temperatures for November in Novi Sad
    let baseTemp = 12;
    if (currentMonth === 10) baseTemp = 12; // November
    else if (currentMonth === 11) baseTemp = 6; // December
    else if (currentMonth === 0) baseTemp = 3; // January
    else if (currentMonth === 1) baseTemp = 6; // February
    else if (currentMonth === 2) baseTemp = 11; // March
    else if (currentMonth === 3) baseTemp = 16; // April
    else if (currentMonth === 4) baseTemp = 21; // May
    else if (currentMonth === 5) baseTemp = 25; // June
    else if (currentMonth === 6) baseTemp = 27; // July
    else if (currentMonth === 7) baseTemp = 27; // August
    else if (currentMonth === 8) baseTemp = 22; // September
    else if (currentMonth === 9) baseTemp = 17; // October
    
    // Daily temperature variation
    let tempVariation = 0;
    if (currentHour >= 6 && currentHour < 10) tempVariation = -3; // Early morning
    else if (currentHour >= 10 && currentHour < 14) tempVariation = 2; // Midday
    else if (currentHour >= 14 && currentHour < 18) tempVariation = 3; // Afternoon
    else if (currentHour >= 18 && currentHour < 22) tempVariation = 0; // Evening
    else tempVariation = -5; // Night
    
    const finalTemp = Math.max(baseTemp + tempVariation + Math.random() * 3 - 1.5, 0); // Add some randomness
    
    // Weather conditions based on season and time
    const weatherConditions = [
        { desc: 'облачно', icon: 'fas fa-cloud', humid: 70 + Math.random() * 20 },
        { desc: 'делимично облачно', icon: 'fas fa-cloud-sun', humid: 60 + Math.random() * 15 },
        { desc: 'сунчано', icon: 'fas fa-sun', humid: 50 + Math.random() * 15 },
    ];
    
    let weatherIndex = currentMonth < 3 || currentMonth > 9 ? 0 : Math.floor(Math.random() * 3); // More clouds in winter
    const selectedWeather = weatherConditions[weatherIndex];
    
    document.getElementById('temp-value').textContent = Math.round(finalTemp);
    document.getElementById('weather-location').textContent = 'Нови Сад, Србија';
    document.getElementById('weather-description').textContent = selectedWeather.desc;
    document.getElementById('humidity').textContent = Math.round(selectedWeather.humid);
    document.getElementById('wind-speed').textContent = Math.round(5 + Math.random() * 15); // 5-20 km/h
    
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.innerHTML = `<i class="${selectedWeather.icon}"></i>`;
}

function translateWeatherDesc(englishDesc) {
    const translations = {
        'Clear': 'јасно',
        'Sunny': 'сунчано',
        'Partly cloudy': 'делимично облачно',
        'Cloudy': 'облачно',
        'Overcast': 'затворено',
        'Light rain': 'слаба киша',
        'Moderate rain': 'киша',
        'Heavy rain': 'јака киша',
        'Snow': 'снег',
        'Fog': 'магла',
        'Mist': 'измаглица'
    };
    
    return translations[englishDesc] || englishDesc.toLowerCase();
}

function getWeatherIconFromCode(weatherCode) {
    // Weather code to Font Awesome icon mapping (wttr.in format)
    const iconMap = {
        '113': 'fas fa-sun',           // Sunny/Clear
        '116': 'fas fa-cloud-sun',     // Partly Cloudy
        '119': 'fas fa-cloud',         // Cloudy
        '122': 'fas fa-cloud',         // Overcast
        '143': 'fas fa-smog',          // Mist/Fog
        '176': 'fas fa-cloud-sun-rain', // Light rain
        '179': 'fas fa-cloud-snow',    // Light snow
        '182': 'fas fa-cloud-rain',    // Light sleet
        '185': 'fas fa-cloud-rain',    // Light sleet showers
        '200': 'fas fa-bolt',          // Thundery outbreaks
        '227': 'fas fa-snowflake',     // Blowing snow
        '230': 'fas fa-snowflake',     // Blizzard
        '248': 'fas fa-smog',          // Fog
        '260': 'fas fa-smog',          // Freezing fog
        '263': 'fas fa-cloud-rain',    // Patchy light drizzle
        '266': 'fas fa-cloud-rain',    // Light drizzle
        '281': 'fas fa-cloud-rain',    // Freezing drizzle
        '284': 'fas fa-cloud-rain',    // Heavy freezing drizzle
        '293': 'fas fa-cloud-rain',    // Patchy light rain
        '296': 'fas fa-cloud-rain',    // Light rain
        '299': 'fas fa-cloud-rain',    // Moderate rain at times
        '302': 'fas fa-cloud-rain',    // Moderate rain
        '305': 'fas fa-cloud-rain',    // Heavy rain at times
        '308': 'fas fa-cloud-rain',    // Heavy rain
        '311': 'fas fa-cloud-rain',    // Light freezing rain
        '314': 'fas fa-cloud-rain',    // Moderate/heavy freezing rain
        '317': 'fas fa-cloud-rain',    // Light sleet
        '320': 'fas fa-cloud-rain',    // Moderate/heavy sleet
        '323': 'fas fa-snowflake',     // Patchy light snow
        '326': 'fas fa-snowflake',     // Light snow
        '329': 'fas fa-snowflake',     // Patchy moderate snow
        '332': 'fas fa-snowflake',     // Moderate snow
        '335': 'fas fa-snowflake',     // Patchy heavy snow
        '338': 'fas fa-snowflake',     // Heavy snow
        '350': 'fas fa-cloud-rain',    // Ice pellets
        '353': 'fas fa-cloud-rain',    // Light rain shower
        '356': 'fas fa-cloud-rain',    // Moderate/heavy rain shower
        '359': 'fas fa-cloud-rain',    // Torrential rain shower
        '362': 'fas fa-cloud-rain',    // Light sleet showers
        '365': 'fas fa-cloud-rain',    // Moderate/heavy sleet showers
        '368': 'fas fa-snowflake',     // Light snow showers
        '371': 'fas fa-snowflake',     // Moderate/heavy snow showers
        '374': 'fas fa-cloud-rain',    // Light showers of ice pellets
        '377': 'fas fa-cloud-rain',    // Moderate/heavy showers of ice pellets
        '386': 'fas fa-bolt',          // Patchy light rain with thunder
        '389': 'fas fa-bolt',          // Moderate/heavy rain with thunder
        '392': 'fas fa-bolt',          // Patchy light snow with thunder
        '395': 'fas fa-bolt'           // Moderate/heavy snow with thunder
    };
    
    return iconMap[weatherCode] || 'fas fa-cloud';
}

function updateDateTime() {
    const now = new Date();
    
    // Update time
    const time = now.toLocaleTimeString('sr-RS', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    document.getElementById('current-time').textContent = time;
    
    // Update date
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        locale: 'sr-RS'
    };
    
    const months = [
        'јануар', 'фебруар', 'март', 'април', 'мај', 'јун',
        'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'
    ];
    
    const dateStr = `${now.getDate()}. ${months[now.getMonth()]} ${now.getFullYear()}`;
    document.getElementById('current-date').textContent = dateStr;
}

// Enhanced Weather Widget with Loading States  
function loadWeatherData() {
    const weatherContent = document.getElementById('weather-content');
    const weatherLoading = document.getElementById('weather-loading');
    
    // Show loading state
    if (weatherContent && weatherLoading) {
        weatherContent.style.display = 'none';
        weatherLoading.style.display = 'flex';
    }
    
    // Try to load live weather data
    fetch('https://wttr.in/NoviSad?format=j1')
        .then(response => response.json())
        .then(data => {
            const current = data.current_condition[0];
            
            document.getElementById('temp-value').textContent = current.temp_C;
            document.getElementById('weather-description').textContent = translateWeatherDesc(current.weatherDesc[0].value);
            document.getElementById('humidity').textContent = current.humidity;
            document.getElementById('wind-speed').textContent = current.windspeedKmph;
            document.getElementById('weather-location').textContent = 'Нови Сад, Србија';
            
            // Hide loading, show content
            if (weatherContent && weatherLoading) {
                weatherLoading.style.display = 'none';
                weatherContent.style.display = 'block';
            }
        })
        .catch(error => {
            console.log('Using fallback weather data:', error);
            loadDynamicWeather();
            
            // Hide loading, show content
            if (weatherContent && weatherLoading) {
                weatherLoading.style.display = 'none';
                weatherContent.style.display = 'block';
            }
        });
}

// Back to Top Button Functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            const halfScrollableHeight = (document.documentElement.scrollHeight - window.innerHeight) / 2;
            if (window.pageYOffset > halfScrollableHeight) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Language Switcher Functionality
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // Load saved language preference
    const savedLang = localStorage.getItem('selectedLanguage') || 'sr';
    
    langBtns.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
            
            // Update active state
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Apply saved language on load
    if (savedLang !== 'sr') {
        switchLanguage(savedLang);
    }
}

function switchLanguage(lang) {
    const translations = {
        'sr': {
            'weather-title': 'Vremenska prognoza',
            'nav-home': 'Početna',
            'nav-about': 'O nama', 
            'nav-programs': 'Programi',
            'nav-admissions': 'Upis',
            'nav-research': 'Istraživanje',
            'nav-contact': 'Kontakt',
            'hero-title': 'Добродошли на Медицинску школу',
            'hero-subtitle': 'Обликујте будућност медицине кроз образовање светске класе',
            'cta-apply': 'Пријавите се данас',
            'cta-learn': 'Сазнајте више'
        },
        'en': {
            'weather-title': 'Weather Forecast',
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-programs': 'Programs', 
            'nav-admissions': 'Admissions',
            'nav-research': 'Research',
            'nav-contact': 'Contact',
            'hero-title': 'Welcome to Medical School',
            'hero-subtitle': 'Shape the future of medicine with world-class education',
            'cta-apply': 'Apply Today',
            'cta-learn': 'Learn More'
        }
    };
    
    const texts = translations[lang];
    if (texts) {
        Object.keys(texts).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = texts[key];
            }
        });
    }
    
    // Store language preference
    localStorage.setItem('selectedLanguage', lang);
}

// Mobile Touch Enhancements
function initMobileEnhancements() {
    const carousel = document.querySelector('.hero-carousel');
    if (carousel && 'ontouchstart' in window) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            
            // Add some resistance for smooth feel
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    const indicators = document.querySelectorAll('.indicator');
                    const activeIndicator = document.querySelector('.indicator.active');
                    const currentIndex = Array.from(indicators).indexOf(activeIndicator);
                    const nextIndex = (currentIndex + 1) % indicators.length;
                    indicators[nextIndex].click();
                } else {
                    // Swipe right - previous slide
                    const indicators = document.querySelectorAll('.indicator');
                    const activeIndicator = document.querySelector('.indicator.active');
                    const currentIndex = Array.from(indicators).indexOf(activeIndicator);
                    const prevIndex = (currentIndex - 1 + indicators.length) % indicators.length;
                    indicators[prevIndex].click();
                }
                isDragging = false;
            }
        });
        
        carousel.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
}

// Initialize all new functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWeatherWidget();
    loadWeatherData(); // Load weather with loading states
    initBackToTop();
    initLanguageSwitcher();
    initMobileEnhancements();
});

// GDPR Cookie Consent Functionality
class CookieConsent {
    constructor() {
        this.cookieConsent = document.getElementById('cookieConsent');
        this.cookieSettingsModal = document.getElementById('cookieSettingsModal');
        this.analyticsCookies = document.getElementById('analyticsCookies');
        this.marketingCookies = document.getElementById('marketingCookies');
        
        this.init();
    }
    
    init() {
        // Check if user has already made a choice
        if (!this.getCookie('cookieConsent')) {
            setTimeout(() => {
                this.showCookieConsent();
            }, 1000);
        } else {
            this.loadCookiePreferences();
        }
    }
    
    showCookieConsent() {
        if (this.cookieConsent) {
            this.cookieConsent.classList.add('show');
        }
    }
    
    hideCookieConsent() {
        if (this.cookieConsent) {
            this.cookieConsent.classList.remove('show');
        }
    }
    
    openCookieSettings() {
        if (this.cookieSettingsModal) {
            this.cookieSettingsModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeCookieSettings() {
        if (this.cookieSettingsModal) {
            this.cookieSettingsModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    acceptCookies() {
        this.setCookie('cookieConsent', 'accepted', 365);
        this.setCookie('analyticsCookies', 'true', 365);
        this.setCookie('marketingCookies', 'true', 365);
        this.hideCookieConsent();
        this.loadAnalytics();
        this.loadMarketing();
    }
    
    declineCookies() {
        this.setCookie('cookieConsent', 'declined', 365);
        this.setCookie('analyticsCookies', 'false', 365);
        this.setCookie('marketingCookies', 'false', 365);
        this.hideCookieConsent();
    }
    
    saveAndCloseCookieSettings(acceptAll = false) {
        if (acceptAll) {
            this.acceptCookies();
        } else {
            const analytics = this.analyticsCookies ? this.analyticsCookies.checked : false;
            const marketing = this.marketingCookies ? this.marketingCookies.checked : false;
            
            this.setCookie('cookieConsent', 'custom', 365);
            this.setCookie('analyticsCookies', analytics.toString(), 365);
            this.setCookie('marketingCookies', marketing.toString(), 365);
            
            if (analytics) this.loadAnalytics();
            if (marketing) this.loadMarketing();
        }
        
        this.hideCookieConsent();
        this.closeCookieSettings();
    }
    
    loadCookiePreferences() {
        const analytics = this.getCookie('analyticsCookies') === 'true';
        const marketing = this.getCookie('marketingCookies') === 'true';
        
        if (this.analyticsCookies) this.analyticsCookies.checked = analytics;
        if (this.marketingCookies) this.marketingCookies.checked = marketing;
        
        if (analytics) this.loadAnalytics();
        if (marketing) this.loadMarketing();
    }
    
    loadAnalytics() {
        // Load Google Analytics or other analytics tools
        console.log('Analytics cookies accepted - loading analytics...');
        
        // Example Google Analytics 4 code
        /*
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
        */
    }
    
    loadMarketing() {
        // Load marketing pixels, remarketing tags, etc.
        console.log('Marketing cookies accepted - loading marketing tools...');
        
        // Example Facebook Pixel code
        /*
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
        */
    }
    
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }
    
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

// Global functions for HTML onclick events
function openCookieSettings() {
    if (window.cookieConsent) {
        window.cookieConsent.openCookieSettings();
    }
}

function closeCookieSettings() {
    if (window.cookieConsent) {
        window.cookieConsent.closeCookieSettings();
    }
}

function acceptCookies() {
    if (window.cookieConsent) {
        window.cookieConsent.acceptCookies();
    }
}

function declineCookies() {
    if (window.cookieConsent) {
        window.cookieConsent.declineCookies();
    }
}

function saveAndCloseCookieSettings(acceptAll) {
    if (window.cookieConsent) {
        window.cookieConsent.saveAndCloseCookieSettings(acceptAll);
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cookieConsent = new CookieConsent();
    initScrollAnimations();
    updateCopyrightYear();
    initFooterWeatherWidget();
});

// Update Copyright Year Dynamically
function updateCopyrightYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Medical Weather Widget
function initFooterWeatherWidget() {
    initCompactWeatherWidget();
    updateDateTime();
    // Ažuriraj vreme svakih 30 sekundi
    setInterval(updateDateTime, 30000);
}

function initCompactWeatherWidget() {
    // Simulacija vremenskih i zdravstvenih podataka
    const weatherData = {
        temperature: Math.floor(Math.random() * 25) + 5, // 5-30°C
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        uvIndex: Math.floor(Math.random() * 10) + 1, // 1-10
        airQuality: ['Одличан', 'Добар', 'Умерен', 'Лош'][Math.floor(Math.random() * 4)],
        description: ['Сунчано', 'Делимично облачно', 'Облачно', 'Кишовито'][Math.floor(Math.random() * 4)]
    };

    // Ažuriraj osnovne vremenske podatke
    const tempElement = document.querySelector('.weather-temp');
    const descElement = document.querySelector('.weather-description');
    
    if (tempElement) tempElement.textContent = `${weatherData.temperature}°C`;
    if (descElement) descElement.textContent = weatherData.description;

    // Ažuriraj kompaktne zdravstvene podatke
    updateCompactHealthData(weatherData);
    
    // Ažuriraj zdravstvenu preporuku
    updateCompactHealthTip(weatherData);
}

function updateHealthIndicators(data) {
    // UV indeks
    const uvValue = document.querySelector('.uv-index .indicator-value');
    const uvAdvice = document.querySelector('.uv-index .indicator-advice');
    if (uvValue && uvAdvice) {
        uvValue.textContent = data.uvIndex;
        if (data.uvIndex <= 2) {
            uvValue.className = 'indicator-value good';
            uvAdvice.textContent = 'Низак ризик - не требаму заштита';
        } else if (data.uvIndex <= 5) {
            uvValue.className = 'indicator-value moderate';
            uvAdvice.textContent = 'Препоручује се крема за сунчање';
        } else if (data.uvIndex <= 7) {
            uvValue.className = 'indicator-value moderate';
            uvAdvice.textContent = 'Заштита обавезна - шешир и наочаре';
        } else {
            uvValue.className = 'indicator-value poor';
            uvAdvice.textContent = 'Избегавати излагање сунцу';
        }
    }

    // Kvalitet vazduha
    const airValue = document.querySelector('.air-quality .indicator-value');
    const airAdvice = document.querySelector('.air-quality .indicator-advice');
    if (airValue && airAdvice) {
        airValue.textContent = data.airQuality;
        switch(data.airQuality) {
            case 'Одличан':
                airValue.className = 'indicator-value good';
                airAdvice.textContent = 'Идеално за све активности на отвореном';
                break;
            case 'Добар':
                airValue.className = 'indicator-value good';  
                airAdvice.textContent = 'Повољно за активности на отвореном';
                break;
            case 'Умерен':
                airValue.className = 'indicator-value moderate';
                airAdvice.textContent = 'Осетљиве особе треба да ограниче активности';
                break;
            default:
                airValue.className = 'indicator-value poor';
                airAdvice.textContent = 'Избегавати активности на отвореном';
        }
    }

    // Alergijski rizik
    const allergyValue = document.querySelector('.allergy-risk .indicator-value');
    const allergyAdvice = document.querySelector('.allergy-risk .indicator-advice');
    if (allergyValue && allergyAdvice) {
        allergyValue.textContent = data.allergyRisk;
        switch(data.allergyRisk) {
            case 'Низак':
                allergyValue.className = 'indicator-value good';
                allergyAdvice.textContent = 'Мали ризик од полена и алергена';
                break;
            case 'Умерен':
                allergyValue.className = 'indicator-value moderate';
                allergyAdvice.textContent = 'Алергичари треба да узму лекове';
                break;
            default:
                allergyValue.className = 'indicator-value poor';
                allergyAdvice.textContent = 'Висок ниво полена - избегавати излазак';
        }
    }
}

function updateMedicalDetails(data) {
    // Vlažnost
    const humidityValue = document.querySelector('.medical-detail:nth-child(1) .detail-value');
    const humidityNote = document.querySelector('.medical-detail:nth-child(1) .health-note');
    if (humidityValue && humidityNote) {
        humidityValue.textContent = `${data.humidity}%`;
        if (data.humidity >= 40 && data.humidity <= 70) {
            humidityNote.textContent = 'Оптимално за дисање и кожу';
        } else if (data.humidity < 40) {
            humidityNote.textContent = 'Суво - може иритирати респираторни систем';
        } else {
            humidityNote.textContent = 'Влажно - могуће проблеми са алергијама';
        }
    }

    // Pritisak
    const pressureValue = document.querySelector('.medical-detail:nth-child(2) .detail-value');
    const pressureNote = document.querySelector('.medical-detail:nth-child(2) .health-note');
    if (pressureValue && pressureNote) {
        pressureValue.textContent = `${data.pressure} hPa`;
        if (data.pressure >= 1000 && data.pressure <= 1020) {
            pressureNote.textContent = 'Стабилан - без утицаја на артритис';
        } else if (data.pressure < 1000) {
            pressureNote.textContent = 'Низак - могући болови у зглобовима';
        } else {
            pressureNote.textContent = 'Висок - могуће главобоље';
        }
    }

    // Vetar
    const windValue = document.querySelector('.medical-detail:nth-child(3) .detail-value');
    const windNote = document.querySelector('.medical-detail:nth-child(3) .health-note');
    if (windValue && windNote) {
        windValue.textContent = `${data.windSpeed} km/h`;
        if (data.windSpeed <= 15) {
            windNote.textContent = 'Благ ветар - добар за проветравање';
        } else if (data.windSpeed <= 25) {
            windNote.textContent = 'Умерен ветар - може подићи прашину';
        } else {
            windNote.textContent = 'Јак ветар - избегавати активности споља';
        }
    }
}

function updateHealthRecommendations(data) {
    const recommendations = document.querySelectorAll('.recommendation span');
    if (recommendations.length >= 3) {
        // Prva preporuka - aktivnosti
        if (data.temperature >= 15 && data.temperature <= 25 && data.airQuality !== 'Лош') {
            recommendations[0].textContent = 'Повољно време за шетњу и вежбање';
        } else if (data.temperature < 5) {
            recommendations[0].textContent = 'Хладно - ограничити активности споља';
        } else if (data.temperature > 30) {
            recommendations[0].textContent = 'Врело - избегавати напоре на сунцу';
        } else {
            recommendations[0].textContent = 'Умерено повољно за активности';
        }

        // Druga preporuka - astma
        if (data.humidity >= 40 && data.humidity <= 70 && data.airQuality === 'Добар') {
            recommendations[1].textContent = 'Пацијенти са астмом - повољни услови';
        } else {
            recommendations[1].textContent = 'Пацијенти са астмом - будите опрезни';
        }

        // Treća preporuka - UV
        if (data.uvIndex > 3) {
            recommendations[2].textContent = 'Носити наочаре и шешир због UV зрачења';
        } else {
            recommendations[2].textContent = 'UV зрачење умерено - основна заштита';
        }
    }
}

function updateCompactHealthData(data) {
    // UV indeks
    const uvValue = document.querySelector('.uv-value');
    if (uvValue) {
        uvValue.textContent = data.uvIndex;
        if (data.uvIndex <= 2) {
            uvValue.className = 'health-value good';
        } else if (data.uvIndex <= 5) {
            uvValue.className = 'health-value moderate';
        } else {
            uvValue.className = 'health-value poor';
        }
    }

    // Kvalitet vazduha
    const airValue = document.querySelector('.air-value');
    if (airValue) {
        airValue.textContent = data.airQuality;
        switch(data.airQuality) {
            case 'Одличан':
            case 'Добар':
                airValue.className = 'health-value good';
                break;
            case 'Умерен':
                airValue.className = 'health-value moderate';
                break;
            default:
                airValue.className = 'health-value poor';
        }
    }

    // Vlažnost
    const humidityValue = document.querySelector('.humidity-value');
    if (humidityValue) {
        humidityValue.textContent = `${data.humidity}%`;
        if (data.humidity >= 40 && data.humidity <= 70) {
            humidityValue.className = 'health-value good';
        } else {
            humidityValue.className = 'health-value moderate';
        }
    }
}

function updateCompactHealthTip(data) {
    const tipText = document.querySelector('.health-tip-text');
    if (tipText) {
        // Generiši zdravstvenu preporuku na osnovu podataka
        if (data.temperature >= 15 && data.temperature <= 25 && data.airQuality !== 'Лош' && data.uvIndex <= 5) {
            tipText.textContent = 'Повољно време за активности на отвореном';
        } else if (data.temperature < 5) {
            tipText.textContent = 'Хладно - топло се обуците';
        } else if (data.temperature > 30) {
            tipText.textContent = 'Врело - избегавати излагање сунцу';
        } else if (data.uvIndex > 7) {
            tipText.textContent = 'Висок UV - обавезна заштита од сунца';
        } else if (data.airQuality === 'Лош') {
            tipText.textContent = 'Лош ваздух - ограничити активности споља';
        } else if (data.humidity < 40) {
            tipText.textContent = 'Суво - пијте више воде';
        } else if (data.humidity > 80) {
            tipText.textContent = 'Влажно - могући проблеми са алергијама';
        } else {
            tipText.textContent = 'Умерено повољни услови';
        }
    }
}

function updateDateTime() {
    const currentTime = document.getElementById('current-time');
    
    if (currentTime) {
        const now = new Date();
        
        // Formatiranje vremena
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit'
        };
        currentTime.textContent = now.toLocaleTimeString('sr-RS', timeOptions);
    }
}

// Scroll Reveal Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animateElements = document.querySelectorAll('.news-card, .quick-info-card, .calendar-card, .section-card, .resource-card, .document-card, .team-card, .club-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
}

// Parallax Effect for Page Headers
window.addEventListener('scroll', () => {
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        pageHeader.style.transform = `translateY(${parallax}px)`;
    }
});

// ============================================
// ACCORDION FOR EDUCATION PROFILES (MOBILE)
// ============================================

// ============================================
// TABS FOR EDUCATION PROFILES - ENHANCED ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    console.log('Tab buttons found:', tabButtons.length);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Tab clicked:', this.getAttribute('data-tab'));
            
            const targetTab = this.getAttribute('data-tab');
            const tabsContainer = this.closest('.subjects-tabs');
            
            if (!tabsContainer) {
                console.error('Tabs container not found!');
                return;
            }
            
            // Find currently active panel
            const currentPanel = tabsContainer.querySelector('.tab-panel.active');
            const targetPanel = document.getElementById(targetTab);
            
            if (!targetPanel) {
                console.error('Target panel not found:', targetTab);
                return;
            }
            
            // Skip if clicking on already active tab
            if (currentPanel === targetPanel) {
                return;
            }
            
            // Add fade-out animation to current panel
            if (currentPanel) {
                currentPanel.classList.add('fade-out');
                
                // Wait for fade-out animation to complete
                setTimeout(() => {
                    currentPanel.classList.remove('active', 'fade-out');
                    
                    // Show new panel with fade-in animation
                    targetPanel.classList.add('active');
                }, 400); // Match CSS animation duration
            } else {
                // No current panel, just show the target
                targetPanel.classList.add('active');
            }
            
            // Update button states
            tabsContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            console.log('Active panel:', targetTab);
        });
    });
});

// Console log for development
console.log('Medicinska Škola website loaded successfully with enhanced UI/UX animations!');

// ===========================
// SOCIAL SHARE FUNCTIONALITY
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('facebook') ? 'facebook' :
                           this.classList.contains('twitter') ? 'twitter' :
                           this.classList.contains('linkedin') ? 'linkedin' :
                           this.classList.contains('whatsapp') ? 'whatsapp' :
                           this.classList.contains('telegram') ? 'telegram' :
                           this.classList.contains('viber') ? 'viber' :
                           this.classList.contains('copy') ? 'copy' : null;
            
            if (platform) {
                shareContent(platform);
            }
        });
    });
});

function shareContent(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        whatsapp: `https://wa.me/?text=${title}%20${url}`,
        telegram: `https://t.me/share/url?url=${url}&text=${title}`,
        viber: `viber://forward?text=${title}%20${url}`
    };
    
    if (platform === 'copy') {
        // Copy link to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            const btn = document.querySelector('.share-btn.copy');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Копирано!';
            btn.style.background = '#27ae60';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Не могу да копирам линк');
        });
    } else if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}