import React, { Component } from 'react';

import Article from "./Article";

class SingleArticle extends Component {
  constructor(){
    super()

    this.state = {
      article: null,
      loading: true
    }
  }
  componentWillMount = () => {
    console.log(this.props.articles)
    const article = this.props.articles.data.find(article => article.slug === this.props.match.params.slug)
    if(article){
      this.setState({
        article,
        loading:false
      })
    }else{
      this.props.getArticle(this.props.match.params.slug).then(response => {
        this.setState({
          article: response,
          loading:false
        })
      }).catch(error => {
        console.log(error)
      })
    }
    
  }
  render() {
    return (
      <div>
        {
          !this.state.loading && 
          <Article
            article={this.state.article}
          >

          </Article>
        }
      </div>
    );
  }
}

export default SingleArticle;
