//Modules
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Components
import {
    Avatar,
    Box,
    Card,
    CircularProgress,
    Container,
    TextField,
    withStyles
} from '@material-ui/core';
import {
    Link
} from 'react-router-dom';
//Actions
import { toggleBackArrow } from '../../store/actions/ui';
import { changeFilterValue, getUsers } from '../../store/actions/users';


const styles = theme => ({
  MuiCardRoot: {
      margin: '15px 0',
      width: 500,
      cursor: 'pointer',
      padding: 20,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'flex-start',
      [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'fit-content',
          margin: 15,
      },
  },
  MuiAvatarRoot: {
      margin: '0 20px 20px',
  },
  LoaderBlock: {
      alignItems: 'center',
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      width: '100%',
  },
  Container: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: '50px',
      minHeight: '100vh',
      width: '100%',
  }
});

const Users = props => {
    const dispatch = useDispatch();
    const showBackArrow = useSelector(state => state.ui.showBackArrow);
    const usersList = useSelector(state => state.users.usersList);
    const { classes } = props;

    useEffect(() => {
        const {
            match: {
                params: {
                    id
                } = {}
            } = {},
        } = props;

        if( !usersList.length ) {
            getUsers(dispatch);
        }

        if( showBackArrow && !id ) {
            toggleBackArrow(dispatch);
        }
    });

    const handleChangeInput = ({ target: { value } }) => {
        changeFilterValue(value)(dispatch);
    };

    const renderUser = (user) => {
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
            <Card classes={{ root: classes.MuiCardRoot }}>
                <Avatar
                    classes={{
                      root: classes.MuiAvatarRoot
                    }}
                    src={thumbnail}
                    alt={`${first} ${last}`}
                />
                <Box>
                    <div>Name:{first}</div>
                    <div>Surname:{last}</div>
                    <div>id:{uuid}</div>
                </Box>
            </Card>
        </Link>
    )
    };

    const filter = useSelector(state => state.users.filter);

    if( !usersList.length ) {
        return (
            <div className={classes.LoaderBlock}>
                <CircularProgress/>
            </div>
        );
    }
    const filteredUsers = usersList.filter( user => (
        user.name.first.toLowerCase().startsWith(filter.toLowerCase()) ||
        user.name.last.toLowerCase().startsWith(filter.toLowerCase())
    ) );

    return (
        <Container classes={{ root: classes.Container }}>
            <TextField
                label="Enter text..."
                onChange={handleChangeInput}
                value={filter}
            />
            {filteredUsers.map(renderUser)}
        </Container>
    );
}

export default withStyles(styles)(Users);
