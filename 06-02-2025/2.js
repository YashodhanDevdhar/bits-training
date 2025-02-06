bookLibrary = {
  books: [
    {
      title: "The Tragedy of Great Power Politics",
      author: "John Mearsheimer",
      yearPublished: 2001,
    },
    {
      title: "The Grand Chessboard",
      author: "Zbigniew Brzezinski",
      yearPublished: 1997,
    },
    {
      title: "The Revenge of Geography",
      author: "Robert D. Kaplan",
      yearPublished: 2012,
    },
    {
      title: "Prisoners of Geography",
      author: "Tim Marshall",
      yearPublished: 2015,
    },
    {
      title: "The Silk Roads: A New History of the World",
      author: "Peter Frankopan",
      yearPublished: 2015,
    },
  ],
  addBook: function (book) {
    this.books.push(book);
  },
  getBooksByAuthor: function (author) {
    return this.books.filter(book => book.author === author);
  },
  removeBook: function (title) {
    this.books = this.books.filter(book => book.title !== title);
  },
  getAllBooks: function () {
    return this.books;
  },
};


bookLibrary.addBook({
    title:"The India Way",
    author:"Dr. S. Jaishankar",
    yearPublished:2020
});

console.log(bookLibrary.getBooksByAuthor("Dr. S. Jaishankar"));

bookLibrary.removeBook("The Tragedy of Great Power Politics");

console.log(bookLibrary.getAllBooks());