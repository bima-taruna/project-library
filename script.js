const myBook = [
  {
    title: "The Hobbit",
    author: "J.R.R Tolkien",
    pages: 295,
    isRead: false,
  },
];
const readButton = document.createElement("button");
const deleteButton = document.createElement("button");
const addButton = document.querySelector(".add-button");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
readButton.classList.add("read-button");
readButton.textContent = "Read";
const books = document.querySelector(".books");
let modalTrigger = false;

function Book(...params) {
  const [title, author, pages, isRead] = params;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.toogleRead = function () {
    this.isRead = !this.isRead;
  };
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      isRead ? "already read" : "Haven't read yet"
    }`;
  };
}

function addBookToLibrary(...params) {
  const newBook = new Book(...params);
  myBook.push(newBook);
}

function createCard(...params) {
  const [title, author, pages, isRead] = params;
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
  trashImage.classList.add("icon");
  trashImage.setAttribute("src", "icons/trash-can.png");
  trashImage.setAttribute("alt", "delete button");
  deleteButton.classList.add("delete-button");
  deleteButton.appendChild(trashImage);
  return deleteButton;
}

function loadBooks() {
  myBook.forEach((item) => {
    books.appendChild(
      createCard(item.title, item.author, item.pages, item.title)
    );
  });
}

addButton.addEventListener("click", () => {
  modalTrigger = !modalTrigger;
  showModal();
});

function showModal() {
  if (modalTrigger) {
    overlay.style.display = "block";
  } else {
    overlay.style.display = "none";
  }
}

loadBooks();
