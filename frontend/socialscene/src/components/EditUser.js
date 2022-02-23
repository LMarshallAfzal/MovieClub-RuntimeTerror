import React from "react"

class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            first_name:'',
            last_name:'',
            email:'',
            bio:'',
            preferences:'',
        }
        this.changeHandler=this.changeHandler.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }

    changeHandler(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    submitForm(){
        // const token = JSON.parse(localStorage.getItem('token'))
        const userData = JSON.parse(localStorage.getItem('user'))
        console.log(userData.username)
        fetch('http://127.0.0.1:8000/edit_profile/' + userData.username ,{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.json())
        .then((data)=>console.log(data))
        localStorage.setItem('user', JSON.stringify(this.state))
    }
    

    fetchData(){
        const userData = JSON.parse(localStorage.getItem('user'))
        console.log(userData)
            this.setState({
                username: userData.username,
                first_name:userData.first_name,
                last_name:userData.last_name,
                email:userData.email,
                bio:userData.bio,
                preferences:userData.preferences,
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <table className="table table-bordered">
                <tbody>
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
                        <td colSpan="2">
                            <input type="submit" onClick={this.submitForm} className="btn btn-dark" />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default EditUser
