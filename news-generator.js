// News articles data
const newsArticles = {
    'humanitarna-akcija': {
        title: 'Хуманитарна акција за ученика наше школе',
        category: 'Хуманитарне активности',
        categoryClass: 'humanitarian',
        date: '6. септембар 2023.',
        author: 'Администрација школе',
        views: '245',
        image: 'Хуманитарна акција 2023',
        imageClass: 'humanitarian-bg',
        lead: 'Дана 6. септембра 2023. године наша школа је организовала хуманитарну акцију прикупљања помоћи за нашег ученика који се налази у тешкој материјалној ситуацији. Ученици и наставници су показали велику солидарност и хуманост.',
        content: `
            <h2>Организација акције</h2>
            <p>Хуманитарна акција је организована у сарадњи са студентским парламентом и наставничким већем. Циљ акције био је прикупљање финансијских средстава, школског материјала, одеће и других потребних ствари за нашег ученика који се налази у веома тешкој материјалној ситуацији.</p>

            <blockquote class="article-quote">
                <p>"Солидарност и хуманост су основне вредности наше образовне заједнице. Када видимо да неко од наших ученика има потребу за помоћ, сви се окупљамо као једна велика породица."</p>
                <cite>- Директор школе</cite>
            </blockquote>

            <h2>Резултати акције</h2>
            <p>Акција је превазишла сва очекивања. Прикупљено је:</p>
            <ul class="article-list">
                <li><strong>Финансијска средства:</strong> Преко 50.000 динара</li>
                <li><strong>Школски материјал:</strong> Уџбеници, свеске, прибор за цртање</li>
                <li><strong>Одећа и обућа:</strong> Сезонска одећа и спортска опрема</li>
                <li><strong>Остало:</strong> Намирнице и хигијенски производи</li>
            </ul>

            <h2>Порука благодарности</h2>
            <p>Породица ученика изразила је велику захвалност свим ученицима, наставницима и особљу школе који су учествовали у овој племенитој акцији. Овакви примери солидарности показују да је наша школска заједница заиста јединствена.</p>

            <div class="article-highlight">
                <h3><i class="fas fa-heart"></i> Будући планови</h3>
                <p>Школа планира да овакве хуманитарне акције организује редовно, како би помогла свим ученицима који се нађу у тешким ситуацијама. Такође се разматра успостављање сталног фонда за хуманитарну помоћ.</p>
            </div>
        `,
        tags: ['хуманитарна акција', 'солидарност', 'ученици', 'помоћ', 'заједница']
    },
    
    'dan-planete': {
        title: 'Обележавање светског дана планете',
        category: 'Еколошке активности',
        categoryClass: 'ecology',
        date: '5. април 2023.',
        author: 'Еколошка секција',
        views: '189',
        image: 'Дан планете Земље',
        imageClass: 'ecology-bg',
        lead: 'У оквиру обележавања Светског дана планете Земље наши ученици су учествовали у еколошким активностима и подизању свести о заштити животне средине.',
        content: `
            <h2>Активности током дана</h2>
            <p>Организоване су различите активности за очување природе, укључујући и садње дрвећа, чишћење околине и едукативне радионице о рециклажи. Ученици су показали велики ентузијазам за заштиту планете.</p>

            <blockquote class="article-quote">
                <p>"Наша планета је једина коју имамо. Свако мало дело за њену заштиту је велики корак ка бољој будућности."</p>
                <cite>- Координатор еколошке секције</cite>
            </blockquote>

            <h2>Постигнути резултати</h2>
            <ul class="article-list">
                <li><strong>Засађено:</strong> 25 младих стабала у школском дворишту</li>
                <li><strong>Прикупљено:</strong> 150 кг рециклажног материјала</li>
                <li><strong>Учесници:</strong> Преко 80 ученика и наставника</li>
                <li><strong>Радионице:</strong> 5 едукативних сесија о заштити животне средине</li>
            </ul>

            <div class="article-highlight">
                <h3><i class="fas fa-leaf"></i> Наставак активности</h3>
                <p>Планирамо да ове активности настављамо током целе године, са фокусом на смањење отпада, енергетску ефикасност и промовисање одрживог развоја.</p>
            </div>
        `,
        tags: ['екологија', 'дан планете', 'рециклажа', 'природа', 'заштита околине']
    },

    'donacija-krvi': {
        title: 'Акција добровољног давалаца крви 2025',
        category: 'Здравствене активности',
        categoryClass: 'health',
        date: '6. септембар 2025.',
        author: 'Здравствена служба',
        views: '298',
        image: 'Добровољно давање крви',
        imageClass: 'health-bg',
        lead: 'Наша школа је поново показала своју хуманост организовањем акције добровољног давања крви. Учествовало је више од 50 ученика и наставника који су дали свој допринос овој племенитој акцији.',
        content: `
            <h2>Организација акције</h2>
            <p>Akcија је организована у сарадњи са Институтом за трансфузију крви. Медицински тим је био присутан током целог дана како би обезбедио безбедност и комфор свих учесника.</p>

            <blockquote class="article-quote">
                <p>"Давање крви је најплеменитији чин који можемо да учинимо. Свака донација може да спаси до три живота."</p>
                <cite>- Др Марија Петровић, координатор акције</cite>
            </blockquote>

            <h2>Резултати акције</h2>
            <ul class="article-list">
                <li><strong>Учесници:</strong> 52 добровољна даваоца</li>
                <li><strong>Прикупљено:</strong> 23.4 литра крви</li>
                <li><strong>Први пут:</strong> 28 нових давалаца</li>
                <li><strong>Могуће спашени животи:</strong> Преко 140</li>
            </ul>

            <div class="article-highlight">
                <h3><i class="fas fa-heart"></i> Редовне акције</h3>
                <p>Планирамо да овакве акције организујемо тромесечно. Сви заинтересовани могу да се пријаве код школске администрacije.</p>
            </div>
        `,
        tags: ['донација крви', 'хуманост', 'здравље', 'спасавање живота', 'волонтирање']
    },

    'fruska-gora-maraton': {
        title: 'Фрушкогорски маратон 2025',
        category: 'Спортске активности',
        categoryClass: 'sports',
        date: '6. септембар 2025.',
        author: 'Спортска секција',
        views: '167',
        image: 'Фрушкогорски маратон',
        imageClass: 'sports-bg',
        lead: 'Дана 6. септембра наш тим ученика учествовао је на традиционалном Фрушкогорском маратону. Ученици медицинске школе су показали изврсну физичку спремност и тимски дух.',
        content: `
            <h2>Припреме за маратон</h2>
            <p>Припреме за маратон су трајале три месеца. Ученици су тренирали редовно под надзором професора физичког васпитања и спољашњих тренера.</p>

            <blockquote class="article-quote">
                <p>"Спорт није само такмичење, већ и начин да изградимо карактер, истрајност и тимски дух."</p>
                <cite>- Проф. Милан Стојановић, координатор спортских активности</cite>
            </blockquote>

            <h2>Резултати тима</h2>
            <ul class="article-list">
                <li><strong>Учесници:</strong> 12 ученика у различитим категоријама</li>
                <li><strong>Најбољи резултат:</strong> 3. место у категорији младих</li>
                <li><strong>Тимско место:</strong> 7. од 45 школских тимова</li>
                <li><strong>Сви финишери:</strong> 100% успешност</li>
            </ul>

            <div class="article-highlight">
                <h3><i class="fas fa-trophy"></i> Будући планови</h3>
                <p>Планирамо учешће на још већем броју спортских манифестација и организовање сопствених спортских турнира.</p>
            </div>
        `,
        tags: ['маратон', 'спорт', 'такмичење', 'физичка активност', 'тимски дух']
    },

    'svetski-dan-poezije': {
        title: 'Обележавање светског дана поезије',
        category: 'Културне активности',
        categoryClass: 'culture',
        date: '6. септембар 2024.',
        author: 'Културно-уметничко друштво',
        views: '203',
        image: 'Обележавање светског дана поезије',
        imageClass: 'culture-bg',
        lead: 'У школи је живот увек пун позорнице, у оквиру културних активности, ученици су рецитовали најлепшу поезију домаћих и страних аутора. Било је то прелепо искуство за све присутне.',
        content: `
            <h2>Програм вечери</h2>
            <p>Програм је обухватао рецитовање поезије српских и светских песника, као и ауторских радова ученика. Атмосфера је била топла и инспиративна.</p>

            <blockquote class="article-quote">
                <p>"Поезија је језик душе. Кроз стихове изражавамо оно што прозом не можемо да кажемо."</p>
                <cite>- Проф. Ана Николић, професор српског језика</cite>
            </blockquote>

            <h2>Учесници и награде</h2>
            <ul class="article-list">
                <li><strong>Рецитатори:</strong> 18 ученика</li>
                <li><strong>Ауторски радови:</strong> 7 песама ученика</li>
                <li><strong>Публика:</strong> Преко 150 људи</li>
                <li><strong>Награђени:</strong> 3 најбоља рецитатора</li>
            </ul>

            <div class="article-highlight">
                <h3><i class="fas fa-feather-alt"></i> Литерарни конкурс</h3>
                <p>Планирамо покретање редовног литерарног конкурса и издавање школског зборника поезије.</p>
            </div>
        `,
        tags: ['поезија', 'култура', 'рецитовање', 'књижевност', 'уметност']
    },

    'raspored-ispita': {
        title: 'Распоред поправних испита у августовском испитном року 2024/2025',
        category: 'Школске информације',
        categoryClass: 'academic',
        date: '6. септембар 2025.',
        author: 'Студентска служба',
        views: '456',
        image: 'Распоред поправних испита',
        imageClass: 'academic-bg',
        lead: 'Распоред поправних испита у августовском испитном року објављен је на званичној табли школе. Сви заинтересовани ученици могу да се информишу о терминима полагања.',
        content: `
            <h2>Важне информације</h2>
            <p>Поправни испити ће се одржавати од 20. до 30. августа 2025. године. Пријаве се примају до 15. августа у студентској служби.</p>

            <blockquote class="article-quote">
                <p>"Поправни испити су прилика да покажете своје знање и остварите академске циљеве. Препоручујемо темељну припрему."</p>
                <cite>- Секретар школе</cite>
            </blockquote>

            <h2>Услови за полагање</h2>
            <ul class="article-list">
                <li><strong>Пријава:</strong> До 15. августа 2025.</li>
                <li><strong>Документа:</strong> Лична карта и индекс</li>
                <li><strong>Такса:</strong> 2.000 динара по предмету</li>
                <li><strong>Консултације:</strong> Доступне по претходној најави</li>
            </ul>

            <div class="article-highlight">
                <h3><i class="fas fa-graduation-cap"></i> Подршка ученицима</h3>
                <p>Организоваћемо бесплатне консултације за све ученике који полажу поправне испите.</p>
            </div>
        `,
        tags: ['испити', 'распоред', 'полагање', 'студенти', 'августовски рок']
    }
};

