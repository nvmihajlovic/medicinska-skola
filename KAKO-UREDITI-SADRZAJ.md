# 📝 KAKO UREDITI SADRŽAJ BEZ MENJANJA KODA

## 🎯 **Najlakši način - Editovanje config.js fajla**

### 1. **Menjanje osnovnih informacija**
Otvori `config.js` fajl i promeni:

```javascript
site: {
  title: 'Медицинска Школа „Стевица Јовановић" Панчево',  // Naslov stranice
  phone: '013/351-349',                                      // Telefon
  email: 'info@medicinskapancevo.edu.rs',                      // Email
  address: 'Пастерова 2, 26000 Панчево'                 // Adresa
}
```

### 2. **Menjanje navigation menija**
```javascript
navigation: [
  'О НАМА',                    // Možeš dodati/ukloniti/promeniti
  'ОБРАЗОВНИ ПРОФИЛИ',         // linkove u meniju
  'УПУТСТВА ПРИЈАВЕ',         
  // ... dodaj nove ili ukloni postojeće
]
```

### 3. **Menjanje glavnog naslova (Hero sekcija)**
```javascript
hero: {
  title: 'Медицинска Школа „Стевица Јовановић" Панчево',  // Veliki naslov
  buttonText: 'ПОГЛЕДАЈТЕ ПРОФИЛЕ'                         // Tekst dugmeta
}
```

### 4. **Dodavanje novih vesti/blogova**
```javascript
news: {
  articles: [
    {
      title: 'Naslov nove vesti',                    // Naslov članka
      date: '7. novембар 2025',                      // Datum
      comments: '0 Коментара',                       // Broj komentara
      excerpt: 'Kratak opis vesti...',               // Sažetak
      image: 'https://example.com/slika.jpg'         // URL slike
    },
    // Dodaj nove članke ovde...
  ]
}
```

## 🔧 **Naprednije opcije**

### **A) Dodavanje vesti kroz JavaScript konzolu**
1. Otvori stranicu u browseru
2. Pritisni F12 (Developer Tools)
3. Idi na Console tab
4. Unesi:

```javascript
cms.addNews({
  title: 'Nova vest',
  date: '7. novембар 2025', 
  comments: '0 Коментара',
  excerpt: 'Opis nove vesti...',
  image: 'https://example.com/slika.jpg'
});
```

### **B) Uklanjanje vesti**
```javascript
cms.removeNews(0); // Ukloni prvu vest (index 0)
```

## 📁 **Struktura fajlova za editovanje**

```
📁 medicinska test/
├── 📄 config.js          ← OVDE MENJAŠ SADRŽAJ
├── 📄 cms.js             ← Sistem za upravljanje (ne diraj)
├── 📄 index.html         ← HTML struktura (ne diraj)
├── 📄 style.css          ← Stilovi (ne diraj)
└── 📄 script.js          ← JavaScript (ne diraj)
```

## ✅ **Šta možeš lako da menjaš:**

- ✅ Naslov stranice
- ✅ Telefon, email, adresu  
- ✅ Navigation menu linkove
- ✅ Glavni naslov i dugme
- ✅ Obrazovne profile (lista)
- ✅ Vesti/blog članke
- ✅ Footer informacije
- ✅ Slike (samo URL-ove)

## ⚠️ **Šta NE treba da diraš:**

- ❌ HTML kod u index.html
- ❌ CSS stilove u style.css  
- ❌ JavaScript funkcije u script.js
- ❌ CMS logiku u cms.js

## 🚀 **Kako da testiraš izmene:**

1. Sačuvaj `config.js` fajl
2. Refresh-uj stranicu u browseru (F5)
3. Izmene će se odmah prikazati!

## 📷 **Dodavanje slika:**

1. **Online slike:** Koristi URL adrese
   ```javascript
   image: 'https://example.com/slika.jpg'
   ```

2. **Lokalne slike:** Stavi u folder i koristi relativnu putanju
   ```javascript
   image: 'images/moja-slika.jpg'
   ```

## 🎨 **Menjanje boja (samo ako treba):**

U `style.css` fajlu pronađi:
```css
:root {
  --primary-color: #e74c3c;    /* Glavna crvena boja */
  --secondary-color: #2c3e50;  /* Tamno plava */
}
```

---

## 💡 **NAJBITNIJE:**
**Sve izmene sadržaja radiš u `config.js` fajlu!**
**Nikad ne diraš HTML, CSS ili ostale JS fajlove osim ako ne znaš šta radiš.**