const myBook = [];

const addButton = document.querySelector(".add-button");
const addBookForm = document.querySelector(".add-book");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("isRead");
const books = document.querySelector(".books");
const closeModalButton = document.querySelector(".close-modal");
let modalTrigger = false;

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, isRead.checked);
  modalTrigger = false;
  toogleModal();
  loadBooks();
  giveReadFunction();
  giveDeleteFunction();
});

closeModalButton.addEventListener("click", () => {
  modalTrigger = false;
  toogleModal();
});

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
}

function createCard(...params) {
  const [title, author, pages, isRead] = params;
  const readButton = document.createElement("button");
  const card = document.createElement("div");
  const content = document.createElement("ul");
  const titleList = document.createElement("li");
  const authorList = document.createElement("li");
  const pagesList = document.createElement("li");
  const readList = document.createElement("li");
  titleList.classList.add("title");
  authorList.classList.add("author");
  pagesList.classList.add("pages");
  readList.classList.add("read");
  readButton.classList.add("read-button");
  readButton.textContent = "Read";
  titleList.textContent = title;
  authorList.textContent = author;
  pagesList.textContent = pages + " pages";
  readButton.textContent = isRead ? "Already Read" : "Not read yet";
  readButton.style.backgroundColor = isRead ? "#abc4aa" : "red";
  readButton.style.color = isRead ? "#675d50" : "white";
  readList.appendChild(readButton);
  content.classList.add("content");
  card.classList.add("card");
  content.appendChild(titleList);
  content.appendChild(authorList);
  content.appendChild(pagesList);
  content.appendChild(readList);
  card.appendChild(createDeleteButton());
  card.appendChild(content);
  return card;
}

function createDeleteButton() {
  const trashImage = document.createElement("img");
  const deleteButton = document.createElement("button");
  trashImage.classList.add("icon");
  trashImage.setAttribute("src", "icons/trash-can.png");
  trashImage.setAttribute("alt", "delete button");
  deleteButton.classList.add("delete-button");
  deleteButton.appendChild(trashImage);
  return deleteButton;
}

function loadBooks() {
  while (books.children.length > 0) {
    books.removeChild(books.firstChild);
  }
  myBook.forEach((item) => {
    books.appendChild(
      createCard(item.title, item.author, item.pages, item.isRead)
    );
  });
  console.log(myBook);
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

addButton.addEventListener("click", () => {
  modalTrigger = !modalTrigger;
  toogleModal();
});

loadBooks();
