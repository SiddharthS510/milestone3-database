const express = require('express');
const libraryService = require('../service/library');
const router = express.Router();

//To verify the credentials of the user          
router.post('/login', (req, res, next) => {
    libraryService.login(req.body).then((userData) => {
        userData.password = ''
        res.json(userData);
    }).catch(err => {
        next(err);
    })
})

//To get all the books
router.get('/allBooks', (req, res, next) => {
    libraryService.getAllBooks().then(data => {
        res.json(data)
    }).catch(err => {
        next(err);
    })
})

//get books by author
router.get('/booksbyauthor/:authorName', (req, res, next) =>{
    let authorName = req.params.authorName;
    libraryService.getBooksByAuthor(authorName).then(books => {
        res.json(books)
    }).catch(err => next(err))
})

//get books by genre
router.get('/booksbygenre/:genre', (req, res, next) =>{
    let genre = req.params.genre;
    libraryService.getBooksByGenre(genre).then(books => {
        res.json(books)
    }).catch(err => next(err))
})

//Get issued books of  user
router.get('/issuedBooks/:userId', (req, res, next) => {
    let userId = req.params.userId;
    libraryService.getIssuedBooks(userId).then(books => {
        res.json(books)
    }).catch(err => next(err))
})

//To return a book
router.put('/returnBooks/:bookId/user/:userId', (req, res, next) => {
    libraryService.returnBook(req.params.userId, req.params.bookId).then((bookName) => {
        res.json({ "message": `${bookName} is successfully returned` });
    }).catch(err => {
        next(err);
    })
})

//To issue a book
router.put('/issueBooks/:bookId/user/:userId', (req, res, next) => {
    libraryService.issueBook(req.params.userId, req.params.bookId).then((bookName) => {
        res.json({ "message": `${bookName} is successfully issued` });
    }).catch(err => {
        next(err);
    })
})

module.exports = router;