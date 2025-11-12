# 🚀 УПУТСТВО ЗА ПОСТАВЉАЊЕ САЈТА НА cPANEL

## 📋 ШТА ТРЕБА ДА ИМАШ:

### 1. cPanel приступ са:
- ✅ **MySQL база података** (обично укључена)
- ✅ **PHP подршка** (верзија 7.4+)
- ✅ **File Manager** приступ
- ✅ **phpMyAdmin** за базу

### 2. Структура фајлова за upload:
```
public_html/
├── index.html
├── style.css
├── pages.css
├── script.js
├── dan-planete.html
├── donacija-krvi.html
├── (остале HTML странице)
├── images/
│   └── (све слике)
├── admin/
│   └── add-news.php
├── api/
│   └── engagement.php
└── js/
    └── engagement.js
```

## 🗄️ ПОДЕШАВАЊЕ БАЗЕ ПОДАТАКА:

### Корак 1: Направи базу у cPanel
1. Иди на **MySQL Databases**
2. Направи нову базу: `medicinska_db`
3. Направи корисника са лозинком
4. Додели сва права кориснику

### Корак 2: Направи табеле (у phpMyAdmin)
```sql
-- Табела за чланке
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) UNIQUE,
    title VARCHAR(255),
    content TEXT,
    category VARCHAR(100),
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Табела за лајкове
CREATE TABLE article_likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    article_id INT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (article_id, ip_address),
    FOREIGN KEY (article_id) REFERENCES articles(id)
);

-- Унеси постојеће чланке
INSERT INTO articles (slug, title, category) VALUES
('dan-planete', 'Обележавање Дана планете Земље', 'Дан планете Земље'),
('donacija-krvi', 'Акција добровољног давалаца крви', 'Донација крви'),
('fruska-gora-maraton', 'Фрушкогорски марaton', 'Спорт'),
('svetski-dan-poezije', 'Светски дан поезије', 'Култура'),
('raspored-ispita', 'Распоред испита', 'Образовање');
```

## ⚙️ ПОДЕШАВАЊЕ PHP ФАЈЛОВА:

### 1. Уреди `api/engagement.php`:
```php
// Промени ове креденцијале:
$host = 'localhost';
$dbname = 'твоје_име_базе';
$username = 'твоје_корисничко_име';
$password = 'твоја_лозинка';
```

### 2. Уреди `admin/add-news.php`:
```php
// Промени административну лозинку:
$admin_password = "твоја_јака_лозинка_123";
```

## 🔧 ОПТИМИЗАЦИЈА ЗА БРЗИНУ:

### 1. .htaccess фајл (направи у root-у):
```apache
# Гzip компресија
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Кеширање
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Безбедност
Options -Indexes
```

## 📊 КАКО КОРИСТИТИ ЛАЈКОВЕ И ПРЕГЛЕДЕ:

### За нове чланке додај:
```html
<!-- У head секцију -->
<script src="js/engagement.js"></script>

<!-- У content секцију -->
<div class="engagement-stats">
    <div class="stat-item">
        <i class="fas fa-eye"></i>
        <span class="views-count">0</span>
        <span>прегледа</span>
    </div>
    <div class="stat-item">
        <i class="fas fa-heart"></i>
        <span class="likes-count">0</span>
        <span>лајкова</span>
    </div>
    <button class="like-btn">
        <i class="far fa-heart"></i>
        <span>Свиђа ми се</span>
    </button>
</div>

<!-- Пре затварања body тага -->
<script>
    new EngagementTracker('slag-clanka');
</script>
```

## 🔐 АДМИН ПАНЕЛ:

### Приступ: `твој-сајт.com/admin/add-news.php`
- Користи лозинку коју си подесио
- Аутоматски прави нове HTML странице
- Ручно додај на главну страницу

## 📈 ПРАЋЕЊЕ ПЕРФОРМАНСИ:

### Алати за тестирање:
- **Google PageSpeed Insights**
- **GTmetrix**
- **Pingdom Website Speed Test**

### Циљеви:
- ⚡ Време учитавања < 3 секунде
- 📱 Mobile-friendly (већ јесте)
- 🔍 SEO optimized (већ јесте)

## 🚨 ВАЖНЕ НАПОМЕНЕ:

1. **Резервне kopije**: Редовно прави backup базе
2. **Безбедност**: Промени све default лозинке
3. **Ажурирања**: Тестирај прво на staging окружењу
4. **Мониторинг**: Прати server logs за грешке

## 💡 ДОДАТНЕ МОГУЋНОСТИ:

- **Newsletter система**
- **Коментари на чланке**
- **Push нотификације**
- **Google Analytics интеграција**
- **Search функционалност**

---

**Све је спремно за production! 🎉**