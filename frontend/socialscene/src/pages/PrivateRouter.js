import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props => isAuthenticated ? <Component {...props} /> : <Navigate replace to='/login' />}
    />
);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(PrivateRoute);
