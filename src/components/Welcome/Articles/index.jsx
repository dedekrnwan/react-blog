import React from 'react'
import Article from "./../../Article";
import Banner from "./../../Banner";
// import { Link } from "react-router-dom";

const Articles  = ({
    articles,
    handlePagination
}) => {
    return (
        <div>
            <Banner
                backgroundImage="url(assets/img/bg-gift.jpg)"
                title="Latest Blog Posts"
                subTitle="Read and get updated on how we progress."
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