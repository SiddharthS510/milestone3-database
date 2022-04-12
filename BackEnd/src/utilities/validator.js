/* 
    DO NOT change function names.
*/
var Validator = {}

Validator.validateUserId = userId =>{
   //Code the function to Validate User Id
    if( !new RegExp(/^U[1-9]{3}$/).test(userId) ){
        let err = new Error('Invalid user Id');
        err.status = 422;
        throw err;
    }
}

Validator.validateBookId= bookId => {
    //Code the function to validate bookId
    if( !new RegExp(/^B[1-9]{3}$/).test(bookId) ){
        let err = new Error('Invalid book Id');
        err.status = 422;
        throw err;
    }
}

module.exports = Validator;