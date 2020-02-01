import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userLoggin } from '../actions/actionCreator';
import Dashboard from './Dashboard';
import { inputData } from '../data/userData'

class Login extends Component {
    state = {
        username: '',
        password: '',
        passwordMessage: '',
    }

    handleChange = (value, key) => {
        this.setState({
            [key]: value,
            passwordMessage: '',
            userMessage: '',
        })
    } 

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = this.state;
        const credentials = {
            username,
            password
        }
        var isValid = true;

        if(!username || username === '') {
            this.setState({
                userMessage: 'Please enter your username'
            })
            isValid = false
        } 
        if(!password || password === '') {
            this.setState({
                passwordMessage: 'Please enter your password'
            })
            isValid = false
        }
        if(isValid) {
            this.props.dispatch(userLoggin(credentials));
        }
        
    }

    render() {
        const  {inputValue} = inputData;
        const { 
                state:{passwordMessage, userMessage, password, username },
                props:{isLoggedIn, errorMsg},
                handleChange, handleSubmit
            } = this;

        return (
            isLoggedIn ? <Dashboard />
            : <div>
                <form onSubmit={handleSubmit} className="form-container">
                    {inputValue && 
                        inputValue.map((value, i) => {
                            const {type, name, placeholder} = value,
                            isFileType = !!(type === 'password');

                            return <div key={i}>
                                <input type={type} value={isFileType ? password : username} onChange={(e) => handleChange(e.target.value, name)} placeholder={placeholder} />
                                {!isFileType ? 
                                    <p className="username-error-msg">{userMessage}</p> 
                                    : <p className="password-error-msg">{passwordMessage}</p>
                                }
                            </div>
                        })
                        
                    }
                    <p className="error-msg">{errorMsg}</p>
                    <button className="submit" type="submit" onClick={this.handleValidation}>Submit</button>
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        errorMsg: state.errorMsg
    }
}

export default connect(mapStateToProps)(Login);