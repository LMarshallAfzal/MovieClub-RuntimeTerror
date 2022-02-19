import React from 'react'

class Add extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            first_name:'',
            last_name:'',
            email:'',
            bio:'',
            preferences:'',
            password:'',
            password_confirmation:''
        }
        this.changeHandler=this.changeHandler.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }

    changeHandler(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    submitForm() {
        fetch('http://127.0.0.1:8000/sign_up/',{
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.json())
        .then((data)=>console.log(data))

        this.setState({
            username:'',
            first_name:'',
            last_name:'',
            email:'',
            bio:'',
            preferences:'',
            password:'',
            password_confirmation:''
        })
    }

    render(){
        return (
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Username</th>
                        <td>
                            <input value={this.state.username} name="username" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <td>
                            <input value={this.state.first_name} name="first_name" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>
                            <input value={this.state.last_name} name="last_name" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>
                            <input value={this.state.email} name="email" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Bio</th>
                        <td>
                            <input value={this.state.bio} name="bio" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Preferences</th>
                        <td>
                            <input value={this.state.preferences} name="preferences" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>
                            <input value={this.state.password} name="password" onChange={this.changeHandler} type="password" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Password confirmation</th>
                        <td>
                            <input value={this.state.password_confirmation} name="password_confirmation" onChange={this.changeHandler} type="password" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input type="submit" onClick={this.submitForm} className="btn btn-dark" />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Add
