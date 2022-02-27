import React, {useState} from 'react';
import SideNavbar from '../components/Sidebar';
import NameHeader from '../components/NameHeader';
import Login from './Login';

function Dashboard() {
    
    const [token, setToken] = useState('');

    const userLogin = (tok) => {
      setToken(tok);
    }
    console.log(token)
    localStorage.setItem('token',token);
    if(!token) {
        return <Login userLogin={userLogin}/>
    }

    return (
        <>
            <NameHeader />
            <SideNavbar />
        </>
    );
}

export default Dashboard;
