class Bookstore {
  constructor() {
    this.BooksContainer = document.querySelector('.booksDisplay');
    this.bookTitle = document.querySelector('#Title');
    this.bookAuthor = document.querySelector('#Author');
    this.bookLibrary = [];
    this.addBook = this.addBook.bind(this);
  }

  storedLocal() {
    if (localStorage.getItem('books') == null) {
      localStorage.setItem('books', JSON.stringify(this.bookLibrary));
    }

  const store = localStorage.getItem('books');
      if (store) {
          this.bookLibrary = JSON.parse(store);
    }
  }

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
          <button onclick="removeBook(${index})">Remove</button>
        </div>
      </div>
    </div>
    `;
    this.BooksContainer.appendChild(bookContainer);
  });
  }

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
}

const objectOne = new Bookstore();

function removeBook(index) {
  objectOne.bookLibrary = objectOne.bookLibrary.filter((book, bookIndex) => bookIndex !== index);
  localStorage.setItem('books', JSON.stringify(objectOne.bookLibrary));

  objectOne.createLibrary();
}

const form = document.querySelector('form');
form.addEventListener('submit', objectOne.addBook);

objectOne.storedLocal();
objectOne.createLibrary();
removeBook();

