class Book {
  constructor(...params) {
    const [title, author, pages, isRead] = params;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  get info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      isRead ? "already read" : "Haven't read yet"
    }`;
  }

  toogleRead() {
    this.isRead = !this.isRead;
  }
}

class Library {
  #myBook = [];
  #modalTrigger = false;
  #addButton = document.querySelector(".add-button");
  #addBookForm = document.querySelector(".add-book");
  #overlay = document.querySelector(".overlay");
  #title = document.getElementById("title");
  #author = document.getElementById("author");
  #pages = document.getElementById("pages");
  #isRead = document.getElementById("isRead");
  #books = document.querySelector(".books");
  #closeModalButton = document.querySelector(".close-modal");

  constructor() {
    this.loadBooks;

    this.#addButton.addEventListener("click", () => {
      this.#modalTrigger = !this.#modalTrigger;
      this.toogleModal;
    });

    this.#addBookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addBookToLibrary(
        title.value,
        author.value,
        pages.value,
        isRead.checked
      );
    });

    this.#closeModalButton.addEventListener("click", () => {
      this.#modalTrigger = false;
      this.toogleModal;
    });
  }

  loadBooks = () => {
    while (this.#books.children.length > 0) {
      this.#books.removeChild(this.#books.firstChild);
    }

    this.#myBook.forEach((item) => {
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      let content = `
      <button class="delete-button">
        <img class="icon" src="icons/trash-can.png" alt="delete button">
      </button>
      <ul class="content">
        <li class="title">${item.title}</li>
        <li class="author">${item.author}</li>
        <li class="pages">${item.pages} pages</li>
        <li class="read">
          <button class="read-button" style="background-color: ${
            item.isRead ? "#abc4aa" : "red"
          }; color: ${item.isRead ? "#675d50" : "white"};">${
        item.isRead ? "Already read" : "Not read yet"
      }</button>
        </li>
      </ul>
    `;
      newCard.innerHTML = content;
      this.#books.appendChild(newCard);
    });
  };

  addBookToLibrary = (...params) => {
    const newBook = new Book(...params);
    this.#myBook.push(newBook);
    this.#modalTrigger = false;
    this.toogleModal;
    this.loadBooks;
  };

  toogleModal = () => {
    if (this.#modalTrigger) {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  };
}
