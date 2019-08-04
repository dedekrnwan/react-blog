import React from 'react'
import Article from "./../../Article";
import Banner from "./../../Banner";
// import { Link } from "react-router-dom";

const Articles  = ({
    articles,
    handlePagination,
    deleteArticle,
    editArticle
}) => {
    return (
        <div>
            <Banner
                backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-gift.jpg)`}
                title="My Articles"
                subTitle="Here are the article created by you."
            >
            </Banner>
            <main className="main-content bg-gray">
                <div className="row">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        {
                            articles && articles.data.map(item => (
                                <div key={item.id}>
                                    <Article 
                                        article={item}
                                    />
                                    <div className="text-center">
                                        <button className="btn btn-info mr-5" onClick={() => editArticle(item)}>
                                            Edit Article
                                        </button>
                                        <button className="btn btn-danger" onClick={() => deleteArticle(item.id)}>
                                            Delete Article
                                        </button>
                                    </div>
                                    <hr/>
                                </div>)
                            )
                        }
                        <nav className="flexbox mb-50">
                            <div className={`btn btn-white ${articles.prev_page_url ? '' : 'disabled'}`} onClick={() => handlePagination(articles.prev_page_url)}>
                                <i className="ti-arrow-left fs-9 mr-4"/> Previous
                            </div>
                            <div className={`btn btn-white ${articles.next_page_url ? '' : 'disabled'}`}  onClick={() => handlePagination(articles.next_page_url)}> Next
                                <i className="ti-arrow-right fs-9 ml-4" />
                            </div>
                        </nav>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Articles