import React from 'react'
import Banner from "./../../Banner";
import propTypes from "prop-types";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CreateArticleForm = ({
    handleInputChange,
    handleSubmit,
    categories,
    errors,
    editing,
    article,
    updateArticle,
    title,
    category,
    content,
    handleEditorState
}) => {
    return (
        <div>
        {/* Header */}
        <Banner 
            backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
            title={editing ? `Editing an article: ${article.title}` : 'Write an article'}
        />
        {/* END Header */}
        {/* Main container */}
        <main className="main-content">
          <section className="section">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <ul className="list-group">
                  {
                    errors.map((item, index) => <li key={index} className="list-group-item text-danger">{item.message}</li>)
                  }
                  </ul>
                  <form className="p-30 bg-gray rounded" onSubmit={editing ? updateArticle : handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-12 my-5">
                        <input type="file" name="image" className="form-control" onChange={handleInputChange} />
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <input className="form-control form-control-lg" type="text" name="title" placeholder="Title" onChange={handleInputChange} value={title}/>
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <select name="category" className="form-control form-control-lg" onChange={handleInputChange} value={category}>
                          <option value="">Select category</option>
                          {
                            categories.map(category => <option value={category.id} key={category.id}>{category.name}</option> )
                          }
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <Editor
                        editorState={content}
                        onEditorStateChange={handleEditorState}>
                        
                      </Editor>
                      {/* <textarea className="form-control form-control-lg" rows={4} placeholder="Content" name="content" defaultValue={""} onChange={handleInputChange} value={content}/> */}
                    </div>
                    <div className="text-center">
                      <button className="btn btn-lg btn-primary" type="submit">{editing ? `Update Article` : `Create Article`}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* END Main container */}
      </div>
    )
}

CreateArticleForm.propTypes = {
  handleInputChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
}

export default CreateArticleForm