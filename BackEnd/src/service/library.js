const libraryModel = require('../model/library');
const libraryService = {}

libraryService.login = (userObj) => {
    return libraryModel.login(userObj).then(response => {
        if (response) {
            return response[0]
        } else {
            let err = new Error('Invalid credentials');
            err.status = 404;
            throw err;
        }
    })
}

libraryService.getAllBooks = () => {
    return libraryModel.getAllBooks().then(response => {
        if (response) return response
        else {
            let err = new Error('Sorry! no more books are left in library');
            err.status = 404;
            throw err;
        }
    })
}

libraryService.getBooksByAuthor = (authorName) =>{
    return libraryModel.getBooksByAuthor(authorName).then(response => {
        if (response?.books) {
            if(response?.books?.length > 0){
                return response
            }
            else{
                throw (new Error('Sorry! No books available now'))
            }
        }
        else {
            let err = new Error('Some error occured. Please try again later!');
            err.status = 404;
            throw err;
        }
    })
}

libraryService.getBooksByGenre = (genre) =>{
    return libraryModel.getBooksByGenre(genre).then(response => {
        if (response) {
            if(response?.length > 0){
                return response
            }
            else{
                throw (new Error('Sorry! No books available now'))
            }
        }
        else {
            let err = new Error('Some error occured. Please try again later!');
            err.status = 404;
            throw err;
        }
    })
}

libraryService.getIssuedBooks = (userId) => {
    return libraryModel.getIssuedBooks(userId).then(issuedBooks => {
        if (issuedBooks && issuedBooks.length > 0) {
            return issuedBooks
        } else {
            let err = new Error('No books were issued to you!');
            err.status = 404;
            throw err;
        }
    })
}

libraryService.returnBook = (userId, bookId) => {
    return libraryModel.returnBook(userId, bookId).then(bookName => {
        if (bookName) {
            return bookName
        } else {
            let err = new Error("Book returning failed");
            err.status = 500;
            throw err;
        }
    })
}

libraryService.issueBook = (userId, bookId) => {
    return libraryModel.checkUser(userId).then(data => {
        if (data) {
            if (data.booksTaken.includes(bookId)) {
                let err = new Error('Book is already issued to you');
                err.status = 404;
                throw err;
            }
            return libraryModel.checkBook(bookId).then(book => {
                if (book && book.availability > 0) {
                    if (data.booksTaken.length < 5) {
                        return libraryModel.issueBook(userId, bookId).then(response => {
                            if (response) {
                                return book.bookName
                            } else {
                                let err = new Error('Issuing book is failed');
                                err.status = 500;
                                throw err;
                            }
                        })
                    } else {
                        let err = new Error("Can't issue more than 5 books");
                        err.status = 403;
                        throw err;
                    }

                } else {
                    let err = new Error('Book is currently out of stock');
                    err.status = 307;
                    throw err;
                }
            })

        } else {
            let err = new Error('Please register to issue the books');
            err.status = 401;
            throw err;
        }
    })
}

module.exports = libraryService;