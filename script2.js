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
