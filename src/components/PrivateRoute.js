import * as React from 'react';

import { connect } from 'react-redux';
import {Navigate, Outlet} from 'react-router';


const PrivateRoute = ({isUserLogged, authedUser, ...props}) => {
    return isUserLogged ? <Outlet /> : <Navigate to='/login'/>
}

export default PrivateRoute;