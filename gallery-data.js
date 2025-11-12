// gallery-data.js - Kompletna galerija sa Load More funkcionalnosšću
// Total: 141 slika

// Funkcija za generisanje svih slika
function generateAllImages() {
    const allImages = [];
    const baseViews = 150;
    
    // Objekti - 20 slika
    const objektiTitles = ['Учионица', 'Кабинет', 'Лабораторија', 'Библиотека', 'Простор', 'Ходник'];
    for(let i = 1; i <= 20; i++) {
        const titleIndex = (i - 1) % objektiTitles.length;
        const suffix = Math.floor((i - 1) / objektiTitles.length) > 0 ? ` ${Math.floor((i - 1) / objektiTitles.length) + 1}` : '';
        allImages.push({
            category: 'objekti',
            title: objektiTitles[titleIndex] + suffix,
            image: `images/gallery/objekti/objekat-${i}.jpg`,
            date: i <= 10 ? '2024' : '2023',
            views: baseViews + Math.floor(Math.random() * 100)
        });
    }
    
    // Praktikum - 20 slika
    const praktikumTitles = ['Медицинске вежбе', 'Опрема', 'Симулација', 'Практична настава', 'Демонстрација'];
    for(let i = 1; i <= 20; i++) {
        const titleIndex = (i - 1) % praktikumTitles.length;
        const suffix = Math.floor((i - 1) / praktikumTitles.length) > 0 ? ` ${Math.floor((i - 1) / praktikumTitles.length) + 1}` : '';
        allImages.push({
            category: 'praktikum',
            title: praktikumTitles[titleIndex] + suffix,
            image: `images/gallery/praktikum/praktikum-${i}.jpg`,
            date: i <= 10 ? '2024' : '2023',
            views: baseViews + 50 + Math.floor(Math.random() * 150)
        });
    }
    
    // Aktivnosti - 19 slika
    const aktivnostiTitles = ['Пројекат', 'Радионица', 'Изложба', 'Приредба', 'Награде', 'Активност'];
    for(let i = 1; i <= 19; i++) {
        const titleIndex = (i - 1) % aktivnostiTitles.length;
        const suffix = Math.floor((i - 1) / aktivnostiTitles.length) > 0 ? ` ${Math.floor((i - 1) / aktivnostiTitles.length) + 1}` : '';
        allImages.push({
            category: 'aktivnosti',
            title: aktivnostiTitles[titleIndex] + suffix,
            image: `images/gallery/aktivnosti/aktivnost-${i}.jpg`,
            date: i <= 10 ? '2024' : '2023',
            views: baseViews + 20 + Math.floor(Math.random() * 80)
        });
    }
    
    // Sport - 28 slika
    const sportTitles = ['Турнир', 'Утакмица', 'Тренинг', 'Такмичење', 'Медаље', 'Тим'];
    for(let i = 1; i <= 28; i++) {
        const titleIndex = (i - 1) % sportTitles.length;
        const suffix = Math.floor((i - 1) / sportTitles.length) > 0 ? ` ${Math.floor((i - 1) / sportTitles.length) + 1}` : '';
        allImages.push({
            category: 'sport',
            title: sportTitles[titleIndex] + suffix,
            image: `images/gallery/sport/sport-${i}.jpg`,
            date: i <= 14 ? '2024' : '2023',
            views: baseViews + Math.floor(Math.random() * 120)
        });
    }
    
    // Dogadjaji - 16 slika
    const dogadjajiTitles = ['Академија', 'Матурска вечер', 'Прослава', 'Екскурзија', 'Догађај', 'Церемонија'];
    for(let i = 1; i <= 16; i++) {
        const titleIndex = (i - 1) % dogadjajiTitles.length;
        const suffix = Math.floor((i - 1) / dogadjajiTitles.length) > 0 ? ` ${Math.floor((i - 1) / dogadjajiTitles.length) + 1}` : '';
        allImages.push({
            category: 'dogadjaji',
            title: dogadjajiTitles[titleIndex] + suffix,
            image: `images/gallery/dogadjaji/dogadjaj-${i}.jpg`,
            date: i <= 8 ? '2024' : '2023',
            views: baseViews + 50 + Math.floor(Math.random() * 160)
        });
    }
    
    // Manifestacije - 18 slika
    const manifestacijeTitles = ['Сајам', 'Панел', 'Предавање', 'Промоција', 'Презентација', 'Форум'];
    for(let i = 1; i <= 18; i++) {
        const titleIndex = (i - 1) % manifestacijeTitles.length;
        const suffix = Math.floor((i - 1) / manifestacijeTitles.length) > 0 ? ` ${Math.floor((i - 1) / manifestacijeTitles.length) + 1}` : '';
        allImages.push({
            category: 'manifestacije',
            title: manifestacijeTitles[titleIndex] + suffix,
            image: `images/gallery/manifestacije/manifestacija-${i}.jpg`,
            date: i <= 9 ? '2024' : '2023',
            views: baseViews + 40 + Math.floor(Math.random() * 100)
        });
    }
    
    // Humanitarne - 20 slika
    const humanitarneTitles = ['Давање крви', 'Акција', 'Волонтери', 'Едукација', 'Хуманост', 'Солидарност'];
    for(let i = 1; i <= 20; i++) {
        const titleIndex = (i - 1) % humanitarneTitles.length;
        const suffix = Math.floor((i - 1) / humanitarneTitles.length) > 0 ? ` ${Math.floor((i - 1) / humanitarneTitles.length) + 1}` : '';
        allImages.push({
            category: 'humanitarne',
            title: humanitarneTitles[titleIndex] + suffix,
            image: `images/gallery/humanitarne/humanitarna-${i}.jpg`,
            date: i <= 10 ? '2024' : '2023',
            views: baseViews + 70 + Math.floor(Math.random() * 140)
        });
    }
    
    return allImages;
}

// Inicijalizuj galleryData
const galleryData = generateAllImages();

console.log(`Total images loaded: ${galleryData.length}`);
console.log('Images per category:', {
    objekti: galleryData.filter(i => i.category === 'objekti').length,
    praktikum: galleryData.filter(i => i.category === 'praktikum').length,
    aktivnosti: galleryData.filter(i => i.category === 'aktivnosti').length,
    sport: galleryData.filter(i => i.category === 'sport').length,
    dogadjaji: galleryData.filter(i => i.category === 'dogadjaji').length,
    manifestacije: galleryData.filter(i => i.category === 'manifestacije').length,
    humanitarne: galleryData.filter(i => i.category === 'humanitarne').length
});
