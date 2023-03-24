const {
  addBookHandler,
  getAllBookHandler,
  getBookIdByHandler,
  editBookHandler,
  deleteBookHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBookHandler,
  },
  {
    method: "GET",
    path: "/books/{bookid}",
    handler: getBookIdByHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookid}",
    handler: editBookHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookid}",
    handler: deleteBookHandler,
  },
];

module.exports = routes;
