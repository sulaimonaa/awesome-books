class Bookstore {
  constructor() {
    this.BooksContainer = document.querySelector('.booksDisplay');
    this.bookTitle = document.querySelector('#Title');
    this.bookAuthor = document.querySelector('#Author');
    this.bookLibrary = [];
    this.addBook = this.addBook.bind(this);
  }

  // displays already added books to storage
  storedLocal() {
    if (localStorage.getItem('books') == null) {
      localStorage.setItem('books', JSON.stringify(this.bookLibrary));
    }

    const store = localStorage.getItem('books');
    if (store) {
      this.bookLibrary = JSON.parse(store);
    }
  }

  // create a new book display
  createLibrary() {
    this.BooksContainer.innerHTML = '';
    this.bookLibrary.forEach((book, index) => {
      const bookContainer = document.createElement('div');
      bookContainer.innerHTML = `
      <div class='book-list-container'>
        <div class='wrap'>
          <div>
              <p>${book.titleBook}</p>
              <p> ${book.authorBook}</p>
          </div>
          <div class='removeBtn'>
            <button onclick="objectOne.removeBook(${index})">Remove</button>
          </div>
        </div>
      </div>
      `;
      this.BooksContainer.appendChild(bookContainer);
    });
  }

  // take in and stores new book in local storage
  addBook(e) {
    e.preventDefault();
    const titleBook = this.bookTitle.value;
    const authorBook = this.bookAuthor.value;
    const newBooks = { titleBook, authorBook };

    this.bookLibrary.push(newBooks);
    localStorage.setItem('books', JSON.stringify(this.bookLibrary));

    this.createLibrary();

    this.bookTitle.value = '';
    this.bookAuthor.value = '';
  }

  // remove book
  removeBook(index) {
    this.bookLibrary = this.bookLibrary.filter((book, bookIndex) => bookIndex !== index);
    localStorage.setItem('books', JSON.stringify(this.bookLibrary));

    this.createLibrary();
  }
}

const objectOne = new Bookstore();

const form = document.querySelector('form');
form.addEventListener('submit', objectOne.addBook);

objectOne.storedLocal();
objectOne.createLibrary();

class DateFormatter {
  constructor() {
    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
  }
  
getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
    
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
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

// toggle display between the list, add book and contact
const showList = document.getElementById('showList');
const addNewBook = document.getElementById('addNewBook');
const showContact = document.getElementById('showContact');
const bookDisplay = document.querySelector('.bookContainer');
const formDisplay = document.querySelector('.formContainer');
const contactDisplay = document.querySelector('.contactContainer');

showList.addEventListener('click', () => {
  bookDisplay.style.display = 'block';
  formDisplay.style.display = 'none';
  contactDisplay.style.display = 'none';
});

addNewBook.addEventListener('click', () => {
  bookDisplay.style.display = 'none';
  formDisplay.style.display = 'block';
  contactDisplay.style.display = 'none';
});

form.addEventListener('submit', () => {
  bookDisplay.style.display = 'block';
  formDisplay.style.display = 'none';
  contactDisplay.style.display = 'none';
});

showContact.addEventListener('click', () => {
  bookDisplay.style.display = 'none';
  formDisplay.style.display = 'none';
  contactDisplay.style.display = 'block';
});