const myBook = [];

const addButton = document.querySelector(".add-button");
const addToArray = document.querySelector(".confirm");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("isRead");
const books = document.querySelector(".books");
let modalTrigger = false;
let index = 0;

addToArray.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(
    index,
    title.value,
    author.value,
    pages.value,
    isRead.checked
  );
  modalTrigger = false;
  toogleModal();
  loadBooks();
  giveReadFunction();
});

function Book(...params) {
  const [index, title, author, pages, isRead] = params;
  this.index = index;
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
  index++;
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
  readButton.textContent = isRead ? "Not read yet" : "Already Read";
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
  while (books.firstChild) {
    books.removeChild(books.firstChild);
  }
  myBook.forEach((item) => {
    books.appendChild(
      createCard(item.title, item.author, item.pages, item.title)
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
      button.textContent = myBook[i].isRead ? "Not read yet" : "Already Read";
    });
  });
}

addButton.addEventListener("click", () => {
  modalTrigger = !modalTrigger;
  toogleModal();
});

loadBooks();
