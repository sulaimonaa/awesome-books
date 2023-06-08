class DateFormatter {
  constructor() {
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }
  getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  formatTime(hours, minutes, seconds) {
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
  }

  formatDate(date) {
    const month = this.months[date.getMonth()];
    const day = date.getDate();
    const ordinalSuffix = this.getOrdinalSuffix(day);
    const year = date.getFullYear();
    return `${month} ${day}${ordinalSuffix} ${year}`;
  }

  formatDateTime(date) {
    const formattedDate = this.formatDate(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedTime = this.formatTime(hours, minutes, seconds);
    return `${formattedDate}, ${formattedTime}`;
  }
}

// Example usage
const formatter = new DateFormatter();
const displayElement = document.querySelector('.dateDisplay');

function updateDateTime() {
  const date = new Date();
  const formattedDateTime = formatter.formatDateTime(date);
  displayElement.textContent = formattedDateTime;
}

// Update the time immediately
updateDateTime();

// Update the time every second
setInterval(updateDateTime, 1000);
