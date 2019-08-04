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
import Unauthenticated from "./../Unauthenticated";
import UserArticles from '../UserArticles';

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
            this.props.notyService.success(`Successfully login`)
            this.props.history.push('/')
        })
    }
    removeAuthUser = () => {
        localStorage.removeItem('user');
        this.props.notyService.success(`Successfully logged out`)
        this.setState({
            authUser: null
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
                        removeAuthUser={this.removeAuthUser}
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
                    path="/articles/create"
                    component={CreateArticle}
                    componentProps={{
                        getArticleCategories: this.props.articlesService.getArticleCategories,
                        createArticle:this.props.articlesService.createArticle,
                        authUser: this.state.authUser ? this.state.authUser : null,
                        categories:this.state.categories,
                        notyService:this.props.notyService
                    }}
                    isAuthenticated={ this.state.authUser !== null}
                />
                <Auth
                    path="/user/articles"
                    component={UserArticles}
                    componentProps={{
                        getUserArticles:this.props.articlesService.getUserArticles,
                        setArticles: this.setArticles,
                        deleteArticle: this.props.articlesService.deleteArticle,
                        token:this.state.authUser ? this.state.authUser.token : null
                    }}
                    isAuthenticated={this.state.authUser !== null}
                />
                
                <Unauthenticated 
                    path="/auth/login" 
                    component={Login}
                    componentProps={{
                        setAuthUser:this.setAuthUser,
                        loginUser:this.props.authService.loginUser
                    }}
                    isAuthenticated={ this.state.authUser !== null}
                ></Unauthenticated>
                <Unauthenticated 
                    path="/auth/signup" 
                    component={SignUp}
                    componentProps={{
                        registerUser:this.props.authService.registerUser, 
                        setAuthUser:this.setAuthUser
                    }}
                    isAuthenticated={ this.state.authUser !== null}
                ></Unauthenticated>
                <Route 
                    path="/article/:slug" 
                    exact
                    render={
                    props => (
                        <SingleArticle
                            {...props}
                            getArticle={this.props.articlesService.getArticle}
                            articles={this.state.articles}
                        ></SingleArticle>
                    )
                }></Route>
                <Auth
                    path="/article/edit/:slug"
                    component={CreateArticle}
                    componentProps={{
                        getArticleCategories: this.props.articlesService.getArticleCategories,
                        createArticle:this.props.articlesService.createArticle,
                        authUser: this.state.authUser ? this.state.authUser : null,
                        categories:this.state.categories,
                        articles:this.state.articles,
                        updateArticle:this.props.articlesService.updateArticle,
                        notyService:this.props.notyService
                    }}
                    isAuthenticated={this.state.authUser !== null}
                />
                {
                    (location.pathname !== '/auth/login' && location.pathname !== '/auth/signup') &&
                    <Footer/>
                }
            </div>
        )
    }
}