import CreateArticleForm from "./CreateArticleForm";

import React, { Component } from 'react';
import { EditorState,convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

class CreateArticle extends Component {
  constructor(){
    super()

    this.state = {
      title: '',
      image: null,
      content: EditorState.createEmpty(),
      category: '',
      errors: [],
      categories: [],
      editing: false,
      article: null
    }
  }
  componentWillMount = () => {
    this.props.getArticleCategories().then((response) => {
      if(this.props.match.params.slug){
        const article = this.props.articles.data.find(article =>  article.slug === this.props.match.params.slug)
        if(!article){
          this.props.history.push(`/user/articles`)
        }
        this.setState({
          editing: true,
          article: article,
          categories: response,
          title: article.title,
          content: article.content,
          category: article.category_id
        })
      }else{
        this.setState({
          categories: response
        })
      }
    }).catch((error) => {
        debugger
        console.log(error)
    });
  }
  updateArticle = (event) => {
    const html = draftToHtml(convertToRaw(this.state.content.getCurrentContent()));
    event.preventDefault()
    this.props.updateArticle({
      title:  this.state.title,
      image:  this.state.image,
      content:  html,
      category:  this.state.category,
    }, this.state.article, this.props.authUser.token).then((response) => {
      this.props.notyService.success('Successfully updating article')
      this.props.history.push('/')
    }).catch((error) => {
        this.props.notyService.error('Failed updating article')
        console.log(error)
    })
    //update service

  }
  handleInputChange = (event) => {
    this.setState({
        [event.target.name]: (event.target.type === 'file') ? event.target.files[0] : event.target.value
    })
  }
  handleEditorState = (editorState) => {
    this.setState({
      content: editorState
    })
  }
  handleSubmit = async (event) => {
      const html = draftToHtml(convertToRaw(this.state.content.getCurrentContent()));
      event.preventDefault();

      this.props.createArticle({
        title: this.state.title,
        content: html,
        category: this.state.category,
        image: this.state.image
      }, this.props.authUser.token).then((response) => {
      this.props.notyService.success('Successfully creating article')
      this.props.history.push('/')
      }).catch((error) => {
        this.props.notyService.error('Failed creating article')
        this.setState({
          errors: error
        })
      })
      // const rules = {
        
      // }

      // const messages = {

      // }

      // validateAll(this.state, rules, messages).then(() => {

      // }).catch((error) => {
      //   console.log(error)
      // })
      // this.props.registerUser(this.state).then((user) => {
      //     this.props.setAuthUser(user)
      // }).catch((error) => {
      //     this.setState({
      //         errors: error
      //     })
      // })

  }
  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        categories={this.state.categories}
        errors={this.state.errors}
        editing={this.state.editing}
        article={this.state.article}
        updateArticle={this.updateArticle}
        title={this.state.title}
        content={this.state.content}
        category={this.state.category}
        handleEditorState={this.handleEditorState}
      ></CreateArticleForm>
    )
  }
}

export default CreateArticle;
