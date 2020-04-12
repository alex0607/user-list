//Modules
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
//Components
import {
  Avatar,
  Card,
  CircularProgress,
  TextField
} from '@material-ui/core';
import {
  Link
} from 'react-router-dom';
//Actions
import { toggleBackArrow } from '../../store/actions/ui';
import { changeFilterValue, getUsers } from '../../store/actions/users';


const CardStyle = styled.div`
  height: 200px;
  margin: 15px 0;
  width: 600px;
  cursor: 'pointer';
`;

const CardContent = styled.div`
  padding: 10px;
`;

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  min-height: 100vh;
  width: 100vw;
`;

const Loader = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;


class UsersList extends PureComponent {
  static propTypes = {
    changeFilterValue: PropTypes.func.isRequired,
    filter: PropTypes.string,
    getUsers: PropTypes.func.isRequired,
    usersList: PropTypes.array.isRequired
  };

  componentDidMount() {
    const {
      getUsers,
      match: {
        params: {
          id
        } = {}
      } = {},
      showBackArrow,
      toggleBackArrow,
      usersList
    } = this.props;

    if( !usersList.length ) {
      getUsers();
    }

    if( showBackArrow && !id ) {
      toggleBackArrow();
    }
  }

  handleChangeInput = ({ target: { value } }) => {
    const { changeFilterValue } = this.props;

    changeFilterValue(value);
  };

  renderUser = (user) => {
    const {
      login: { uuid } = {},
      name: { first, last } = {},
      picture: { thumbnail } = {}
    } = user;
    return (
        <Link
            key={uuid}
            to={`/user/${uuid}`}
            style={{ textDecoration: 'none' }}
        >
          <CardStyle>
            <Card>
              <CardContent>
                <Avatar src={thumbnail} alt={`${first} ${last}`} />
                <p>Name:{first}</p>
                <p>Surname:{last}</p>
                <p>id:{uuid}</p>
              </CardContent>
            </Card>
          </CardStyle>
        </Link>
    )
  };

  render() {
    const { filter, usersList } = this.props;
    if( !usersList.length ) {
      return (
        <Loader>
          <CircularProgress/>
        </Loader>
      );
    }
    const filteredUsers = usersList.filter( user => (
      user.name.first.startsWith(filter) ||
      user.name.last.startsWith(filter)
    ) );

    return (
      <Main>
        <TextField
          label="Enter text..."
          onChange={this.handleChangeInput}
          value={filter}
        />
        {filteredUsers.map(this.renderUser)}
      </Main>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.users.filter,
    showBackArrow: state.ui.showBackArrow,
    usersList: state.users.usersList
  };
};

const mapDispatchToProps = {
  changeFilterValue,
  getUsers,
  toggleBackArrow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
