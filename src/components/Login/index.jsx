
import React from 'react'
import LoginForm from "./LoginForm/index";

class Login extends React.Component{
    constructor(){
        super()

        this.state = {
            email: '',
            password: '',
            errors: {},
        }
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.loginUser(this.state).then((user) => {
            this.props.setAuthUser(user)
        }).catch((error) => {
            this.setState({
                errors: error
            })
        })
    }
    render = () => {
        return (
           <LoginForm
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
           ></LoginForm>
        )
    }
}

export default Login