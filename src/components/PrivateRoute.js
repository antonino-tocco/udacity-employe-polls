import * as React from 'react';
import {connect} from 'react-redux';

import {Navigate, Outlet} from 'react-router';


const PrivateRoute = ({isUserLogged, authedUser, ...props}) => {
    return isUserLogged ? <Outlet /> : <Navigate to='/login'/>
}

const mapStateToProps = ({auth}) => ({
    authedUser: auth.authedUser,
    isUserLogged: !!auth.authedUser
});

export default connect(mapStateToProps)(PrivateRoute);