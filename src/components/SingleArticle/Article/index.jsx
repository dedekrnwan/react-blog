
import React from 'react'
import { Link } from "react-router-dom";
import renderHtml from "react-render-html";

const Article = ({
    article
}) => {
    return (
        <div>
        {/* Header */}
        <header className="header header-inverse h-fullscreen pb-80" style={{backgroundImage: `${article.imageUrl}`}} data-overlay={8}>
          <div className="container text-center">
            <div className="row h-full">
              <div className="col-12 col-lg-8 offset-lg-2 align-self-center">
                <p className="opacity-70">{article.category.name}</p>
                <br />
                <h1 className="display-4 hidden-sm-down">{article.title}</h1>
                <h1 className="hidden-md-up">{article.title}</h1>
                <br />
                <br />
                <p>
                  <span className="opacity-70 mr-8">By</span>
                  <Link className="text-white" to="#">{article.user.name}</Link>
                </p>
                <p>
                  <img className="rounded-circle w-40" src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`} alt="..." />
                </p>
              </div>
              <div className="col-12 align-self-end text-center">
                <Link className="scroll-down-1 scroll-down-inverse" to="#" data-scrollto="section-content">
                  <span />
                </Link>
              </div>
            </div>
          </div>
        </header>
        {/* END Header */}
        {/* Main container */}
        <main className="main-content">
          {/*
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      | Blog content
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      !*/}
          <div className="section" id="section-content">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8 offset-lg-2">
                    {renderHtml(article.content)}
                </div>
              </div>
              <br />
              <p>
                <img src={article.imageUrl} alt="..." />
              </p>
              <br />
              {/* <div className="row">
                <div className="col-12 col-lg-8 offset-lg-2">
                  <p>Assertively empower customized alignments vis-a-vis go forward vortals. Completely monetize inexpensive alignments
                    whereas market positioning services. Uniquely revolutionize multifunctional strategic theme areas with adaptive
                    architectures. Interactively orchestrate next-generation content with proactive applications. Appropriately
                    initiate market-driven results through backend deliverables.</p>
                  <ul>
                    <li>Energistically coordinate business relationships</li>
                    <li>Change via resource-leveling innovation</li>
                    <li>Efficiently develop fully researched experiences and integrated</li>
                    <li>Assertively empower customized alignments vis-a-vis go forward vortals</li>
                  </ul>
                  <p>Quickly innovate high-quality catalysts for change via resource-leveling innovation. Seamlessly expedite just
                    in time infomediaries vis-a-vis viral manufactured products. Rapidiously network synergistic leadership whereas
                    emerging data. Professionally synergize compelling partnerships vis-a-vis leading-edge e-business. Efficiently
                    develop fully researched experiences and integrated. Phosfluorescently simplify ubiquitous bandwidth without
                    client-centered information. Professionally recaptiualize flexible relationships via performance based synergy.
                    Monotonectally mesh interoperable processes through high-quality e-commerce. Dynamically build team building
                    models without 24/7 internal or "organic" sources. Compellingly incentivize e-business methods of empowerment
                    with.
                  </p>
                  <blockquote className="blockquote">
                    <div className="quote-sign" />
                    <p>Objectively grow out-of-the-box results with go forward methodologies. Progressively exploit dynamic functionalities
                      without ethical portals. Competently facilitate timely total linkage with.</p>
                    <footer>Someone famous in
                      <cite title="Source Title">Source Title</cite>
                    </footer>
                  </blockquote>
                  <p>Proactively underwhelm proactive leadership skills whereas plug-and-play paradigms. Credibly whiteboard client-centered
                    intellectual capital after B2B total linkage. Progressively innovate technically sound manufactured products
                    whereas diverse meta-services. Continually orchestrate ubiquitous core competencies rather than market positioning
                    "outside the box" thinking. Dramatically redefine out-of-the-box schemas.</p>
                  <div className="gap-multiline-items-1 mt-30">
                    <Link className="badge badge-pill badge-default" to="#">Record</Link>
                    <Link className="badge badge-pill badge-default" to="#">Progress</Link>
                    <Link className="badge badge-pill badge-default" to="#">Customers</Link>
                    <Link className="badge badge-pill badge-default" to="#">News</Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/*
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      | Comments
      |‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
      !*/}
          <div className="section bt-1 bg-grey">
            <div className="container">
              <div className="row text-center">
                <div className="text-center p-5">
                  COMMENTS HERE.
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* END Main container */}
      </div>
    )
}


export default Article
