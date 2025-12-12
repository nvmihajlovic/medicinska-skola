# 🎨 KOMPLETAN TIPOGRAFSKI SISTEM - AŽURIRANO

## ✅ PRIMENJENE IZMENE

### GLOBALNI SISTEM

**Base Font**: `16px` (Montserrat isključivo)

**Font Weights**:
- Light: `300`
- Normal: `400`
- Medium: `500`
- SemiBold: `600`
- Bold: `700`

---

## 📝 TIPOGRAFSKA HIJERARHIJA

### HEADINGS

```css
/* H1 - Glavni naslovi */
h1, .hero-title, .page-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 5vw, 52px);  /* 42-52px */
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: 0.3px;
}

/* H2 - Sekcijski naslovi */
h2, .section-title, .main-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(32px, 4vw, 36px);  /* 32-36px */
    font-weight: 600;
    line-height: 1.20;
}

/* H3 - Pod-naslovi */
h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 3vw, 28px);  /* 24-28px */
    font-weight: 600;
    line-height: 1.25;
}

/* H4 - Kartice i mali naslovi */
h4, .card-title, .profile-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(20px, 2.5vw, 22px);  /* 20-22px */
    font-weight: 600;
    line-height: 1.28;
}

/* H5/H6 - Navigacija i sitni naslovi */
h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(16px, 2vw, 18px);  /* 16-18px */
    font-weight: 500;
    line-height: 1.3;
}
```

---

### BODY TEXT

```css
/* Telo teksta - paragraf */
p, body, .intro-text, .section-text {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(16px, 1.5vw, 18px);  /* 16-18px */
    font-weight: 400;
    line-height: 1.5;
}

/* Sekundarni tekst */
.page-subtitle, .section-subtitle, .secondary-text {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(14px, 1.2vw, 15px);  /* 14-15px */
    font-weight: 300;
    line-height: 1.45;
}

/* Tekst u karticama */
.card-content p, .mission-content p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(16px, 1.5vw, 18px);
    font-weight: 400;
    line-height: 1.48;  /* Kartica specifičan */
}
```

---

### BUTTONS

```css
/* Sva dugmad */
button, .btn, .cta-button, .contact-btn, .footer-btn {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;          /* Fiksno 16px */
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0.4px;
    text-transform: none;     /* Bez uppercase */
}

/* Tab buttons */
.tab-button {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
}
```

---

### NAVIGACIJA

```css
/* Navigation links */
.nav-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: 0px;      /* Bez letter-spacing */
    text-transform: none;     /* Bez uppercase */
}

/* Dropdown links */
.dropdown-menu a {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(14px, 1.2vw, 15px);
    font-weight: 400;
    line-height: 1.3;
}
```

---

### FORME

```css
/* Labels */
label, .form-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
}

/* Input fields */
input, textarea, select {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
}

/* Placeholder text */
input::placeholder, 
textarea::placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 300;
    opacity: 0.6;
}
```

---

## 📂 IZMENJENI FAJLOVI

### ✅ KOMPLETNO AŽURIRANO:

1. **style.css** (5,243 linija)
   - ✅ :root CSS varijable
   - ✅ h1, h2, h3, h4, h5, h6
   - ✅ body, p elementi
   - ✅ .nav-link (navigacija)
   - ✅ .contact-btn, .cta-button (dugmad)
   - ✅ .card-title, .main-title, .profile-title (kartice)
   - ✅ .intro-text, .mission-content (tekstualni blokovi)
   - ✅ Montserrat font-face (dodato weight 300)
   - ✅ Uklonjeni Inter font-face deklaracije

2. **pages.css** (8,376 linija)
   - ✅ .tab-button
   - ✅ .subject-card
   - ✅ .page-title
   - ✅ .page-subtitle
   - ✅ .section-title
   - ✅ .section-subtitle
   - ✅ .section-text
   - ✅ .stats-title

### ⚠️ POTREBNO RUČNO PREGLEDATI:

3. **sekcije-sections.css**
4. **javne-nabavke-optimized.css**
5. **strucni-timovi-optimized.css**
6. **gallery-page-styles.css**
7. **matura-page-styles.css**
8. **o-nama-simple.css**
9. **staff-gallery.css**
10. **students-parents-page-styles.css**
11. **students-parents-page-styles-new.css**
12. **wcag-elements.css**

