import React from 'react'
import Banner from "./../../Banner";
import propTypes from "prop-types";

const CreateArticleForm = ({
    handleInputChange,
    handleSubmit,
    categories,
    errors
}) => {
    return (
        <div>
        {/* Header */}
        <Banner 
            backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
            title="Write an article"
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
                  <form className="p-30 bg-gray rounded" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-12 my-5">
                        <input type="file" name="image" className="form-control" onChange={handleInputChange} />
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <input className="form-control form-control-lg" type="text" name="title" placeholder="Title" onChange={handleInputChange} />
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <select name="category" className="form-control form-control-lg" onChange={handleInputChange} >
                          <option value="">Select category</option>
                          {
                            categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)
                          }
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea className="form-control form-control-lg" rows={4} placeholder="Content" name="content" defaultValue={""} onChange={handleInputChange} />
                    </div>
                    <div className="text-center">
                      <button className="btn btn-lg btn-primary" type="submit">Create Article</button>
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