import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = "http://localhost:4000/";

class Books extends Component {
    constructor(props) {
        super(props);
        this.obj = {
            data: [],
            successMessage: "",
            errorMessage: ""
        }
        this.state = {
            issuedBooks: { ...this.obj },
            allBooks: { ...this.obj },
        };
    }

    componentDidMount() {
        this.fetchAllBooks();
        this.fetchIssuedBooks()
    }

    fetchIssuedBooks = () => {
        if (!this.props.userId) return ''
        axios.get(url + `issuedBooks/${this.props.userId}`).then(response => {
            let issuedBooks = this.state.issuedBooks;
            issuedBooks.data = response.data;
            issuedBooks.errorMessage = ""
            this.setState({})
        }).catch(error => {
            if (error.response) this.setState({ issuedBooks: { data: [], errorMessage: error.response.data.message, successMessage: "" } });
            else this.setState({ issuedBooks: { data: [], errorMessage: error.message, successMessage: "" } })
        }
        )
    }

    fetchAllBooks = () => {
        axios.get(url + `allBooks`).then(response => {
            let allBooks = this.state.allBooks;
            allBooks.data = response.data;
            this.setState({})
        }).catch(error => {
            if (error.response) this.setState({ allBooks: { data: [], errorMessage: error.response.data.message, successMessage: "" } });
            else this.setState({ allBooks: { data: [], errorMessage: error.message, successMessage: "" } })
        }
        )
    }

    handleIssueBook = (bookId) => {
        let finalUrl = url + `issueBooks/${bookId}/user/${this.props.userId}`;
        axios.put(finalUrl).then(res => {
            this.setState({ allBooks: { successMessage: res.data.message, errorMessage: "", data: this.state.allBooks.data } })
            this.fetchAllBooks();
            this.fetchIssuedBooks();
        }).catch(error => {
            if (error.response) this.setState({ allBooks: { errorMessage: error.response.data.message, successMessage: "", data: this.state.allBooks.data } });
            else this.setState({ allBooks: { errorMessage: error.message, successMessage: "", data: this.state.allBooks.data } })
        })
    }

    handleReturnBook = (bookId) => {
        let finalUrl = url + `returnBooks/${bookId}/user/${this.props.userId}`;
        axios.put(finalUrl).then(res => {
            this.setState({ issuedBooks: { successMessage: res.data.message, errorMessage: "", data: this.state.issuedBooks.data } })
            this.fetchAllBooks();
            this.fetchIssuedBooks();
        }).catch(error => {
            if (error.response) this.setState({ issuedBooks: { errorMessage: error.response.data.message, successMessage: "", data: this.state.issuedBooks.data } });
            else this.setState({ issuedBooks: { errorMessage: error.message, successMessage: "", data: this.state.issuedBooks.data } })
        })
    }

    AllBooksComponent = () => {
        return <React.Fragment>
            {this.state.allBooks.data.length > 0 ? <div className="allbooks-table"><table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th>Author Name</th>
                        <th>Book name</th>
                        <th>Genre</th>
                        <th>Published Year</th>
                        <th>Availability</th>
                        <th>Issue</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.allBooks.data.map((book, index) => <tr key={index}>
                        <td><Link to={`/author/${book.authorName}`}>{book.authorName}</Link></td>
                        <td>{book.bookName}</td>
                        <td><Link to={`/genre/${book.genre}`}>{book.genre}</Link></td>
                        <td>{book.publishedDate}</td>
                        <td>{book.availability > 0 ? book.availability : <span className='text-danger uk-text-bold'>Out of stock</span>}</td>
                        <td><button type="button" id="btn" disabled={book.availability === 0} onClick={() => this.handleIssueBook(book.bookId)} className="btn">Issue</button></td>
                    </tr>)}
                </tbody>
            </table>
            </div>
                : null}
            <div className='text-danger text-center'>{this.state.allBooks.errorMessage}</div>
            <div className='text-success text-center'>{this.state.allBooks.successMessage}</div>
        </React.Fragment>
    }

    IssuedBooksComponent = () => {
        return <React.Fragment>
            {this.state.issuedBooks.data.length > 0 ? <div className="issusedbooks-table"><table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th>Author Name</th>
                        <th>Book Name</th>
                        <th>Genre</th>
                        <th>Published Year</th>
                        <th>Return</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.issuedBooks.data.map((book, index) => <tr key={index}>
                        <td><Link to={`/author/${book.authorName}`}>{book.authorName}</Link></td>
                        <td>{book.bookName}</td>
                        <td><Link to={`/genre/${book.genre}`}>{book.genre}</Link></td>
                        <td>{book.publishedDate}</td>
                        <td><button type="button" id="btn" onClick={() => this.handleReturnBook(book.bookId)} className="btn">Return</button></td>
                    </tr>)}
                </tbody>
            </table></div> : null}
            <div className='text-danger text-center'>{this.state.issuedBooks.errorMessage}</div>
            <div className='text-success text-center'>{this.state.issuedBooks.successMessage}</div>
        </React.Fragment>
    }

    render() {
        return (
            <React.Fragment>
                <div className="row container-fluid">
                    <div className="col-md-8 offset-md-2"><br />
                        <div className="card" id='card-colour'>
                            <div className="card-header bg-custom" id='header-colour'>
                                {/* Nav Tabs */}
                                <ul className="nav nav-tabs  " role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="navLinks" data-toggle="tab" href="#allBooks">View All Books</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="navLinks" data-toggle="tab" href="#issuedBooks">Issued Books</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="card-body" >
                                {/* Tab panes */}
                                <div className="tab-content">
                                    <div id="allBooks" className="container tab-pane active"><br />
                                        {this.AllBooksComponent()}
                                    </div>
                                    <div id="issuedBooks" className="container tab-pane fade"><br />
                                        {this.IssuedBooksComponent()}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Books;