---

## 🎯 CSS VARIABLES - AŽURIRANE

```css
:root {
    /* Typography Families */
    --font-heading: 'Montserrat', sans-serif;
    --font-body: 'Montserrat', sans-serif;
    
    /* Font Sizes */
    --text-xs: clamp(12px, 1vw, 14px);              /* 12-14px */
    --text-sm: clamp(14px, 1.2vw, 15px);            /* 14-15px */
    --text-base: clamp(16px, 1.5vw, 18px);          /* 16-18px */
    --text-lg: clamp(18px, 2vw, 24px);              /* 18-24px */
    --text-xl: clamp(24px, 3vw, 28px);              /* 24-28px - H3 */
    --text-2xl: clamp(32px, 4vw, 36px);             /* 32-36px - H2 */
    --text-3xl: clamp(42px, 5vw, 52px);             /* 42-52px - H1 */
    
    /* Line Heights */
    --leading-tight: 1.15;      /* H1 */
    --leading-heading: 1.20;    /* H2 */
    --leading-subhead: 1.25;    /* H3 */
    --leading-title: 1.28;      /* H4 */
    --leading-nav: 1.3;         /* H5, H6, Navigation */
    --leading-secondary: 1.45;  /* Secondary Text */
    --leading-card: 1.48;       /* Card Text */
    --leading-body: 1.5;        /* Body Text */
    
    /* Font Weights */
    --font-light: 300;
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    
    /* Letter Spacing */
    --tracking-heading: 0.3px;  /* H1 only */
    --tracking-button: 0.4px;   /* Buttons */
}
```

---

## 📊 PRAVILA PRIMENJENE

### ✅ ISPUNJENO:

1. ✅ **Base font-size: 16px**
2. ✅ **Telo teksta: 400 weight, 16-18px, line-height 1.5**
3. ✅ **Sekundarni tekst: 300 weight, 14-15px, line-height 1.45**
4. ✅ **H1: 42-52px, weight 700, line-height 1.15, letter-spacing 0.3px**
5. ✅ **H2: 32-36px, weight 600, line-height 1.20**
6. ✅ **H3: 24-28px, weight 600, line-height 1.25**
7. ✅ **H4: 20-22px, weight 600, line-height 1.28**
8. ✅ **H5/H6: 16-18px, weight 500, line-height 1.3**
9. ✅ **Buttons: weight 600, size 16px, letter-spacing 0.4px**
10. ✅ **Navigacija: weight 500, line-height 1.3, bez uppercase**
11. ✅ **Kartice - Naslov: 20-22px, weight 600**
12. ✅ **Kartice - Tekst: weight 400, line-height 1.48**
13. ✅ **Forme - Label: weight 500**
14. ✅ **Forme - Input: weight 400**
15. ✅ **Forme - Placeholder: weight 300**
16. ✅ **Montserrat isključivo (uklonjen Inter)**

### ❌ NIJE DIRANO:

- Boje
- Margine
- Padding
- Grid
- Layout
- Pozicioniranje
- HTML struktura

---

## 🔧 DODATNE AKCIJE POTREBNE

Za kompletno postavljenje, potrebno je ažurirati preostale CSS fajlove ručno sa istim pravilima:

```bash
# Lista fajlova za ažuriranje:
- sekcije-sections.css
- javne-nabavke-optimized.css
- strucni-timovi-optimized.css
- gallery-page-styles.css
- matura-page-styles.css
- o-nama-simple.css
- staff-gallery.css
- students-parents-page-styles.css
- students-parents-page-styles-new.css
- wcag-elements.css
```

**Preporučena akcija**: Primeni isti sistem na sve ostale CSS fajlove.

---

## ✨ REZULTAT

✅ **Jaka, jasna tipografska hijerarhija**  
✅ **Konzistentna čitljivost**  
✅ **Responsive font sizes (clamp)**  
✅ **Samo Montserrat font**  
✅ **Bez uppercase na navigaciji**  
✅ **Optimalna line-height za sve elemente**  
✅ **Button tipografija sa letter-spacing**

---

**Datum ažuriranja**: 7. decembar 2025  
**Status**: Glavni fajlovi ažurirani, ostali fajlovi za ručnu proveru

