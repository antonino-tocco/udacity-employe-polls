import * as React from 'react';

import { connect } from 'react-redux';
import {Navigate, Outlet} from 'react-router';


const PrivateRoute = ({isUserLogged, ...props}) => {
    return isUserLogged ? <Outlet /> : <Navigate to='/login'/>
}

const mapStateToProps = ({users}) => ({
    isUserLogged: !!users?.loggedUser,
    loggedUser: users?.loggedUser ?? null
});

export default connect(mapStateToProps)(PrivateRoute);