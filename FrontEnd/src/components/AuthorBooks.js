import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
const url = "http://localhost:4000/";

class AuthorBooks extends Component {

    state = { books: null, authorData: null, successMessage: "", errorMessage: '' }

    componentDidMount() {
        this.getBooksByAuthor();
    }

    getBooksByAuthor() {
        axios.get(url + 'booksbyauthor/' + this.props?.authorName).then(response => {
            this.setState({ authorData: response.data })
        }).catch(err => {
            this.setState({ errorMessage: (err.response?.data?.message || err.message), successMessage: "" })
        })
    }

    handleIssueBook = (bookId) => {
        let finalUrl = url + `issueBooks/${bookId}/user/${this.props.userId}`;
        axios.put(finalUrl).then(res => {
            this.setState({ successMessage: res.data.message, errorMessage: "" })
            this.getBooksByAuthor();
        }).catch(err => {
            this.setState({ errorMessage: (err.response?.data?.message || err.message), successMessage: "" })
        })
    }

    render() {
        const authorData = this.state.authorData;
        return <div className="row container-fluid">
            <div className="col-md-8 offset-md-2"><br />
                <div className="card" id='card-colour'>
                    <div className="card-header bg-custom" id='header-colour'>
                        {authorData &&
                            <>
                                <div className="author-name" style={{ display: 'flex' }}>
                                    <h5>{authorData?.authorName}</h5>&nbsp;&nbsp;<span>({authorData?.dob})</span>
                                </div>
                                <small className="max-lines-2"><u>{authorData?.subjects}</u></small>
                            </>
                        }
                    </div>

                    <div className="card-body" >
                        {this.state.authorData?.books?.length > 0 ? <div className="allbooks-table">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Book name</th>
                                        <th>Genre</th>
                                        <th>Published Year</th>
                                        <th>Availability</th>
                                        <th>Issue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.authorData?.books?.map((book, index) => <tr key={index}>
                                        <td>{book.bookName}</td>
                                        <td><Link to={`/genre/${book.genre}`}>{book.genre}</Link></td>
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

export default AuthorBooks;