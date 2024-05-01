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
    this.#addButton.addEventListener("click", () => {
      this.#modalTrigger = !this.#modalTrigger;
      this.toogleModal();
    });
  }

  toogleModal() {
    if (modalTrigger) {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  }
}
