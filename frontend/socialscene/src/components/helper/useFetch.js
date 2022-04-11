import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "./AuthContext";

let useFetch = () => { 
    let config = {}

    let {authTokens, setAuthTokens, setUser} = useContext(AuthContext)

    let baseURL = 'http://127.0.0.1:8000';

    let originalRequest = async (url, config, options) => {
        url = `${baseURL}${url}`
        let response = await fetch(url, config, options);
        let data = await response.json();
        console.log('REQUESTING:', data);
        return {response, data}; 
    }

    let refreshToken = async (authTokens) => {
        let response = await fetch('http://127.0.0.1:8000/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({refresh: authTokens.refresh})
        })
        let data = await response.json()
        localStorage.setItem('authTokens', JSON.stringify(data))
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        return data;
    }

    let callFetch = async (url, options, body={}) => { 
        const user = jwt_decode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if(isExpired) {
            authTokens = await refreshToken(authTokens);
        }

        config['headers'] = {
            Authorization: `Bearer ${authTokens.access}`
        }

        if(options === 'GET') {
            config['method'] = 'GET'
            config['headers'] ={
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${authTokens.access}`
            }
        }
        else if(options === 'POST') {
            config['method'] = 'POST'
            config['headers'] ={
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${authTokens.access}`
            }
            config['body'] = JSON.stringify(body)
        }
        else if(options === 'PUT') {
            config['method'] = 'PUT'
            config['headers'] = {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${authTokens.access}`
            }
            config['body'] = JSON.stringify(body)
        }
        else if(options === 'DELETE') {
            config['method'] = 'DELETE'
            config['headers'] = {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${authTokens.access}`
            }
        }

        let {response, data} = await originalRequest(url, config, options, body);
        return {response, data};
    }

    useEffect(() => {
        refreshToken();
    },[])

    return callFetch;
}

export default useFetch;