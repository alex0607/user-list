//Modules
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// Components
import {
  Link
} from 'react-router-dom';
import { AppBar } from '@material-ui/core';


class Header extends PureComponent {
  render() {
    const { showBackArrow } = this.props;
    return (
      <AppBar style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: '30px',
        paddingLeft: '15px'
      }} >
        {showBackArrow &&
        <Link to={'/'}>
          <button>{'←'}</button>
        </Link>}
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    showBackArrow: state.ui.showBackArrow
  };
};

export default connect(mapStateToProps, null)(Header);
