import React, { Component } from 'react'
import { Route } from "react-router-dom";

import Navbar from "./../Navbar";
import Welcome from './../Welcome';
import CreateArticle from "./../CreateArticle";
import SingleArticle from "./../SingleArticle";
import Footer from "./../Footer";
import Login from "./../Login";
import SignUp from "./../SignUp";
import Auth from "./../Auth";

export default class App extends Component {
    constructor(){
        super()
        this.state = {
            authUser: null,
            articles: {
                data: []
            },
        }
    }
    componentWillMount = () => {
        const user = localStorage.getItem('user');
        if(user){
            this.setState({
                authUser: JSON.parse(user)
            })
        }
    }
    setAuthUser = (authUser) => {
        this.setState({
            authUser: authUser
        }, () => {
            localStorage.setItem('user', JSON.stringify(authUser))
            this.props.history.push('/')
        })
    }
    setArticles = (articles) => {
        this.setState({
            articles
        })
    }
    render = () => {
        const { location } = this.props
        return (
            <div>
                {
                    (location.pathname !== '/auth/login' && location.pathname !== '/auth/signup') &&
                    <Navbar
                        authUser={this.state.authUser}
                    >
                    </Navbar>
                }
                <Route
                    exact
                    path='/'
                    render={
                        props => (
                            <Welcome
                                {...props}
                                getArticles={this.props.articlesService.getArticles}
                                setArticles={this.setArticles}
                            ></Welcome>
                        )
                    }
                >
                </Route>
                <Auth
                    path="articles/create"
                    component={CreateArticle}
                    componentProps={{
                        getArticleCategories: this.props.articlesService.getArticleCategories,
                        createArticle:this.props.articlesService.createArticle,
                        authUser: this.state.authUser ? this.state.authUser : null,
                        categories:this.state.categories,
                    }}
                    isAuthenticated={ this.state.authUser !== null}
                />
                <Route 
                    path="/auth/login" 
                    render={
                        props => (<Login
                            {...props}
                            setAuthUser={this.setAuthUser}
                            loginUser={this.props.authService.loginUser}
                        >
                            
                        </Login>)
                    }
                ></Route>
                <Route path="/auth/signup" render={
                    (props) => <SignUp {...props} 
                    registerUser={this.props.authService.registerUser} 
                    setAuthUser={this.setAuthUser}>
                    </SignUp>}>
                </Route>
                <Route path="/article/:slug" render={
                    props => (
                        <SingleArticle
                            {...props}
                            getArticle={this.props.articlesService.getArticle}
                            articles={this.state.articles}
                        ></SingleArticle>
                    )
                }></Route>
                {
                    (location.pathname !== '/auth/login' && location.pathname !== '/auth/signup') &&
                    <Footer/>
                }
            </div>
        )
    }
}