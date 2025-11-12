// Подаци о запосленима
const zaposleniData = {
  rukovodstvo: [
    { ime: "Калапиш Светлана", pozicija: "Директор школе", pol: "female", ikonica: "award" },
    { ime: "Рошу Марко", pozicija: "Секретар", pol: "male", ikonica: "certificate" },
    { ime: "Лупшић Милан", pozicija: "Организатор наставе", pol: "male", ikonica: "star" }
  ],
  
  strucnaSluzba: [
    { ime: "Марија Петровски", pozicija: "Шеф рачуноводства", pol: "female", ikonica: "calculator" },
    { ime: "Тешић Маја", pozicija: "Административни радник", pol: "female", ikonica: "clipboard" },
    { ime: "Зуровац Соња", pozicija: "Библиотекар", pol: "female", ikonica: "book-reader" },
    { ime: "Рашовић Клара", pozicija: "Психолог", pol: "female", ikonica: "brain" },
    { ime: "Даничић Љиљана", pozicija: "Педагог", pol: "female", ikonica: "chalkboard" }
  ],
  
  nastavnici: [
    { ime: "Урошев Драгана", pozicija: "Наставник", pol: "female" },
    { ime: "Арамбашић Наташа", pozicija: "Наставник", pol: "female" },
    { ime: "Марковић Љиљана", pozicija: "Наставник", pol: "female" },
    { ime: "Цамтоска Наташа", pozicija: "Наставник", pol: "female" },
    { ime: "Коленовић Маја", pozicija: "Наставник", pol: "female" },
    { ime: "Николић Рада", pozicija: "Наставник", pol: "female" },
    { ime: "Деља Анђелка", pozicija: "Наставник", pol: "female" },
    { ime: "Стојаковић Биљана", pozicija: "Наставник", pol: "female" },
    { ime: "Никодиновић Виолета", pozicija: "Наставник", pol: "female" },
    { ime: "Ротар С. Јелица", pozicija: "Наставник", pol: "female" },
    { ime: "Весна Павлов", pozicija: "Наставник", pol: "female" },
    { ime: "Павловић Марина", pozicija: "Наставник", pol: "female" },
    { ime: "Ристић Тамара", pozicija: "Наставник", pol: "female" },
    { ime: "Грујић Наталија", pozicija: "Наставник", pol: "female" },
    { ime: "Лукић Драгана", pozicija: "Наставник", pol: "female" },
    { ime: "Бонџић Мирјана", pozicija: "Наставник", pol: "female" },
    { ime: "Прпа Зорица", pozicija: "Наставник", pol: "female" },
    { ime: "Тодоровић Тамара", pozicija: "Наставник", pol: "female" },
    { ime: "Бека Емилијан", pozicija: "Наставник", pol: "male" },
    { ime: "Васић Гордана", pozicija: "Наставник", pol: "female" },
    { ime: "Драгосавац Драгана", pozicija: "Наставник", pol: "female" },
    { ime: "Пешић Милош", pozicija: "Наставник", pol: "male" },
    { ime: "Зуровац Соња", pozicija: "Наставник", pol: "female" },
    { ime: "Лазаров Наташа", pozicija: "Наставник", pol: "female" },
    { ime: "Бачкоња Предраг", pozicija: "Наставник", pol: "male" },
    { ime: "Љубојевић Катарина", pozicija: "Наставник", pol: "female" },
    { ime: "Књегињић Јелена", pozicija: "Наставник", pol: "female" },
    { ime: "Васић Р. Сунчица", pozicija: "Наставник", pol: "female" },
    { ime: "Павлов Весна", pozicija: "Наставник", pol: "female" },
    { ime: "Чолока Минодора", pozicija: "Наставник", pol: "female" },
    { ime: "Ожеговић Драгослава", pozicija: "Наставник", pol: "female" },
    { ime: "Родић Оливера", pozicija: "Наставник", pol: "female" },
    { ime: "Радуловић Јасмина", pozicija: "Наставник", pol: "female" },
    { ime: "Радовановић Дорина", pozicija: "Наставник", pol: "female" },
    { ime: "Богдан Весна", pozicija: "Наставник", pol: "female" },
    { ime: "Врањковић Даница", pozicija: "Наставник", pol: "female" },
    { ime: "Стојку Сања", pozicija: "Наставник", pol: "female" },
    { ime: "Врањеш Богуновић Дубравка", pozicija: "Наставник", pol: "female" },
    { ime: "Михајловић Снежана", pozicija: "Наставник", pol: "female" },
    { ime: "Кљајић Маријана", pozicija: "Наставник", pol: "female" },
    { ime: "Дудуј Ортопан Санела", pozicija: "Наставник", pol: "female" },
    { ime: "Ступар Здјелар Душанка", pozicija: "Наставник", pol: "female" },
    { ime: "Лошић Светлана", pozicija: "Наставник", pol: "female" },
    { ime: "Пећанац Хајналка", pozicija: "Наставник", pol: "female" },
    { ime: "Стокић Мирјана", pozicija: "Наставник", pol: "female" },
    { ime: "Живанов Светлана", pozicija: "Наставник", pol: "female" },
    { ime: "Стефанов Татјана", pozicija: "Наставник", pol: "female" },
    { ime: "Ратков Бојана", pozicija: "Наставник", pol: "female" },
    { ime: "Аксовић Милица", pozicija: "Наставник", pol: "female" },
    { ime: "Андрејевић Анђела", pozicija: "Наставник", pol: "female" },
    { ime: "Лазаревић Вања", pozicija: "Наставник", pol: "female" },
    { ime: "Станић Милица", pozicija: "Наставник", pol: "female" },
    { ime: "Јованов Марина", pozicija: "Наставник", pol: "female" },
    { ime: "Станојевски Јелена", pozicija: "Наставник", pol: "female" },
    { ime: "др Поповић Бојана", pozicija: "Наставник", pol: "female", doktor: true },
    { ime: "др Бурић Мирјана", pozicija: "Наставник", pol: "female", doktor: true },
    { ime: "др Бубања Каролина", pozicija: "Наставник", pol: "female", doktor: true },
    { ime: "др Манасијевић Зоран", pozicija: "Наставник", pol: "male", doktor: true },
    { ime: "др Милетић Јелена", pozicija: "Наставник", pol: "female", doktor: true },
    { ime: "др Ередељанин Мирослав", pozicija: "Наставник", pol: "male", doktor: true },
    { ime: "Јованов Јасна", pozicija: "Наставник", pol: "female" },
    { ime: "др Малић Душан", pozicija: "Наставник", pol: "male", doktor: true }
  ],
  
  pomocnoOsoblje: [
    { ime: "Кемењ Вероника", pozicija: "Спремачица", pol: "female", ikonica: "broom" },
    { ime: "Лазић Љиљана", pozicija: "Спремачица", pol: "female", ikonica: "broom" },
    { ime: "Гујанчић Србинка", pozicija: "Спремачица", pol: "female", ikonica: "broom" },
    { ime: "Миловановић Снежана", pozicija: "Спремачица", pol: "female", ikonica: "broom" },
    { ime: "Субин Владимир", pozicija: "Домар", pol: "male", ikonica: "tools" }
  ]
};

