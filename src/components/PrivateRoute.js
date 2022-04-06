import * as React from 'react';
import {connect} from 'react-redux';

import {Navigate, Outlet} from 'react-router';


const PrivateRoute = ({isUserLogged, authedUser, redirectTo, ...props}) => {
    return isUserLogged ? <Outlet /> : <Navigate to='/login' state={{
        redirectTo
    }}/>
}

const mapStateToProps = ({auth}) => ({
    authedUser: auth.authedUser,
    isUserLogged: !!auth.authedUser,
    redirectTo: auth.redirectTo ?? null
});

export default connect(mapStateToProps)(PrivateRoute);