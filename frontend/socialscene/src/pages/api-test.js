import React, {useState, useEffect} from "react"

function App({signup}) {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/sign_up`)
        .then((response) => response.json())
        .then(setData)
    },[])

    if (data) {
        // return <div>{JSON.stringify(data)}</div>
        return (
            <div>
                <h1>{data.username}</h1>
            </div>
        )
        
    }

    return <div>No user data</div>
} 
export default App