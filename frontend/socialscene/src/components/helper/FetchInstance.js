

let baseURL = 'http://127.0.0.1:8000';

let originalRequest = async (url, config) => {
    url = `${baseURL}${url}`
    let response = await fetch(url, config);
    let data = await response.json();
    console.log('REQUESTING:', data)
    return {response, data} 
}

let refreshToken = async (authTokens) => {
    let response = await fetch('http://127.0.0.1:8000/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify({'refresh': authTokens.refresh})
    })
    let data = await response.json()
    localStorage.setItem('authTokens', JSON.stringify(data))
    return data
}

let customFetcher = async (url, config={}) => {
    let authTokens = localStorage.getItem("authTokens") ? JSON.parse(localStorage.gettItem("authTokens")) : null

    config['headers'] = {
        Authorization: `Bearer ${authTokens?.access}`
    }

    console.log("Before request")
    let {response, data} = await originalRequest(url, config)
    console.log("After request")

    if(response.status === 401) {
        authTokens = await refreshToken(authTokens)

        config['headers'] = {
            Authorization: `Bearer ${authTokens?.access}`
        }

        let newResponse = await originalRequest(url, config)
        response = newResponse.response
        data = newResponse.data
    }
    return {response, data}
}

export default customFetcher;