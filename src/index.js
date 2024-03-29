import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, withRouter } from "react-router-dom";
import React from 'react'
import authService from "./services/auth";
import articlesService from "./services/articles";
import notificationService from "./services/notification";
import App from "./components/App";

const Main = withRouter((props) => {
    return (
        <App
            authService={new authService()}
            articlesService={new articlesService()}
            notyService={new notificationService()}
            {...props}
        >

        </App>
    )
})


ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
    , document.getElementById('root'));



serviceWorker.unregister();
