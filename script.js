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