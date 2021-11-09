import React from 'react';
import logo from '../assets/syft.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';



class TopBar extends React.Component {

  state = {
    dropDownVisible: false
  };

  componentDidMount() {
    document.addEventListener('click', this.onClickTracker);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickTracker);
  }

  onClickTracker = (event) => {
    if (this.actionArea && !this.actionArea.contains(event.target)) {
      this.setState({
        dropDownVisible: false
      });
    }
  };

  onClickUsername = () => {
    this.setState({
      dropDownVisible: true
    });
  };

  onClickLogout = () => {
    this.setState({
      dropDownVisible: false
    });
    const action = {
      type: 'logout-success'
    };
    this.props.dispatch(action);
    
  };

  onClickMyProfile = () => {
    this.setState({
      dropDownVisible: false
    });
  };

  onClickHome = () => {
    this.setState({
      dropDownVisible: false
    });
  };

  onClickMember = () => {
    this.setState({
      dropDownVisible: false
    });
  };

  onClickCourses = () => {
    this.setState({
      dropDownVisible: false
    });
  };

  onClickCourseSignup = () => {
    this.setState({
      dropDownVisible: false
    });
  };

  assignActionArea = (area) => {
    this.actionArea = area;
  };

  render() {

   let links = (
    <nav className="nav navbar-nav me-auto">
      <ul className="nav navbar-nav me-auto">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
   );

   
   if(this.props.user.role === "ADMIN") {
    let dropDownClass = 'p-0 shadow dropdown-menu';
    if (this.state.dropDownVisible) {
      dropDownClass += ' show';
    }
     links = (
      <ul className="nav navbar-nav ml-auto" ref={this.assignActionArea}>
        <li className="nav-item dropdown">
        <div
              className="d-flex"
              style={{ cursor: 'pointer' }}
              onClick={this.onClickUsername}
            >
              <ProfileImageWithDefault
                className="rounded-circle m-auto"
                width="32"
                height="32"
                image={this.props.user.image}
              />
              <span className="nav-link dropdown-toggle">
                {this.props.user.username}
              </span>
            </div>
            <div className={dropDownClass} data-testid="drop-down-menu">
              <Link
                to={`/member/${this.props.user.username}`}
                className="dropdown-item"
                onClick={this.onClickMyProfile}
              >
                <i className="fas fa-user text-info"></i> My Profile
              </Link>
              <Link
                to={`/members`}
                className="dropdown-item"
                onClick={this.onClickMember}
              >
                <i className="fas fa-users text-info"></i> Members
              </Link>
              <Link
                to={`/signup`}
                className="dropdown-item"
                onClick={this.onClickMember}
              >
                <i className="fas fa-users text-info"></i> Add Member
              </Link>
              <Link
                to={`/events`}
                className="dropdown-item"
                onClick={this.onClickMember}
              >
                <i className="fas fa-calendar text-info"></i> Events
              </Link>
              <Link
                to={`/eventSignup`}
                className="dropdown-item"
                onClick={this.onClickMember}
              >
                <i className="fas fa-calendar text-info"></i> Add Event
              </Link>
              <Link
                to={`/courses`}
                className="dropdown-item"
                onClick={this.onClickCourses}
              >
                <i className="fas fa-globe-europe text-info"></i> Courses
              </Link>
              <Link
                to={`/courseSignup`}
                className="dropdown-item"
                onClick={this.onClickCourseSignup}
              >
                <i className="fas fa-file-alt text-info"></i> Add course
              </Link>
              <span
                className="dropdown-item"
                onClick={this.onClickLogout}
                style={{
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-sign-out-alt text-danger"></i> Logout
              </span>
            </div>
        </li>
      </ul>
     );
   }

   if(this.props.user.role === "HANDICAPADMIN") {
    let dropDownClass = 'p-0 shadow dropdown-menu';
    if (this.state.dropDownVisible) {
      dropDownClass += ' show';
    }
     links = (
      <ul className="nav navbar-nav ml-auto" ref={this.assignActionArea}>
        <li className="nav-item dropdown">
        <div
              className="d-flex"
              style={{ cursor: 'pointer' }}
              onClick={this.onClickUsername}
            >
              <ProfileImageWithDefault
                className="rounded-circle m-auto"
                width="32"
                height="32"
                image={this.props.user.image}
              />
              <span className="nav-link dropdown-toggle">
                {this.props.user.username}
              </span>
            </div>
            <div className={dropDownClass} data-testid="drop-down-menu">
              <Link
                to={`/member/${this.props.user.username}`}
                className="dropdown-item"
                onClick={this.onClickMyProfile}
              >
                <i className="fas fa-user text-info"></i> My Profile
              </Link>
              <Link
                to={`/members`}
                className="dropdown-item"
                onClick={this.onClickMember}
              >
                <i className="fas fa-users text-info"></i> Members
              </Link>
              <Link
                to={`/courses`}
                className="dropdown-item"
                onClick={this.onClickCourses}
              >
                <i className="fas fa-globe-europe text-info"></i> Courses
              </Link>
              <span
                className="dropdown-item"
                onClick={this.onClickLogout}
                style={{
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-sign-out-alt text-danger"></i> Logout
              </span>
            </div>
        </li>
      </ul>
     );
   }

   if(this.props.user.role === "EVENTADMIN") {
    let dropDownClass = 'p-0 shadow dropdown-menu';
    if (this.state.dropDownVisible) {
      dropDownClass += ' show';
    }
     links = (
      <ul className="nav navbar-nav ml-auto" ref={this.assignActionArea}>
        <li className="nav-item dropdown">
        <div
              className="d-flex"
              style={{ cursor: 'pointer' }}
              onClick={this.onClickUsername}
            >
              <ProfileImageWithDefault
                className="rounded-circle m-auto"
                width="32"
                height="32"
                image={this.props.user.image}
              />
              <span className="nav-link dropdown-toggle">
                {this.props.user.username}
              </span>
            </div>
            <div className={dropDownClass} data-testid="drop-down-menu">
              <Link
                to={`/member/${this.props.user.username}`}
                className="dropdown-item"
                onClick={this.onClickMyProfile}
              >
                <i className="fas fa-user text-info"></i> My Profile
              </Link>
              <Link
                to={`/members`}
                className="dropdown-item"
                onClick={this.onClickMember}
              >
                <i className="fas fa-users text-info"></i> Members
              </Link>
              <Link
                to={`/events`}
                className="dropdown-item"
                onClick={this.onClickMember}
              >
                <i className="fas fa-calendar text-info"></i> Events
              </Link>
              <Link
                to={`/eventSignup`}
                className="dropdown-item"
                onClick={this.onClickMember}
              >
                <i className="fas fa-calendar text-info"></i> Add Event
              </Link>
              <Link
                to={`/courses`}
                className="dropdown-item"
                onClick={this.onClickCourses}
              >
                <i className="fas fa-globe-europe text-info"></i> Courses
              </Link>
              <Link
                to={`/courseSignup`}
                className="dropdown-item"
                onClick={this.onClickCourseSignup}
              >
                <i className="fas fa-file-alt text-info"></i> Add course
              </Link>
              <span
                className="dropdown-item"
                onClick={this.onClickLogout}
                style={{
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-sign-out-alt text-danger"></i> Logout
              </span>
            </div>
        </li>
      </ul>
     );
   }

   if(this.props.user.role === "USER") {
    let dropDownClass = 'p-0 shadow dropdown-menu';
    if (this.state.dropDownVisible) {
      dropDownClass += ' show';
    }
     links = (
      <ul className="nav navbar-nav ml-auto" ref={this.assignActionArea}>
        <li className="nav-item dropdown">
        <div
              className="d-flex"
              style={{ cursor: 'pointer' }}
              onClick={this.onClickUsername}
            >
              <ProfileImageWithDefault
                className="rounded-circle m-auto"
                width="32"
                height="32"
                image={this.props.user.image}
              />
              <span className="nav-link dropdown-toggle">
                {this.props.user.username}
              </span>
            </div>
            <div className={dropDownClass} data-testid="drop-down-menu">
              <Link
                to={`/member${this.props.user.username}`}
                className="dropdown-item"
                onClick={this.onClickMyProfile}
              >
                <i className="fas fa-user text-info"></i> My Profile
              </Link>
              <Link
                to={`/members`}
                className="dropdown-item"
                onClick={this.onClickMember}
              >
                <i className="fas fa-users text-info"></i> Members
              </Link>
              <Link
                to={`/courses`}
                className="dropdown-item"
                onClick={this.onClickCourses}
              >
                <i className="fas fa-globe-europe text-info"></i> Courses
              </Link>
              <Link
                to={`/events`}
                className="dropdown-item"
                onClick={this.onClickCourses}
              >
                <i className="fas fa-calendar text-info"></i> Events
              </Link>
              <span
                className="dropdown-item"
                onClick={this.onClickLogout}
                style={{
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-sign-out-alt text-danger"></i> Logout
              </span>
            </div>
        </li>
      </ul>
     );
   }
    return (
      <div className="bg-white shadow-sm mb-2">
        <div className="container">
          <nav className="navbar navbar-light navbar-expand">
            <Link to="/" className="navbar-brand">
              <img src={logo} width="60" alt="Syftgolf" /> SYFT Golf
            </Link>
            {links}
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state
  };
};

export default connect(mapStateToProps)(TopBar);