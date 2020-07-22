import React, { Component } from 'react';
import { tokenKey } from '../services/auth';
import { logoutUser } from '../actions/authedUser';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faCaretDown,
  faSignOutAlt,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import DashboardRouting from '../router/dashboardRoutes';

const SubMenu = Menu.SubMenu;

class Dashboard extends Component {
  state = {
    showSideBar: false,
    activeRoute: 'dashboard',
  };

  handleLogoutUser = () => {
    localStorage.removeItem(tokenKey);
    this.props.dispatch(logoutUser());
    this.props.history.push('/');
  };

  render() {
    const { showSideBar, showQuotationChildren } = this.state;
    const { authedUser } = this.props;

    return (
      <div className="grid-container">
        <div className="top-nav-container-responsive">
          <div
            className="menu-icon pt-4"
            onClick={() => this.setState({ showSideBar: true })}
          >
            <FontAwesomeIcon icon={faBars} size="2x" color="#3CC6BC" />
          </div>

          <header className="header header-responsive">
            <div className="header__element br-right pr-3">
              <FontAwesomeIcon icon={faBell} size="2x" color="#42495b" />
            </div>
            <div className="header__element">
              <Menu mode="horizontal" className="home-menu">
                <SubMenu
                  title={
                    <>
                      <span className="override-menu-dashboard mr-2">
                        {authedUser.name}
                      </span>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        size="1x"
                        color="#42495b"
                      />
                    </>
                  }
                  className="main-color override-menu-item-dashboard"
                >
                  {/* <Menu.Item key='setting:1'>
                    <NavLink
                      className='no-anchor-decoration main-color override-menu'
                      to='/dashboard'
                    >
                      Profile
                    </NavLink>
                  </Menu.Item> */}
                  <Menu.Item key="setting:2">
                    <button
                      className="no-anchor-decoration main-color override-menu logout-btn"
                      onClick={this.handleLogoutUser}
                    >
                      Logout
                    </button>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </header>
        </div>

        <aside className={`sidenav ${showSideBar && `active`}`}>
          <div
            className="sidenav__close-icon"
            onClick={() => this.setState({ showSideBar: false })}
          >
            <FontAwesomeIcon icon={faTimes} size="sm" color="#3CC6BC" />
          </div>
          <div className="sidenav-container">
            <div className="dashboard-logo-container pl-4">
              <img
                src={require('../assets/logo.png')}
                className="dashboard-logo show-cursor mb-5"
                alt="Murugo App"
                onClick={() => this.props.history.push('/')}
              />
            </div>
            <ul className="sidenav__list">{/* TODO: Menu Here */}</ul>
            <div className="dashboard-logout-container br-top pt-4">
              <div
                className="sidebar-content show-cursor"
                onClick={this.handleLogoutUser}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  size="2x"
                  color="#42495b"
                  className="sidebar-content-icon"
                />
                <span className="h6 ml-3">Logout</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="main">
          <DashboardRouting />
        </main>

        <footer className="footer">
          <div className="footer__signature">
            <span className="h6 secondary-color">
              COPYRIGHT MURUGO APP {new Date().getFullYear()}{' '}
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
