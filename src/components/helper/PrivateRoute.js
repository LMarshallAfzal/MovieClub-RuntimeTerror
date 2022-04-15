import { Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import AuthContext from './AuthContext'

const PrivateRoute = ({ children }) => {
    let { user } = useContext(AuthContext);
  
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoute;

