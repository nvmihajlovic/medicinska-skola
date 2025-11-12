# Упутство за уређивање странице Запослени (zaposleni.html)

## Преглед структуре

Страница **zaposleni.html** је организована у четири главне секције:

### 1. **Руководство школе** (Management Section)
- Директор школе, Секретар, Организатор наставе
- Користи `staff-grid` са 3 картице
- Сваки члан има иконицу заменског корисника (placeholder)

### 2. **Наставници** (Teachers Section)  
- Сви наставници су организовани у картице
- Користи `staff-grid` са аутоматским редом (auto-fit)
- Сваки наставник има иконицу корисника као placeholder

### 3. **Стручна служба** (Support Services)
- Психолог, Педагог, Библиотекар
- Организовано у 3 картице са иконицама

### 4. **Административно особље** (Administrative Staff)
- Административни радник, Спремачице, Техничари
- Користи `staff-list` формат (редови са иконом и информацијом)

---

## HTML Структура за dodavanje нових запослених

### Формат за картицу (Teachers, Support Staff)
```html
<div class="staff-card">
    <div class="staff-image">
        <div class="staff-placeholder">
            <i class="fas fa-user-circle"></i>
        </div>
        <div class="staff-overlay">
            <span class="staff-role-badge">Позиција</span>
        </div>
    </div>
    <div class="staff-info">
        <h3 class="staff-name">Име и Презиме</h3>
        <p class="staff-position">Позиција/Функција</p>
    </div>
</div>
```

### Формат за листу (Administrative Staff)
```html
<div class="staff-list-item">
    <div class="staff-list-icon">
        <i class="fas fa-user-circle"></i>
    </div>
    <div class="staff-list-info">
        <h4>Име и Презиме</h4>
        <p>Позиција/Функција</p>
    </div>
</div>
```

---

## Замена иконице са правом фотографијом

Када запослени доставе своје фотографије, користите следећи процес:

### 1. **Копирајте фотографију у `images/` фолдер**
```
images/zaposljeni/
  - janko-jankovic.jpg
  - marija-maric.jpg
  - itd...
```

### 2. **Замените placeholder иконицу са правом фотографијом**

**ОД ОВОГА:**
```html
<div class="staff-image">
    <div class="staff-placeholder">
        <i class="fas fa-user-circle"></i>
    </div>
    <div class="staff-overlay">
        <span class="staff-role-badge">Наставник</span>
    </div>
</div>
```

**НА ОВО:**
```html
<div class="staff-image">
    <img src="images/zaposljeni/janko-jankovic.jpg" alt="Јанко Јанковић">
    <div class="staff-overlay">
        <span class="staff-role-badge">Наставник</span>
    </div>
</div>
```

### 3. **Врхунске праксе за фотографије**
- **Препоручена величина:** 600x800 px (портрет формат)
- **Формат:** JPG или PNG
- **Величина фајла:** 100-200 KB (оптимизовано за веб)
- **Профил:** Биндосна фотографија или формална портретна фотографија

---

## Додавање новог запосленог

### За наставнике или стручну службу:

1. Пронађите секцију `<!-- Teachers Section -->` или `<!-- Support Services -->`
2. Додајте нову картицу пре `</div>` која затвара `staff-grid`:

```html
<div class="staff-card">
    <div class="staff-image">
        <div class="staff-placeholder">
            <i class="fas fa-user-circle"></i>
        </div>
        <div class="staff-overlay">
            <span class="staff-role-badge">Наставник</span>
        </div>
    </div>
    <div class="staff-info">
        <h3 class="staff-name">Ново Име</h3>
        <p class="staff-position">Нова позиција</p>
    </div>
</div>
```

### За административно особље:

1. Пронађите секцију `<!-- Administrative Staff Section -->`
2. Додајте нову ставку пре `</div>` која затвара `staff-list`:

```html
<div class="staff-list-item">
    <div class="staff-list-icon">
        <i class="fas fa-user-circle"></i>
    </div>
    <div class="staff-list-info">
        <h4>Ново Име</h4>
        <p>Нова позиција</p>
    </div>
</div>
```

---

## CSS Класе за стилизовање

| Класа | Назначење |
|-------|-----------|
| `.staff-section` | Контејнер за целу секцију запослених |
| `.staff-grid` | Гід за приказ картица (auto-fit, minmax(280px, 1fr)) |
| `.staff-card` | Једна картица запосленог |
| `.staff-image` | Слика/placeholder контејнер (300px висина) |
| `.staff-placeholder` | Placeholder иконица за запослене без слике |
| `.staff-overlay` | Наслаганa слоја са бејџом над сликом (видљива при hover) |
| `.staff-role-badge` | Бејџ са позицијом запосленог |
| `.staff-info` | Информације о запосленом (име, позиција) |
| `.staff-name` | Номе запосленог (Montserrat, 1.3rem, 700 weight) |
| `.staff-position` | Позиција запосленог (primary-blue боја) |
| `.staff-list` | Гід за административне запослене |
| `.staff-list-item` | Редак са иконом и информацијом |
| `.staff-list-icon` | Иконица у листи (60x60px, gradient фон) |

---

## Боје и детаљи дизајна

### Примена боја
- **Primary Blue:** `#4a90e2` (наставничка позиција текст, иконице)
- **Secondary Blue:** Делимично прозирна варијанта
- **Име:** Тамна сива `#2c3e50`
- **Позиција:** Primary Blue `#4a90e2`

### Placeholder иконица
- **Icon:** Font Awesome `fa-user-circle`
- **Величина:** 8rem (за картице)
- **Боја:** `rgba(74, 144, 226, 0.3)` (полупрозирна плава)
- **Фон:** `linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)` (светлоплава)

### Hover ефекти
- **Картица:** Elevacija (+5px, појачана сенка)
- **Слика:** Zoom (scale 1.05)
- **Overlay:** Opacity 0 → 1
- **Административни редак:** Elevacija, промена боје граница

---

## Мобилни Responsive Дизајн

### На 768px и мање
- Картице се приказују у једној колони
- Слике су 250px висине
- Административни редови остају у једној колони

### На 480px и мање
- Административни редови се приказују као редови (флексибилни ред)
- Текст је мањи (font-size: 1.1rem за имена)
- Паддинг редукован на мање уређаје

---

## Контролна листа за уређивање

- [ ] Доплете ли нова имена у исправном Cyrillic формату?
- [ ] Да ли су позиције тачно наведене?
- [ ] Да ли су бађови у `staff-role-badge` правилни?
- [ ] Да ли се страница добро прилагођава на мобилним уређајима?
- [ ] Да ли су фотографије оптимизоване за веб?
- [ ] Да ли сте проверили све линкове у NavigationBar-u?

---

## Брзо одговарајуће задаци

### Замена иконице са сликом за једног запосленог
1. Отворите `zaposleni.html`
2. Пронађите запосленог по имену
3. Замените `<div class="staff-placeholder"><i class="fas fa-user-circle"></i></div>` са `<img src="images/zaposljeni/name.jpg" alt="Ime Prezime">`

### Додавање новог наставника
1. Копирајте целу `<div class="staff-card">` секцију
2. Пастујте је пре крајње `</div>` у наставничку секцију
3. Измените име и позицију

### Уклањање запосленог
1. Пронађите целу `<div class="staff-card">` или `<div class="staff-list-item">` секцију
2. Обришите целу SECTION (почевши од `<div>` до `</div>`)

---

**Задржите ову датотеку као референцу при уређивању странице Запослени.**
