import CreateArticleForm from "./CreateArticleForm";

import React, { Component } from 'react';
// import { validateAll } from "indicative";

class CreateArticle extends Component {
  constructor(){
    super()

    this.state = {
      title: '',
      image: null,
      content: '',
      category: null,
      errors: [],
      categories: []
    }
  }
  componentWillMount = () => {
    this.props.getArticleCategories().then((response) => {
      this.setState({
        categories: response
      })
    }).catch((error) => {
      console.log(error)
    });
  }
  handleInputChange = (event) => {
    this.setState({
        [event.target.name]: (event.target.type === 'file') ? event.target.files[0] : event.target.value
    })
  }
  handleSubmit = async (event) => {
      event.preventDefault();

      this.props.createArticle(this.state, this.props.authUser.token).then((response) => {
        this.props.history.push('/')
      }).catch((error) => {
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
      ></CreateArticleForm>
    )
  }
}

export default CreateArticle;
