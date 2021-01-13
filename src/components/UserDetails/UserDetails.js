// Modules
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
// Components
import {
    Avatar,
    Box,
    Container,
    withStyles
} from '@material-ui/core';
// Actions
import { toggleBackArrow } from '../../store/actions/ui';


const styles = theme => ({
    MuiAvatarRoot: {
        height: 200,
        width: 200,
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
            height: 100,
            width: 100,
        },
    },
    MuiBoxRoot: {
        marginLeft: 15,
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginLeft: 0,
        },
    },
    MuiContainerRoot: {
        margin: '50px auto 0',
        width: 550,
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            margin: 'auto 10px',
            width: '100%',
            flexDirection: 'column',
            marginTop: '50px'
        },
    },
});

const UserDetails = props => {
    const dispatch = useDispatch();
    const showBackArrow = useSelector(state => state.ui.showBackArrow);
    const history = useHistory();

    useEffect(() => {
        const {
            match: {
                params: {
                    id
                } = {}
            } = {}
        } = props;

        if( !showBackArrow && id ) {
            toggleBackArrow(dispatch);
        }
    })

    const {
        match: {
            params: {
                id
            } = {}
        } = {},
        classes,
    } = props;
    const usersList = useSelector(state => state.users.usersList);
    const currentUser = usersList.find( user => {
    return user.login.uuid === id
    }) || {};

    useEffect(() => {
        if(!Object.keys(currentUser).length) {
            history.push('/');
        }
    })

    const {
        dob: { date } = {},
        email,
        gender,
        location: { country, street: { name, number } = {}, city, state } = {},
        name: { first, last } = {},
        phone,
        picture: { large } = {},
    } = currentUser;

    const newDateFormat = moment(date).format('DD.MMM.YYYY');

    return (
        <Container classes={{ root: classes.MuiContainerRoot }}>
            <Avatar
                classes={{
                  root: classes.MuiAvatarRoot
                }}
                src={large}
                alt={`${first} ${last}`}
            />
            <Box
                classes={{
                  root: classes.MuiBoxRoot
                }}
            >
                <h4>{first} {last}</h4>
                <div>Date of birth: {newDateFormat}</div>
                <div>Gender: {gender}</div>
                <h4>Location:</h4>
                <div>Street: {name} {number}</div>
                <div>City: {city}</div>
                <div>State: {state}</div>
                <div>Country: {country}</div>
                <div>Email: {email}</div>
                <div>Phone: {phone}</div>
            </Box>
        </Container>
    );
}

export default withStyles(styles)(UserDetails);
