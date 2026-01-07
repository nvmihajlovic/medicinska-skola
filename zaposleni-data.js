// Подаци о запосленима
const zaposleniData = {
  rukovodstvo: [
    { ime: "Калапиш Светлана", pozicija: "Директор школе", pozicijaKey: "positions.director", pol: "female", ikonica: "award" },
    { ime: "Рошу Марко", pozicija: "Секретар", pozicijaKey: "positions.secretary", pol: "male", ikonica: "certificate" },
    { ime: "Лупшић Милан", pozicija: "Организатор наставе", pozicijaKey: "positions.teaching_organizer", pol: "male", ikonica: "star" }
  ],
  
  strucnaSluzba: [
    { ime: "Марија Петровски", pozicija: "Шеф рачуноводства", pozicijaKey: "positions.accounting_head", pol: "female", ikonica: "calculator" },
    { ime: "Тешић Маја", pozicija: "Административни радник", pozicijaKey: "positions.admin_worker", pol: "female", ikonica: "clipboard" },
    { ime: "Зуровац Соња", pozicija: "Библиотекар", pozicijaKey: "positions.librarian", pol: "female", ikonica: "book-reader" },
    { ime: "Рашовић Клара", pozicija: "Психолог", pozicijaKey: "positions.psychologist", pol: "female", ikonica: "brain" },
    { ime: "Даничић Љиљана", pozicija: "Педагог", pozicijaKey: "positions.pedagogue", pol: "female", ikonica: "chalkboard" }
  ],
  
  nastavnici: [
    { ime: "Урошев Драгана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Арамбашић Наташа", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Марковић Љиљана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Цамтоска Наташа", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Коленовић Маја", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Николић Рада", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Деља Анђелка", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Стојаковић Биљана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Никодиновић Виолета", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Ротар С. Јелица", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Весна Павлов", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Павловић Марина", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Ристић Тамара", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Грујић Наталија", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Лукић Драгана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Бонџић Мирјана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Прпа Зорица", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Тодоровић Тамара", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Бека Емилијан", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "male" },
    { ime: "Васић Гордана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Драгосавац Драгана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Пешић Милош", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "male" },
    { ime: "Зуровац Соња", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Лазаров Наташа", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Бачкоња Предраг", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "male" },
    { ime: "Љубојевић Катарина", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Књегињић Јелена", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Васић Р. Сунчица", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Павлов Весна", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Чолока Минодора", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Ожеговић Драгослава", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Родић Оливера", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Радуловић Јасмина", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Радовановић Дорина", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Богдан Весна", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Врањковић Даница", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Стојку Сања", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Врањеш Богуновић Дубравка", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Михајловић Снежана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Кљајић Маријана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Дудуј Ортопан Санела", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Ступар Здјелар Душанка", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Лошић Светлана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Пећанац Хајналка", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Стокић Мирјана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Живанов Светлана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Стефанов Татјана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Ратков Бојана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Аксовић Милица", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Андрејевић Анђела", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Лазаревић Вања", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Станић Милица", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Јованов Марина", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "Станојевски Јелена", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "др Поповић Бојана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female", doktor: true },
    { ime: "др Бурић Мирјана", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female", doktor: true },
    { ime: "др Бубања Каролина", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female", doktor: true },
    { ime: "др Манасијевић Зоран", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "male", doktor: true },
    { ime: "др Милетић Јелена", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female", doktor: true },
    { ime: "др Ередељанин Мирослав", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "male", doktor: true },
    { ime: "Јованов Јасна", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "female" },
    { ime: "др Малић Душан", pozicija: "Наставник", pozicijaKey: "positions.teacher", pol: "male", doktor: true }
  ],
  
  pomocnoOsoblje: [
    { ime: "Кемењ Вероника", pozicija: "Спремачица", pozicijaKey: "positions.cleaning_staff", pol: "female", ikonica: "broom" },
    { ime: "Лазић Љиљана", pozicija: "Спремачица", pozicijaKey: "positions.cleaning_staff", pol: "female", ikonica: "broom" },
    { ime: "Гујанчић Србинка", pozicija: "Спремачица", pozicijaKey: "positions.cleaning_staff", pol: "female", ikonica: "broom" },
    { ime: "Миловановић Снежана", pozicija: "Спремачица", pozicijaKey: "positions.cleaning_staff", pol: "female", ikonica: "broom" },
    { ime: "Субин Владимир", pozicija: "Домар", pozicijaKey: "positions.janitor", pol: "male", ikonica: "tools" }
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
    
    // Use pozicijaKey for i18n if available, otherwise use pozicija
    const positionHTML = person.pozicijaKey 
      ? `<p class="staff-position" data-i18n="${person.pozicijaKey}">${person.pozicija}</p>`
      : `<p class="staff-position">${person.pozicija}</p>`;
    
    card.innerHTML = `
      <div class="staff-avatar ${avatarClass}">
        <i class="fas fa-user"></i>
      </div>
      <div class="staff-info">
        <h3 class="staff-name">${person.ime}</h3>
        ${positionHTML}
      </div>
      <div class="staff-badge ${badgeClass}">
        <i class="fas fa-${badgeIcon}"></i>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  // Trigger i18n translation for newly added elements
  if (typeof window.translatePage === 'function') {
    window.translatePage();
  }
}

// Иницијализација када се страница учита
document.addEventListener('DOMContentLoaded', function() {
  generateStaffCards('rukovodstvo-grid', zaposleniData.rukovodstvo, '', 'award');
  generateStaffCards('strucna-sluzba-grid', zaposleniData.strucnaSluzba, 'support', 'users-cog');
  generateStaffCards('nastavnici-grid', zaposleniData.nastavnici, 'teacher', 'chalkboard-teacher');
  generateStaffCards('pomocno-osoblje-grid', zaposleniData.pomocnoOsoblje, 'support', 'hands-helping');
});
