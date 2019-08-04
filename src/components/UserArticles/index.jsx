import React from 'react'
import Articles from "./Articles";

class UserArticles extends React.Component {
    constructor(){
        super()
        this.state = {
            articles: {
                data: []
            }
        }
    }
    componentWillMount = () => {
        this.props.getUserArticles(this.props.token).then((response) => {
            this.setState({
                articles: response
            })
            this.props.setArticles(response)
        }).catch((error) => {
            console.log(error)
        })
    }
    handlePagination= (url) => {
        this.props.getUserArticles(this.props.token, url).then(response => {
            this.setState({
                articles: response
            })
            this.props.setArticles(response)
        }).catch((error) => {
            console.log(error)
        })
        
    }
    deleteArticle = (id) => {
        this.props.deleteArticle(id, this.props.token).then((response) => {
            //remove articles from list
            const articles = this.state.articles.data.filter(article => article.id !== id)
            this.setState({
                articles: {
                    data: articles
                }
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    editArticle = (article) => {
        this.props.history.push(`/article/edit/${article.slug}`)
    }
    render() {
        return (
            <Articles
                articles={this.state.articles}
                handlePagination={this.handlePagination}
                deleteArticle={this.deleteArticle}
                editArticle={this.editArticle}
            >

            </Articles>
        );
    }
}

export default UserArticles;