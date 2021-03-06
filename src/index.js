import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
        <Suspense fallback={null}>
            <App />
        </Suspense>
    </BrowserRouter>, document.getElementById("root"))

