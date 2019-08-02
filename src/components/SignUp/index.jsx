import React from 'react';   
import SignUpForm from "./SignUpForm/index";

class SignUp extends React.Component {
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        }
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();

        this.props.registerUser(this.state).then((user) => {
            this.props.setAuthUser(user)
        }).catch((error) => {
            this.setState({
                errors: error
            })
        })
    }
    render = () => {
        return (
            <SignUpForm
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                errors={this.state.errors}
            >

            </SignUpForm>
        )
    }
}


export default SignUp
