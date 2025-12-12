# 📊 СИСТЕМ ЕВИДЕНТИРАЊА ПРЕГЛЕДА И ЛАЈКОВА

## 🎯 Преглед

Компјутерски систем за евидентирање броја прегледа и лајкова на свим news страницама. Подаци се **трајно чувају** у JSON фајлу и аутоматски се ажурирају у реалном времену.

---

## 📁 Структура фајлова

```
medicinska test/
├── api/
│   └── engagement.php          # Backend API за обраду захтева
├── js/
│   └── engagement.js           # Frontend JavaScript клијент
├── data/
│   └── engagement-data.json    # JSON фајл за чување података
└── [news stranice].html        # Све news странице са engagement панелом
```

---

## 🔧 Компоненте система

### 1. **Backend API** (`api/engagement.php`)

**Технологија:** PHP (JSON storage umesto MySQL baze)

**Endpoints:**
- `?action=view&article={slug}` - Региструје преглед (само први пут по сесији)
- `?action=like&article={slug}` - Додаје/уклања лајк (toggle)
- `?action=get&article={slug}` - Враћа тренутне бројеве

**Карактеристике:**
- ✅ Једноставна инсталација (без MySQL)
- ✅ Подаци трајно чувани у `data/engagement-data.json`
- ✅ Спречава дуплирање прегледа (session tracking)
- ✅ Јединствени ID корисника (IP + User Agent hash)
- ✅ Automatic JSON file creation ako ne postoji

**Response format:**
```json
{
  "views": 42,
  "likes": 15,
  "liked": true
}
```

---

### 2. **Frontend JavaScript** (`js/engagement.js`)

**Класа:** `EngagementTracker`

**Функционалност:**
- Аутоматско регистровање прегледа при учитавању странице
- Real-time ажурирање бројева преко AJAX
- Toggle лајк са визуелном анимацијом
- Error handling са console logging
- Форматирање великих бројева (нпр. 1.5k)

**Иницијализација:**
```javascript
new EngagementTracker('donacija-krvi');
```

---

### 3. **Data Storage** (`data/engagement-data.json`)

**Формат:**
```json
{
  "donacija-krvi": {
    "views": 0,
    "likes": 0,
    "likedBy": ["hash1", "hash2"]
  },
  "dan-planete": {
    "views": 0,
    "likes": 0,
    "likedBy": []
  }
}
```

**Напомене:**
- Аутоматски се креира ако не постоји
- `likedBy` чува hash-еве корисника (анонимно tracking)
- UTF-8 encoding за ћирилицу

---

### 4. **HTML Engagement Panel**

**Структура:**
```html
<div class="engagement-panel">
    <div class="engagement-stats">
        <div class="stat-item">
            <i class="far fa-eye"></i>
            <span><span class="count views-count">0</span> прегледа</span>
        </div>
        <div class="stat-item">
            <i class="fas fa-heart"></i>
            <span><span class="count likes-count">0</span> свиђања</span>
        </div>
    </div>
    <button class="like-btn" aria-label="Лајкуј овај чланак">
        <i class="far fa-heart"></i>
        Свиђа ми се
    </button>
</div>
```

---

### 5. **CSS Design** (`pages.css`)

**Спецификације:**
- **Gradient background:** `rgba(74,144,226,0.04-0.08)`
- **Border-radius:** `14px` (unified design system)
- **Shadow:** `0 2px 12px rgba(0,0,0,0.03)`
- **Like button states:**
  - Default: white bg, red border `rgba(231,76,60,0.15)`
  - Hover: translateY(-1px) + stronger shadow
  - Liked: red gradient background `#e74c3c → #c0392b`
  - Animation: scale(1.15) pop effect

**Responsive:**
- Mobile: stack vertically, full-width button

---

## 🚀 Инсталација

### Корак 1: Провера PHP подршке

Веб сервер мора имати:
- ✅ PHP 7.0+ (препоручено 8.0+)
- ✅ JSON extension (обично укључен)
- ✅ File write permissions за `/data` фолдер

### Корак 2: Provera direktorijuma

```bash
# Креирај data фолдер ако не постоји
mkdir data
```

### Корак 3: Set permissions (Linux/Mac)

```bash
chmod 755 data/
chmod 666 data/engagement-data.json  # Ако фајл постоји
```

### Корак 4: Тестирање

Отвори у претраживачу:
```
http://localhost/medicinska-test/api/engagement.php?action=get&article=donacija-krvi
```

**Очекиван response:**
```json
{"views":0,"likes":0,"liked":false}
```

---

## 📝 Коришћење

### Додавање engagement система на НОВУ news страницу:

#### 1. Додај HTML panel после featured image:

```html
<div class="featured-image">
    <!-- ... -->
</div>

<!-- Engagement Panel -->
<div class="engagement-panel">
    <div class="engagement-stats">
        <div class="stat-item">
            <i class="far fa-eye"></i>
            <span><span class="count views-count">0</span> прегледа</span>
        </div>
        <div class="stat-item">
            <i class="fas fa-heart"></i>
            <span><span class="count likes-count">0</span> свиђања</span>
        </div>
    </div>
    <button class="like-btn" aria-label="Лајкуј овај чланак">
        <i class="far fa-heart"></i>
        Свиђа ми се
    </button>
</div>
```

