import React, { Component } from "react";
import axios from "axios";
// import {  Redirect } from "react-router-dom";

const url = "http://localhost:4000/";

class Login extends Component {
  constructor(props) {
    super(props);
    this.obj = {
      email: '',
      password: ''
    }
    this.state = {
      formValue: { ...this.obj, email: 'sidmay10@gmail.com', password:"Sidmay10" },
      formErrorMessage: { ...this.obj },
      formValid: {
        email: false,
        password: false,
        buttonActive: true
      },
      redirectStatus: false,
      userId : "",
      errorMessage: ""
    };
  }

  login = () => {
    const { formValue } = this.state;
    axios
      .post(url + 'login', formValue)
      .then(response => {
        this.props.setloggedInStatus(response.data.userId, response.data);
        // this.setState({ redirectStatus: true, userId: response.data.userId})
      }).catch(error => {
        if (error.response) this.setState({ errorMessage: error.response.data.message });
        else this.setState({ errorMessage: error.message })
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.login();
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const formValue = this.state.formValue;
    formValue[name] = event.target.value
    this.validateField(name, value);
  }

  validateField = (fieldName, value) => {
    let formErrorMessage = this.state.formErrorMessage;
    let formValid = this.state.formValid;
    let message;
    switch (fieldName) {
      case 'email':
        value === "" ? message = 'Email is mandatory' : new RegExp(/^[A-z][\w]*@[A-z]+\.(com|in)$/).test(value) ? message = '' : message = `Should be of the format alex_123@gmail.com or S@hello.in`
        break;

      case 'password':
        value === "" ? message = 'Password is mandatory' : new RegExp(/^[A-z][\w\W]{7,}$/).test(value) ? message = '' : message = `Should contain minimum of 8 characters starting with alphabet`
        break;

      default:
        break;
    }
    formErrorMessage[fieldName] = message;
    formValid[fieldName] = message ? false : true;
    formValid.buttonActive = formValid.email && formValid.password;
    this.setState({})
  }

  render() {
    const errorMsg = this.state.formErrorMessage
    return (
      <React.Fragment>
        <div className="CreateBooking ">
          <div className="container-fluid row">
            <div className="col-md-4 offset-md-4"><br />
              <div className="card">
                <div className="card-header bg-custom" id='header-colour'>
                  <h4>Login</h4>
                </div>

                {/* {this.state.redirectStatus ? <Redirect to={'/viewAllBooks/' + this.state.userId} /> : null} */}

                <div className="card-body" id="card-colour">
                  <form onSubmit={this.handleSubmit}>

                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor='email'>Email id</label>
                      <input type="email" placeholder="Enter your email" name="email" id='email'
                        onChange={this.handleChange} className="form-control" required  value={this.state.formValue.email}/>
                      {errorMsg.email && <span name="emailError" className="text-danger">{errorMsg.email}</span>}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                      <label htmlFor='password'>Password</label>
                      <input type="password" placeholder="Enter your password" name="password" id='password'
                        onChange={this.handleChange} className="form-control" required value={this.state.formValue.password} />
                      {errorMsg.password && <span name="emailError" className="text-danger">{errorMsg.password}</span>}
                    </div>

                    {/* Login Button */}
                    <button type="submit" className="btn" id='btn'
                      disabled={!this.state.formValid.buttonActive}>Login</button>
                  </form>
                  {/* Messages */}
                  <div className='text-center text-danger'>
                    {this.state.errorMessage}
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

export default Login;
