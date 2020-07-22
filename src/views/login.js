import React, { Component } from 'react';
import TextBox from '../components/textbox';
import { Button, Alert } from 'antd';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { handleUserLogin } from '../actions/authedUser';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
    loading: false,
  };

  handleEmail = (e) => {
    const { errors } = this.state;
    errors.email = '';
    this.setState({ errors, email: e.target.value });
  };

  handlePassword = (e) => {
    const { errors } = this.state;
    errors.password = '';
    this.setState({ errors, password: e.target.value });
  };

  handleFormSubmit = () => {
    const { data, response } = this.checkValidation();
    if (response) {
      this.setState({ loading: true, errorMessage: '' });
      this.props.dispatch(handleUserLogin(data)).then((res) => {
        this.setState({ loading: false });
        if (res.type !== 'LOG_ERROR') {
          return (window.location.href = this.props.link || '/dashboard');
        } else {
          this.setState({ errorMessage: res.error });
        }
      });
    }
  };

  checkValidation = () => {
    const { email, password, errors } = this.state;
    let response = true;
    let data = {};

    data.email = email;
    data.password = password;

    if (!email) {
      errors.email = 'Required';
      response = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
      response = false;
    }

    if (!password) {
      errors.password = 'Required';
      response = false;
    } else if (password.length < 6) {
      errors.password = 'Minimum be 6 characters or more';
      response = false;
    }

    this.setState({ errors });
    return { data, response };
  };

  render() {
    const { email, password, errors, loading, errorMessage } = this.state;
    const { isAuth } = this.props;

    if (isAuth) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="wrapper">
        <div className="container">
          <div className="login-container">
            <div
              className={`custom-card p-5 ${
                window.screen.width > 600 ? 'w-50' : 'w-100'
              }`}
            >
              <div className="container">
                <div className="row mb-3 justify-content-center flex-column align-items-center">
                  <div>
                    <img
                      src={require('../assets/logo.png')}
                      alt="Murugo App"
                      className="login-logo"
                    />
                  </div>
                  <div className="modal-header-info">
                    <div>
                      <span className="header-title">Login</span>
                    </div>
                  </div>
                </div>
                <div className="row txt-box-container">
                  {errorMessage && (
                    <div className="error-message-main-container mb-5">
                      <div className="error-message-container">
                        <Alert
                          message="Error"
                          description={errorMessage}
                          type="error"
                          showIcon
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Email</span>
                  </div>
                  <div>
                    <TextBox
                      name="email"
                      error={errors.email}
                      onChange={(e) => this.handleEmail(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container mb-5">
                  <div>
                    <span className="input-label">Password</span>
                  </div>
                  <div>
                    <TextBox
                      name="password"
                      error={errors.password}
                      onChange={(e) => this.handlePassword(e)}
                      type="password"
                    />
                  </div>
                </div>
                <div className="row submit-btn-container justify-content-center">
                  <div>
                    <Button
                      type="primary"
                      className="custom-btn"
                      onClick={() => this.handleFormSubmit()}
                    >
                      {loading ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          size="sm"
                          color="#fff"
                          className="ml-2"
                        />
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, link }) => {
  return {
    isAuth: Object.keys(authedUser).length !== 0,
    link,
  };
};

export default connect(mapStateToProps)(Login);