#### 2. Додај JavaScript пре `</body>` тага:

```html
<script src="js/engagement.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        new EngagementTracker('naziv-clanka-slug');
    });
</script>
</body>
```

#### 3. Додај нови чланак у `data/engagement-data.json`:

```json
{
  "naziv-clanka-slug": {
    "views": 0,
    "likes": 0,
    "likedBy": []
  }
}
```

---

## 🔍 Troubleshooting

### Problem 1: Подаци се не чувају

**Решење:**
1. Провери да ли `data/` фолдер постоји
2. Провери write permissions:
   ```bash
   chmod 755 data/
   ```
3. Провери PHP error log

### Problem 2: JSON parse error

**Решење:**
- Провери UTF-8 encoding у `engagement-data.json`
- Валидирај JSON на: https://jsonlint.com

### Problem 3: CORS error (cross-origin)

**Решење:**
Додај у `.htaccess`:
```apache
Header set Access-Control-Allow-Origin "*"
```

### Problem 4: "Cannot read property 'textContent' of null"

**Решење:**
- Провери да ли HTML panel има класе `.views-count` и `.likes-count`
- Провери да ли `engagement.js` учитан **пре** иницијализације

---

## 📊 Структура података

### User ID генерисање

```php
function getUserId() {
    return md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
}
```

**Предности:**
- ✅ Анонимно (не чува личне податке)
- ✅ Конзистентно за истог корисника
- ✅ Спречава злоупотребу (multiple likes)

**Ограничења:**
- ❌ Промена IP или браузера = нови user ID
- ❌ Можда не ради за proxy/VPN кориснике

---

## 🎨 CSS Customization

### Промена боје like дугмета:

```css
.like-btn {
    color: #e74c3c;  /* Промени ову боју */
    border: 2px solid rgba(231,76,60,0.15);
}

.like-btn.liked {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
}
```

### Промена стила панела:

```css
.engagement-panel {
    background: linear-gradient(135deg, rgba(74,144,226,0.04) 0%, rgba(74,144,226,0.08) 100%);
    border-radius: 14px;
}
```

---

## 🔒 Security Notes

1. **SQL Injection:** ✅ Не користимо SQL (JSON storage)
2. **XSS:** ✅ Не output-ујемо user input
3. **CSRF:** ⚠️ Размотри додавање CSRF tokens за production
4. **Rate Limiting:** ⚠️ Размотри IP-based rate limiting против spam-a

---

## 🚀 Performance Tips

1. **Caching:** Размотри Redis/Memcached за високо traffic
2. **Async loading:** Engagement tracker већ користи async AJAX
3. **CDN:** Постави `engagement.js` на CDN за бржи load
4. **Minimize:** Minify `engagement.js` за production

---

## 📈 Future Improvements

### Могуће надоградње:

1. **Admin Panel:**
   - Dashboard за преглед свих статистика
   - Export у CSV/Excel
   - Grafikoni трендова

2. **Advanced Analytics:**
   - Bounce rate tracking
   - Time on page
   - Device/browser статистика

3. **Social Sharing:**
   - Интеграција са Facebook/Twitter API
   - Real sharing tracking

4. **Comments System:**
   - Додај коментаре поред лајкова
   - Модерација коментара

---

## 📦 Files Summary

### Измењени фајлови:

✅ `api/engagement.php` - Backend API (JSON storage)
✅ `js/engagement.js` - Frontend tracker
✅ `data/engagement-data.json` - Data storage
✅ `pages.css` - Engagement panel styles
✅ `donacija-krvi.html` - HTML + script
✅ `dan-planete.html` - HTML + script
✅ `fruska-gora-maraton.html` - HTML + script
✅ `humanitarna-akcija.html` - HTML + script
✅ `svetski-dan-poezije.html` - HTML + script
✅ `strucna-praksa.html` - HTML + script
✅ `.htaccess` - Server configuration

---

## 💡 Usage Examples

### Провера тренутних података:

```bash
# GET request
curl "http://localhost/medicinska-test/api/engagement.php?action=get&article=donacija-krvi"
```

### Додавање лајка:

```bash
# Like action
curl "http://localhost/medicinska-test/api/engagement.php?action=like&article=donacija-krvi"
```

### Регистровање прегледа:

```bash
# View action (ово ради аутоматски на page load)
curl "http://localhost/medicinska-test/api/engagement.php?action=view&article=donacija-krvi"
```

---

## ✅ Завршна provera

Након инсталације, провери да ли:

1. ✅ Engagement panel видљив на свим news страницама
2. ✅ Бројеви се ажурирају real-time
3. ✅ Лајк дугме toggle-ујеCorrectly
4. ✅ Подаци чувани у `engagement-data.json`
5. ✅ Анимације раде smooth
6. ✅ Responsive design correctan на mobile

---

## 📞 Support

За питања или проблеме:
- Провери browser console за errors
- Провери PHP error logs
- Валидирај JSON фајл
- Провери file permissions

**Систем је спреман за production!** 🚀
