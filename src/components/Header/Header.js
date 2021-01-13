//Modules
import React  from 'react';
import { useSelector } from 'react-redux';
// Components
import {
  Link
} from 'react-router-dom';
import { AppBar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    MuiAppBarRoot: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: '30px',
        paddingLeft: '15px',
    },
});


const Header = () => {
    const showBackArrow = useSelector(state => state.ui.showBackArrow);
    const classes = useStyles();

    return (
        <AppBar classes={{ root: classes.MuiAppBarRoot }}>
            {
                showBackArrow &&
                <Link to={'/'}>
                    <button>Back</button>
                </Link>
            }
        </AppBar>
    );
}

export default Header;