// Function to generate article page
function generateArticlePage(articleId) {
    const article = newsArticles[articleId];
    if (!article) return null;

    return `<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} - Медицинска школа</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="pages.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <meta property="og:title" content="${article.title} - Медицинска школа">
    <meta property="og:description" content="${article.lead}">
    <meta property="og:image" content="images/${articleId}.jpg">
    <meta property="og:url" content="https://medicinska-skola.rs/news/${articleId}">
    <meta name="twitter:card" content="summary_large_image">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="container">
            <div class="nav-logo">
                <img src="images/images_preview_rev_1.png" alt="Medicinska Škola Logo" class="logo-img">
            </div>
            <ul class="nav-menu" id="nav-menu">
                <li class="nav-item"><a href="index.html" class="nav-link">О НАМА</a></li>
                <li class="nav-item"><a href="#" class="nav-link">ОБРАЗОВНИ ПРОФИЛИ</a></li>
                <li class="nav-item"><a href="#" class="nav-link">МАТУРСКА ПИТАЊА</a></li>
                <li class="nav-item"><a href="#" class="nav-link">УЧЕНИЦИ И НАСТАВНИЦИ</a></li>
                <li class="nav-item"><a href="#" class="nav-link">ГАЛЕРИЈА</a></li>
                <li class="nav-item"><a href="#" class="nav-link">ЕРАSMУС + ПРОЈЕКТИ</a></li>
                <li class="nav-item"><a href="#" class="nav-link">КОНТАКТ</a></li>
            </ul>
            
            <!-- Language Switcher -->
            <div class="language-switcher">
                <button class="lang-btn active" data-lang="sr">СР</button>
                <button class="lang-btn" data-lang="en">EN</button>
            </div>
            
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <div class="breadcrumb-container">
        <div class="container">
            <div class="breadcrumb">
                <a href="index.html"><i class="fas fa-home"></i> Почетна</a>
                <span class="breadcrumb-separator">/</span>
                <a href="index.html#news">Вести</a>
                <span class="breadcrumb-separator">/</span>
                <span>${article.title}</span>
            </div>
        </div>
    </div>

    <!-- Article Content -->
    <main class="article-main">
        <div class="container">
            <article class="news-article">
                <!-- Article Header -->
                <header class="article-header">
                    <div class="article-category">
                        <span class="category-tag ${article.categoryClass}">${article.category}</span>
                    </div>
                    <h1 class="article-title">${article.title}</h1>
                    <div class="article-meta">
                        <div class="meta-info">
                            <span class="article-date">
                                <i class="fas fa-calendar-alt"></i>
                                ${article.date}
                            </span>
                            <span class="article-author">
                                <i class="fas fa-user"></i>
                                ${article.author}
                            </span>
                            <span class="article-views">
                                <i class="fas fa-eye"></i>
                                ${article.views} прегледа
                            </span>
                        </div>
                    </div>
                </header>

                <!-- Featured Image -->
                <div class="article-featured-image">
                    <div class="image-placeholder ${article.imageClass}">
                        <span>${article.image}</span>
                    </div>
                </div>

                <!-- Article Content -->
                <div class="article-content">
                    <div class="article-lead">
                        <p>${article.lead}</p>
                    </div>

                    ${article.content}
                </div>

                <!-- Social Share Section -->
                <div class="social-share-section">
                    <h3>Подели ову вест</h3>
                    <div class="social-share-buttons">
                        <button class="share-btn facebook" onclick="shareOnFacebook()">
                            <i class="fab fa-facebook-f"></i>
                            <span>Facebook</span>
                        </button>
                        <button class="share-btn twitter" onclick="shareOnTwitter()">
                            <i class="fab fa-twitter"></i>
                            <span>Twitter</span>
                        </button>
                        <button class="share-btn linkedin" onclick="shareOnLinkedIn()">
                            <i class="fab fa-linkedin-in"></i>
                            <span>LinkedIn</span>
                        </button>
                        <button class="share-btn whatsapp" onclick="shareOnWhatsApp()">
                            <i class="fab fa-whatsapp"></i>
                            <span>WhatsApp</span>
                        </button>
                        <button class="share-btn telegram" onclick="shareOnTelegram()">
                            <i class="fab fa-telegram-plane"></i>
                            <span>Telegram</span>
                        </button>
                        <button class="share-btn viber" onclick="shareOnViber()">
                            <i class="fab fa-viber"></i>
                            <span>Viber</span>
                        </button>
                        <button class="share-btn copy-link" onclick="copyLink()">
                            <i class="fas fa-link"></i>
                            <span>Копирај линк</span>
                        </button>
                    </div>
                </div>

                <!-- Tags -->
                <div class="article-tags">
                    <h4>Ознаке:</h4>
                    <div class="tags-container">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>

                <!-- Related Articles -->
                <div class="related-articles">
                    <h3>Сличне вести</h3>
                    <div class="related-grid">
                        <article class="related-card" onclick="window.location.href='donacija-krvi.html'">
                            <div class="related-image">
                                <div class="image-placeholder health-bg">
                                    <span>Донација крви</span>
                                </div>
                            </div>
                            <div class="related-content">
                                <h4>Акција добровољног давалаца крви</h4>
                                <p class="related-date">6. септембар 2025.</p>
                            </div>
                        </article>
                        <article class="related-card" onclick="window.location.href='dan-planete.html'">
                            <div class="related-image">
                                <div class="image-placeholder ecology-bg">
                                    <span>Еколошке активности</span>
                                </div>
                            </div>
                            <div class="related-content">
                                <h4>Дан планете Земље</h4>
                                <p class="related-date">5. април 2023.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </article>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo-container">
                    <div class="footer-logo">
                        <img src="images/Untitled_preview_rev_1.png" alt="Medicinska Škola Footer Logo" class="footer-logo-img">
                    </div>
                    <p class="footer-description">
                        Медицинска школа која припрема будуће здравствене раднике са највишим стандардима образовања и праксе.
                    </p>
                </div>
                
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Брзи линкови</h4>
                        <ul>
                            <li><a href="index.html">Почетна</a></li>
                            <li><a href="o-nama.html">О нама</a></li>
                            <li><a href="#">Образовни профили</a></li>
                            <li><a href="#">Упис</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Информације</h4>
                        <ul>
                            <li><a href="#">Истраживање</a></li>
                            <li><a href="#">Пројекти</a></li>
                            <li><a href="#">Галерија</a></li>
                            <li><a href="#">Контакт</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Контакт</h4>
                        <div class="contact-info">
                            <p><i class="fas fa-map-marker-alt"></i> Адреса: Улица здравља 123, Београд</p>
                            <p><i class="fas fa-phone"></i> Телефон: +381 11 234 5678</p>
                            <p><i class="fas fa-envelope"></i> Email: info@medicinska-skola.rs</p>
                        </div>
                    </div>
                    

                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p>&copy; 2025 Медицинска школа. Сва права задржана.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="backToTop" class="back-to-top" aria-label="Вратите се на врх">
        <i class="fas fa-chevron-up"></i>
    </button>

    <script src="script.js"></script>
    <script>
        // Social sharing functions
        function shareOnFacebook() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            window.open(\`https://www.facebook.com/sharer/sharer.php?u=\${url}\`, '_blank', 'width=600,height=400');
        }

        function shareOnTwitter() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            window.open(\`https://twitter.com/intent/tweet?url=\${url}&text=\${title}\`, '_blank', 'width=600,height=400');
        }

        function shareOnLinkedIn() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=\${url}\`, '_blank', 'width=600,height=400');
        }

        function shareOnWhatsApp() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            window.open(\`https://wa.me/?text=\${title} \${url}\`, '_blank');
        }

        function shareOnTelegram() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            window.open(\`https://t.me/share/url?url=\${url}&text=\${title}\`, '_blank');
        }

        function shareOnViber() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            window.open(\`viber://forward?text=\${title} \${url}\`, '_blank');
        }

        function copyLink() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                // Show notification
                const btn = document.querySelector('.copy-link');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i><span>Копирано!</span>';
                btn.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 2000);
            });
        }
    </script>
</body>
</html>`;
}

// Export for use in build process
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { newsArticles, generateArticlePage };
}