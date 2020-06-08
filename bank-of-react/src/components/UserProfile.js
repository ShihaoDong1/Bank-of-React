// src/components/UserProfile.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class UserProfile extends Component {
  render() {
    return (
        <div>
          <h1>User Profile</h1>
          <Link to="/">Home</Link>
            <br></br>
          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.props.memberSince}</div>
          
        </div>
    );
  }
}

export default UserProfile;