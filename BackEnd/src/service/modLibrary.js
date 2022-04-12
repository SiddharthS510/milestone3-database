const libraryModel = require('../model/library');
const validator = require('../utilities/validator');

let libraryService = {}

const errorCreation = ( message, status )=>{
    let err = new Error(message);
     err.status = status ? status : 500;
    throw err;

} 

libraryService.login(userObj) = () => {
    return libraryModel.login(userObj).then(response => {
        if (response) {
            return response[0]
        } else {
            return errorCreation('Invalid credentials', 404)
        }
    })
}

libraryService.getAllBooks = () => {
    return libraryModel.getAllBooks().then(response => {
        if (response) return response
        else {
            return errorCreation('Sorry! no more books are left in library', 404)
        }
    })
}

libraryService.returnBook = (userId, bookId) => {
    return libraryModel.returnBook(userId, bookId).then(response => {
        if (response) {
            return response
        } else {
            return errorCreation('Book returning failed', 500);
        }
    })
}


libraryService.issueBook = (userId, bookId) => {
    return libraryModel.checkUser(userId).then(data => {
        if (data.length > 0) {
            if(data[0].booksTaken.length > 0 ){
                return libraryModel.checkBook(bookId).then( response =>{
                    if(response && response.availability > 0){
                        return libraryModel.issueBook(userId, bookId).then(response => {
                            if (response) {
                                return response
                            } else {
                                return errorCreation('Issuing book is failed', 500);                                
                            }
                        })                        
                    }else{
                        return errorCreation('Book is currently out of stock', 307);                                
                    }
                })
            }else{
                return errorCreation("Can't issue more than 3 books", 403);                                                
            }
        } else {
            return errorCreation("Please register to issue the books", 401);                                                            
        }
    })
}

module.exports = libraryService;
