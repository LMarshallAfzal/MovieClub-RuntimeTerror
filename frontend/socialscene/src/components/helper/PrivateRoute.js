import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './AuthContext'

// const PrivateRoute = ({children, ...rest}) => {
//     console.log('biglen')

//     let {user} = useContext(AuthContext)
//     // const location = useLocation()
    
//     if(!user) {
//         return (
            
//             <Navigate to="/login" />
//         )
//     }    
//     return(
//         <Route {...rest}>{children}</Route>
//     )
// }

const PrivateRoute = ({ children }) => {
    let { user } = useContext(AuthContext);
  
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoute;

