import React from "react"
import {useParams} from "react-router-dom"


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
            password:'',
            password_confirmation:''
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
        var id=this.props.match.params.id;
        console.log(id)
        fetch('http://127.0.0.1:8000/edit_profile/'+id+'/',{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.json())
        .then((data)=>console.log(data));

    }
    

    fetchData(){
        var id=this.props.match.params.id;
        fetch('http://127.0.0.1:8000/edit_profile/'+ id +'/')
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                username:data.full_name,
                first_name:data.first_name,
                last_name:data.last_name,
                email:data.email,
                bio:data.bio,
                preferences:data.preferences,
                password:data.password,
                password_confirmation:data.password_confirmation
            });
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    render(){
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
