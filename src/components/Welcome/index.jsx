// import { Link } from "react-router-dom";
import React, { Component } from 'react';
import Articles from "./Articles";

class Welcome extends Component {
    constructor(){
        super()
        this.state = {
            articles: {
                data: []
            }
        }
    }
    componentWillMount = () => {
        this.props.getArticles().then((response) => {
            this.setState({
                articles: response.data.data
            })
            this.props.setArticles(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    handlePagination= (url) => {
        this.props.getArticles(url).then(response => {
            this.setState({
                articles: response.data.data
            })
            this.props.setArticles(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
        
    }
    render() {
        return (
            <Articles
                articles={this.state.articles}
                handlePagination={this.handlePagination}
            >

            </Articles>
        );
    }
}

export default Welcome;