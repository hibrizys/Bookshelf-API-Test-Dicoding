const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage ? true : false;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);
  const isSuccess = books.filter((buku_buku) => buku_buku.id === id).length > 0;

  if (!isSuccess) {
    const response = h.response({
      status: "error",
      message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
    ``;
  }
  const response = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    const nameBook = books.filter((buku_buku) =>
      buku_buku.name.toUpperCase().includes(name.toUpperCase())
    );
    const response = h.response({
      status: "success",
      data: {
        books: nameBook.map((buku_buku) => ({
          id: buku_buku.id,
          name: buku_buku.name,
          publisher: buku_buku.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  if (reading) {
    const readBook = books.filter(
      (buku_buku) => Number(buku_buku.reading) === Number(reading)
    );
    const response = h.response({
      status: "success",
      data: {
        books: readBook.map((buku_buku) => ({
          id: buku_buku.id,
          name: buku_buku.name,
          publisher: buku_buku.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (finished) {
    const finishBook = books.filter(
      (buku_buku) => Number(buku_buku.finished) === Number(finished)
    );
    const response = h.response({
      status: "success",
      data: {
        books: finishBook.map((buku_buku) => ({
          id: buku_buku.id,
          name: buku_buku.name,
          publisher: buku_buku.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (!name && !reading && !finished) {
    const response = h.response({
      status: "success",
      data: {
        books: books.map((buku_buku) => ({
          id: buku_buku.id,
          name: buku_buku.name,
          publisher: buku_buku.publisher,
        })),
      },
    });
    return response;
  }
};

const getBookIdByHandler = (request, h) => {
  const { bookid } = request.params;

  const isSuccess = books.filter((buku_buku) => buku_buku.id === bookid)[0];

  if (!isSuccess) {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  } else {
    const response = h.response({
      status: "success",
      data: {
        book: isSuccess,
      },
    });
    response.code(200);
    return response;
  }
};

const editBookHandler = (request, h) => {
  const { bookid } = request.params;
  const isSuccess = books.findIndex((buku_buku) => buku_buku.id === bookid);
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();

  if (isSuccess !== -1) {
    books[isSuccess] = {
      ...books[isSuccess],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  } else if (isSuccess.bookid === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

const deleteBookHandler = (request, h) => {
  const { bookid } = request.params;
  const isSuccess = books.findIndex((buku_buku) => buku_buku.id === bookid);
  if (isSuccess !== -1) {
    books.splice(isSuccess, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  } else if (isSuccess.bookid === undefined) {
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookIdByHandler,
  editBookHandler,
  deleteBookHandler,
};
