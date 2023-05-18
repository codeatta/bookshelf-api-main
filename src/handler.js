const { nanoid } = require("nanoid")
const books = require('./books')

const createBooksHandler = (request, h) =>{
    const {
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading
    } = request.payload

    const id = nanoid(16)

    // name
    if (name === null || name === '' || !name) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku."
        })
        response.code(400)
        return response 
    }

    // readPage
    if (readPage > pageCount){
        const response = h.response({
            status:"fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount."
        })
        response.code(400)
        return response
    }

    // finished
    const isFinished = (readPage, pageCount) => {
        if (readPage === pageCount){
            return true
        } else {
            return false
        }
    }
    const finished = isFinished(readPage, pageCount)

    // insertedAt, updatedAt
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt 

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
        updatedAt
    }
    books.push(newBook)

    const isSuccess = books.filter((book)=>book.id === id).length > 0

    // success
    if (isSuccess){
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: { idBook: id}
        })
        response.code(201)
        return response
    }

    // fail
    const response = h.response({
        status: "fail",
        message: "Buku gagal ditambahkan"
    })
    response.code(500)
    return response
}

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query

    // name
    if (name !== undefined){
        const booksName = name.toLowerCase()

        const response = h.response({
            status: "success",
            data: {
                books: books.filter((n) => n.name === booksName).map((books) => ({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher
                }))
            }
        })
        response.code(200)
        return response
    }

    // reading
    if (reading !== undefined) {
        const booksReading = books.filter(
            (books) => Number(books.reading) === Number(reading)
        )

        const response = h.response({
            status: "success",
            data: {
                books: booksReading.map((books) => ({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher
                }))
            }
        })
        response.code(200)
        return response
    }

    // finished
    if (finished !== undefined) {
        const booksFinished = books.filter(
            (books) => books.finished == finished
        )
        const response = h.response({
            status: "success",
            data: {
                books: booksFinished.map((books) => ({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher
                }))
            }
        })
        response.code(200)
        return response
    }

    // success
    const res = h.response({
        status: 'success',
        data: {
            books: books.map((b) => ({
                id: b.id,
                name: b.name,
                publisher: b.publisher
            }))
        }
    })
    res.code(200)
    return res
}

const getByIdBooksHandler = (request, h) => {
    const {idBook} = request.params

    // success
    const book = books.filter((book) => book.id === idBook)[0]
    if (book !== undefined) {
        return {
            status: "success",
            data: {
                book
            }
        }
    } else {
        // fail
        const res = h.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        })
        res.code(404)
        return res
    }

}

module.exports = {
    createBooksHandler,
    getAllBooksHandler,
    getByIdBooksHandler
}