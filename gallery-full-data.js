// Kompletni galleryData sa svim slikama - generisano automatski
function generateGalleryData() {
    const data = [];
    const categories = {
        objekti: { count: 20, titles: ['Учионица', 'Кабинет', 'Простор', 'Опрема', 'Ходник', 'Библиотека'] },
        praktikum: { count: 20, titles: ['Медицинске вежбе', 'Опрема за обуку', 'Симулација', 'Клиничке вежбе', 'Демонстрација', 'Инструменти'] },
        aktivnosti: { count: 19, titles: ['Пројектни рад', 'Радионица', 'Изложба', 'Приредба', 'Награде', 'Дан школе'] },
        sport: { count: 28, titles: ['Турнир', 'Фудбал', 'Одбојка', 'Кошарка', 'Атлетика', 'Трофеји'] },
        dogadjaji: { count: 16, titles: ['Академија', 'Матурска вечер', 'Акција', 'Културна вечер', 'Екскурзија', 'Отворена врата'] },
        manifestacije: { count: 18, titles: ['Сајам', 'Панел дискусија', 'Такмичење', 'Дан школе', 'Предавање', 'Добродошлица'] },
        humanitarne: { count: 20, titles: ['Давање крви', 'Припрема', 'Медицински тим', 'Даваоци', 'Едукација', 'Захвалнице'] }
    };

    Object.keys(categories).forEach(category => {
        const { count, titles } = categories[category];
        for (let i = 1; i <= count; i++) {
            const titleIndex = (i - 1) % titles.length;
            const titleNumber = Math.floor((i - 1) / titles.length) + 1;
            const title = titleNumber > 1 ? `${titles[titleIndex]} ${titleNumber}` : titles[titleIndex];
            const year = i <= count / 2 ? '2024' : '2023';
            const views = Math.floor(Math.random() * 200) + 150;
            
            data.push({
                category: category,
                title: title,
                image: `images/gallery/${category}/${category === 'objekti' ? 'objekat' : category.slice(0, -1) + (category === 'humanitarne' ? 'a' : '')}-${i}.jpg`,
                date: year,
                views: views
            });
        }
    });

    return data;
}

const fullGalleryData = generateGalleryData();
