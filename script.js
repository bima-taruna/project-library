function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      isRead ? "already read" : "not read yet"
    }`;
  };
}

const book1 = new Book("The Hobbit", "J.R.R Tolkien", 295, false);

console.log(book1.info());
