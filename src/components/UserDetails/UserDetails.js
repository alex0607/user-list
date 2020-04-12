// Modules
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Components
import { Avatar } from '@material-ui/core';
// Actions
import { toggleBackArrow } from '../../store/actions/ui';


const AvatarStyle = styled.div`
  display: flex;
  align-items: center;
`;

const UserDetailsStyle = styled.div`
  margin: 50px auto 0;
  width: 600px;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

class UserDetails extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: {
          id
        } = {}
      } = {},
      showBackArrow,
      toggleBackArrow
    } = this.props;

    if( !showBackArrow && id ) {
      toggleBackArrow();
    }
  }

  render() {
  const {
    usersList,
    match: {
      params: {
        id
      } = {}
    } = {}
  } = this.props;
  const currentUser = usersList.find( user => {
     return user.login.uuid === id
  }) || {};
  const {
    dob: { date } = {},
    email,
    gender,
    location: { country, street: { name, number } = {}, city, state } = {},
    name: { first, last } = {},
    phone,
    picture: { large } = {},
  } = currentUser;

  return (
    <UserDetailsStyle>
      <AvatarStyle>
        <Avatar
          style={{
            width: '200px',
            height: '200px'
          }}
          src={large}
          alt={`${first} ${last}`}
        />
      </AvatarStyle>
    <div>
      <h4>{first} {last}</h4>
      <p>Date of birth:{date}</p>
      <p>Gender:{gender}</p>
      <h4>Location:</h4>
      <p>Street: {name} {number}</p>
      <p>City: {city}</p>
      <p>State: {state}</p>
      <p>Country: {country}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
    </UserDetailsStyle>
  )
  }
}

const mapStateToProps = state => {
  return {
    showBackArrow: state.ui.showBackArrow,
    usersList: state.users.usersList
  };
};

const mapDispatchToProps = {
  toggleBackArrow
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
