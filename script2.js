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
  #myBook;
  #modalTrigger;
  #addButton;
  #addBookForm;
  #overlay;
  #title;
  #author;
  #pages;
  #isRead;
  #books;
  #closeModalButton;

  constructor() {
    this.#myBook = [];
    this.#modalTrigger = false;
    this.#addButton = document.querySelector(".add-button");
    this.#addBookForm = document.querySelector(".add-book");
    this.#overlay = document.querySelector(".overlay");
    this.#title = document.getElementById("title");
    this.#author = document.getElementById("author");
    this.#pages = document.getElementById("pages");
    this.#isRead = document.getElementById("isRead");
    this.#books = document.querySelector(".books");
    this.#closeModalButton = document.querySelector(".close-modal");
  }

  render = () => {
    this.#loadBooks();

    this.#addButton.addEventListener("click", () => {
      this.#modalTrigger = !this.#modalTrigger;
      this.#toogleModal();
    });

    this.#addBookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addBookToLibrary(
        this.#title.value,
        this.#author.value,
        this.#pages.value,
        this.#isRead.checked
      );
    });

    this.#closeModalButton.addEventListener("click", () => {
      this.#modalTrigger = false;
      this.#toogleModal();
    });

    this.#books.addEventListener("click", (e) => {
      const { target } = e;
      const targetElement = target.closest(".delete-button");
      if (targetElement) {
        let i = this.#indexInParent(targetElement.closest(".card"));
        this.deleteBook(i);
      }
    });

    this.#books.addEventListener("click", (e) => {
      const { target } = e;
      const targetElement = target.closest(".read-button");
      if (targetElement) {
        let i = this.#indexInParent(targetElement.closest(".card"));
        this.toogleRead(i);
      }
    });
  };

  #loadBooks = () => {
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
    this.#toogleModal();
    this.#loadBooks();
  };

  #toogleModal = () => {
    if (this.#modalTrigger) {
      this.#overlay.style.display = "block";
    } else {
      this.#overlay.style.display = "none";
    }
  };

  #indexInParent = (node) => {
    var children = node.parentNode.childNodes;
    var num = 0;
    for (var i = 0; i < children.length; i++) {
      if (children[i] == node) return num;
      if (children[i].nodeType == 1) num++;
    }
    return -1;
  };

  deleteBook = (index) => {
    this.#myBook.splice(index, 1);
    this.#loadBooks();
  };

  toogleRead = (index) => {
    this.#myBook[index].toogleRead();
    this.#loadBooks();
  };
}

let libraryApp = new Library();

libraryApp.render();
