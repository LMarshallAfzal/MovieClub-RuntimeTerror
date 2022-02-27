import React from "react"

class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            old_password:'',
            new_password:'',
            new_password_confirmation:'',
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
        console.log(this.state)
        //const token = JSON.parse(localStorage.getItem('token'))
        console.log("HERE")
        const userData = JSON.parse(localStorage.getItem('user'))
        console.log("HERE2")
        fetch('http://127.0.0.1:8000/change_password/',{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(console.log("WORKS HERE TOO"))
        .then(response=>response.json())
        .then((response)=>console.log(response))
        // localStorage.setItem('user', JSON.stringify(this.state))
    }
    

    fetchData(){
        const userData = JSON.parse(localStorage.getItem('user'))
        console.log(userData)
            this.setState({
                old_password: userData.old_password,
                new_password: userData.new_password,
                new_password_confirmation: userData.new_password_confirmation,
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
                        <th>Old Password</th>
                        <td>
                            <input value={this.state.old_password} name="old_password" onChange={this.changeHandler} type="password" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>New Password</th>
                        <td>
                            <input value={this.state.new_password} name="new_password" onChange={this.changeHandler} type="password" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>New Password Confirmation</th>
                        <td>
                            <input value={this.state.new_password_confirmation} name="new_password_confirmation" onChange={this.changeHandler} type="password" className="form-control" />
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

export default ChangePassword
