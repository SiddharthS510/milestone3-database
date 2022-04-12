const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true)
const url = "mongodb://localhost:27017/LibraryDB";

const userSchema = new Schema({
    userId : { type : String, unique : true },
    name : { type : String, required : true },
    email: { type: String, unique : true },
    password : {type : String, required : true},
    booksTaken : { type : [String], default : []}
}, { collection: "Users" });

const bookSchema = new Schema({
    bookId : { type : String , unique : true},
    bookName : { type : String, required : true},
    availability : { type : Number, required : true },
    genre : { type : String, enum : [ "Fantasy", "Drama", "Fiction", "Finance" ] },
    authorName : {type: String},
    publishedDate: {type: Number}
} , { collection: "Books" })

const authorSchema = new Schema({
    authorId : { type : String , unique : true},
    authorName : {type: String},
    dob: {type: String},
    subjects: {type : String},
    books: {type: [String]}
})

const genreSchema = new Schema({
    genreId : { type : String , unique : true},
    genre : { type : String, enum : [ "Fantasy", "Drama", "Fiction", "Finance" ] },
    books: {type: [String]}
})

let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Userdetails', userSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getBookCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Books', bookSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getAuthorCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Author', authorSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getGenreCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Genre', genreSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = collection;