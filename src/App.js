import React, { Component } from 'react';
import Routing from './router';
import { connect } from 'react-redux';
import { decodeToken, tokenKey } from './services/auth';
import { setAuthedUser } from './actions/authedUser';
// import { handleInitialData } from './actions/initialData';

class App extends Component {
  // componentDidMount() {
  //   this.props.dispatch(handleInitialData());
  // }
  render() {
    refreshUser(this.props);
    const { loading } = this.props;
    return !loading && <Routing />;
  }
}

const mapStateToProps = ({ loading }) => {
  return {
    loading,
  };
};

export default connect(mapStateToProps)(App);

const refreshUser = (props) => {
  const user = decodeToken();

  if (user) {
    const currentTime = Date.now() / 1000;
    if (user.exp < currentTime) {
      localStorage.removeItem(tokenKey);
      props.history.push('/');
    }
    props.dispatch(setAuthedUser(user));
    return user;
  }
};
