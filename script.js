let library = (function () {
  const myBook = [];
  let modalTrigger = false;
  const addButton = document.querySelector(".add-button");
  const addBookForm = document.querySelector(".add-book");
  const overlay = document.querySelector(".overlay");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const isRead = document.getElementById("isRead");
  const books = document.querySelector(".books");
  const closeModalButton = document.querySelector(".close-modal");

  addButton.addEventListener("click", () => {
    modalTrigger = !modalTrigger;
    toogleModal();
  });

  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary(title.value, author.value, pages.value, isRead.checked);
  });

  closeModalButton.addEventListener("click", () => {
    modalTrigger = false;
    toogleModal();
  });

  loadBooks();

  function loadBooks() {
    while (books.children.length > 0) {
      books.removeChild(books.firstChild);
    }

    myBook.forEach((item) => {
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
          }; color: ${isRead ? "#675d50" : "white"};">${
        item.isRead ? "Already read" : "Not read yet"
      }</button>
        </li>
      </ul>
    `;
      newCard.innerHTML = content;
      books.appendChild(newCard);
    });
    console.log(myBook);
  }

  function Book(...params) {
    const [title, author, pages, isRead] = params;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${
        isRead ? "already read" : "Haven't read yet"
      }`;
    };
  }

  Book.prototype.toogleRead = function () {
    this.isRead = !this.isRead;
  };

  function addBookToLibrary(...params) {
    const newBook = new Book(...params);
    myBook.push(newBook);
    modalTrigger = false;
    toogleModal();
    loadBooks();
    giveReadFunction();
    giveDeleteFunction();
  }

  function toogleModal() {
    if (modalTrigger) {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  }

  function giveReadFunction() {
    const readButtons = document.querySelectorAll(".read-button");
    readButtons.forEach((button, i) => {
      button.addEventListener("click", () => {
        myBook[i].toogleRead();
        loadBooks();
        giveReadFunction();
        giveDeleteFunction();
      });
    });
  }

  function giveDeleteFunction() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button, i) => {
      button.addEventListener("click", () => {
        myBook.splice(i, 1);
        loadBooks();
        giveReadFunction();
        giveDeleteFunction();
      });
    });
  }

  function deleteBooks(params) {}

  return {
    addBookToLibrary,
  };
})();
