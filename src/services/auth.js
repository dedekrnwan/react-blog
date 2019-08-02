import { validateAll } from "indicative";
import axios from "axios";
import config from "./../config";

export default class AuthService {
    registerUser = (data) => {
        return new Promise((resolve, reject) => {
            const rules = {
                name: 'required|string',
                email: 'required|email',
                password: 'required|string|min:6|confirmed',
            }
            const messages = {
                required: 'This {{ field }} is required',
                'required.email': 'The email is required',
                'email.email' : 'The email is invalid',
                'password.confirmed': 'The password confirmation does not match'
            }
            validateAll(data, rules, messages).then(() => {
                axios.post(`${config.apiUrl}/auth/register`,{
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }).then((response) => {
                    resolve(response.data.data)
                }).catch((error) => {
                    if(error.response && error.response.status === 422){
                        const formattedError = {}
                        formattedError['email'] = error.response.data['email'][0]
                        reject(formattedError)
                    }
                })
            }).catch((error) => {
                const formattedError = {}
                error.forEach(item => formattedError[item.field] = item.message);
                reject(formattedError)
            })
        })
    }
    loginUser = (data) => {
        return new Promise((resolve, reject) => {
            const rules = {
                email: 'required|email',
                password: 'required|string',
            }
            const messages = {
                required: 'This {{ field }} is required',
                'email.email' : 'The email is invalid',
            }
            validateAll(data, rules, messages).then(() => {
                axios.post(`${config.apiUrl}/auth/login`,{
                    email: data.email,
                    password: data.password
                }).then((response) => {
                    resolve(response.data.data)
                }).catch((error) => {
                    if(error.response && error.response.status === 401){
                        const formattedError = {}
                        formattedError['email'] = 'Invalid email or password'
                        reject(formattedError)
                    }
                })
            }).catch((error) => {
                const formattedError = {}
                error.forEach(item => formattedError[item.field] = item.message);
                reject(formattedError)
            })
        })
    }
}