// Функција за генерисање картица
function generateStaffCards(containerId, dataArray, badgeClass = 'teacher', defaultIcon = 'chalkboard-teacher') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  dataArray.forEach(person => {
    const card = document.createElement('div');
    card.className = 'staff-card happy';
    
    const avatarClass = person.pol === 'male' ? 'male' : 'female';
    const badgeIcon = person.ikonica || (person.doktor ? 'user-md' : defaultIcon);
    
    card.innerHTML = `
      <div class="staff-avatar ${avatarClass}">
        <i class="fas fa-user"></i>
      </div>
      <div class="staff-info">
        <h3 class="staff-name">${person.ime}</h3>
        <p class="staff-position">${person.pozicija}</p>
      </div>
      <div class="staff-badge ${badgeClass}">
        <i class="fas fa-${badgeIcon}"></i>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// Иницијализација када се страница учита
document.addEventListener('DOMContentLoaded', function() {
  generateStaffCards('rukovodstvo-grid', zaposleniData.rukovodstvo, '', 'award');
  generateStaffCards('strucna-sluzba-grid', zaposleniData.strucnaSluzba, 'support', 'users-cog');
  generateStaffCards('nastavnici-grid', zaposleniData.nastavnici, 'teacher', 'chalkboard-teacher');
  generateStaffCards('pomocno-osoblje-grid', zaposleniData.pomocnoOsoblje, 'support', 'hands-helping');
});
