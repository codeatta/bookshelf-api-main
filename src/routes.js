const { 
    createBooksHandler, 
    getAllBooksHandler,
    getByIdBooksHandler
} = require('./handler')
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: ()=>{
            return 'Ini adalah homepage'
        }
    },
    {
        method: '*',
        path: '/',
        handler: ()=>{
            return 'Halaman ini tidak dapat diakses menggunakan method ini!'
        }
    },
    {
        method: 'POST',
        path: '/books',
        handler: createBooksHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{idBook}',
        handler: getByIdBooksHandler
    }
]

module.exports = routes