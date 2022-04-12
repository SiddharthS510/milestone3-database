import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
const url = "http://localhost:4000/";

class GenreBooks extends Component {

    state = { books: null, successMessage: "", errorMessage: '' }

    componentDidMount() {
        this.getBooksByGenre();
    }

    getBooksByGenre() {
        axios.get(url + 'booksbygenre/' + this.props?.genre).then(response => {
            this.setState({ books: response.data })
        }).catch(err => {
            this.setState({ errorMessage: (err.response?.data?.message || err.message), successMessage: "" })
        })
    }

    handleIssueBook = (bookId) => {
        let finalUrl = url + `issueBooks/${bookId}/user/${this.props.userId}`;
        axios.put(finalUrl).then(res => {
            this.setState({ successMessage: res.data.message, errorMessage: "" })
            this.getBooksByGenre();
        }).catch(err => {
            this.setState({ errorMessage: (err.response?.data?.message || err.message), successMessage: "" })
        })
    }

    render() {
        return <div className="row container-fluid">
            <div className="col-md-8 offset-md-2"><br />
                <div className="card" id='card-colour'>
                    <div className="card-header bg-custom" style={{display: 'flex'}} id='header-colour'>
                        Gnere:&nbsp;&nbsp;<h5>{this.props.genre}</h5>
                    </div>

                    <div className="card-body" >
                        {this.state.books?.length > 0 ? <div className="allbooks-table">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Author name</th>
                                        <th>Book name</th>
                                        <th>Published Year</th>
                                        <th>Availability</th>
                                        <th>Issue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.books.map((book, index) => <tr key={index}>
                                        <td><Link to={`/author/${book.authorName}`}>{book.authorName}</Link></td>
                                        <td>{book.bookName}</td>
                                        <td>{book.publishedDate}</td>
                                        <td>{book.availability > 0 ? book.availability : <span className='text-danger uk-text-bold'>Out of stock</span>}</td>
                                        <td><button type="button" id="btn" disabled={book.availability === 0}
                                            onClick={() => this.handleIssueBook(book.bookId)} className="btn">Issue</button></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                            : null}
                        <div className='text-danger text-center'>{this.state.errorMessage}</div>
                        <div className='text-success text-center'>{this.state.successMessage}</div>
                    </div>
                </div>
            </div>
        </div>
    }

}

export default GenreBooks;