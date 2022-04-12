const dbModel = require('../utilities/connection');
const libraryDB = {}

//To check the existence of the user
libraryDB.checkUser = (userId) => {
    return dbModel.getUserCollection().then(userColl => {
        return userColl.find({ userId: userId }).then(data => {
            return data.length > 0 ? data[0] : null
        })
    })
}

//To check the existence of a book
libraryDB.checkBook = (bookId) => {
    return dbModel.getBookCollection().then(bookColl => {
        return bookColl.find({ bookId: bookId }).then(data => {
            return data.length > 0 ? data[0] : null
        })
    })
}

//To validate user credentials
libraryDB.login = (userObj) => {
    return dbModel.getUserCollection().then(userColl => {
        return userColl.find({ email: userObj.email, password: userObj.password }).then(data => {
            if (data.length > 0) {
                return data
            } else return null
        })
    })
}

//To retreive all books
libraryDB.getAllBooks = () => {
    return dbModel.getBookCollection().then(bookColl => {
        return bookColl.find({}).then(data => {
            if (data.length > 0) {
                return data
            } else return null
        })
    })
}

//To retreive all books of a author
libraryDB.getBooksByAuthor = (authorName) =>{
    return dbModel.getAuthorCollection().then(authorColl => {
        return authorColl.findOne({authorName}).then(authorData =>{
            if(authorData?.books?.length > 0){
                return dbModel.getBookCollection().then(bookColl => {
                    return bookColl.find({bookId: {$in : authorData.books}}).then(booksByAuthor =>{
                        const {authorId, authorName, dob, subjects} = authorData
                        return {authorId, authorName, dob, subjects, books:booksByAuthor}
                    })
                })
            }
        })
    })
}

//To retreive all books of a genre
libraryDB.getBooksByGenre = (genre) =>{
    return dbModel.getGenreCollection().then(genreColl => {
        return genreColl.findOne({genre}).then(genreData =>{
            if(genreData?.books?.length > 0){
                return dbModel.getBookCollection().then(bookColl => {
                    return bookColl.find({bookId: {$in : genreData.books}}).then(booksByGenre =>{
                        return booksByGenre
                    })
                })
            }
        })
    })
}

//To get issued books of a particular user
libraryDB.getIssuedBooks = (userId) => {
    return dbModel.getUserCollection().then(userColl => {
        return userColl.findOne({ userId: userId }, { booksTaken: 1 }).then(userData => {
            if (userData.booksTaken.length > 0) {
                return dbModel.getBookCollection().then(bookColl => {
                    return bookColl.find({ bookId: { $in: userData.booksTaken } }, { "__V": 0 }).then(booksData => {
                        //    console.log(userData.booksTaken, booksData)
                        return booksData
                    })
                })
            }
        })
    })
}

//To return a book
libraryDB.returnBook = (userId, bookId) => {
    return dbModel.getUserCollection().then(userColl => {
        return userColl.updateOne({ userId: userId }, { $pull: { booksTaken: bookId } }).then(response => {
            if (response.nModified === 1) {
                return dbModel.getBookCollection().then(bookColl => {
                    return bookColl.updateOne({ bookId: bookId }, { $inc: { availability: 1 } }).then(response => {
                        if (response.nModified === 1) {
                            return bookColl.findOne({bookId: bookId}).then( ({bookName}) => bookName )
                        }
                    })
                })
            }
        })
    })
}

//To issue a book
libraryDB.issueBook = (userId, bookId) => {
    return dbModel.getUserCollection().then(userColl => {
        return userColl.updateOne({ userId: userId }, { $push: { booksTaken: bookId } }).then(response => {
            if (response.nModified == 1) {
                return dbModel.getBookCollection().then(bookColl => {
                    return bookColl.updateOne({ bookId: bookId }, { $inc: { availability: -1 } }).then(response => {
                        if (response.nModified == 1) {
                            return bookId
                        }
                    })
                })
            }
        })
    })
}

module.exports = libraryDB;