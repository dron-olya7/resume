// Функция для расчета разницы между датами в месяцах
function getMonthDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();

  // Корректируем если день месяца еще не наступил
  if (end.getDate() < start.getDate()) {
    months--;
  }

  return Math.max(0, months);
}

// Функция для форматирования периода
function formatPeriod(months) {
  if (months < 12) {
    return `${months} ${getMonthWord(months)}`;
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return `${years} ${getYearWord(years)}`;
    } else {
      return `${years} ${getYearWord(years)} ${remainingMonths} ${getMonthWord(
        remainingMonths
      )}`;
    }
  }
}

// Функции для правильных окончаний
function getMonthWord(months) {
  if (months % 10 === 1 && months % 100 !== 11) return "месяц";
  if ([2, 3, 4].includes(months % 10) && ![12, 13, 14].includes(months % 100))
    return "месяца";
  return "месяцев";
}

function getYearWord(years) {
  if (years % 10 === 1 && years % 100 !== 11) return "год";
  if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100))
    return "года";
  return "лет";
}

// Функция для форматирования даты
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Основная функция для обновления всех периодов
function updateAllPeriods() {
  const periodElements = document.querySelectorAll(".period[data-start]");
  let totalMonths = 0;

  periodElements.forEach((element) => {
    const startDate = element.getAttribute("data-start");
    const endDate = element.getAttribute("data-end");
    const months = getMonthDifference(startDate, endDate);

    // Форматируем текст периода
    const startFormatted = formatDate(startDate);
    const endFormatted = endDate ? formatDate(endDate) : "настоящее время";
    const durationFormatted = formatPeriod(months);

    element.textContent = `${startFormatted} — ${endFormatted} · ${durationFormatted}`;

    // Суммируем для общего опыта
    totalMonths += months;
  });

  // Обновляем общий опыт работы
  const totalExperienceElement = document.getElementById("total-experience");
  if (totalExperienceElement) {
    totalExperienceElement.textContent = `Опыт работы — ${formatPeriod(
      totalMonths
    )}`;
  }
}

// Запускаем при загрузке страницы
document.addEventListener("DOMContentLoaded", updateAllPeriods);