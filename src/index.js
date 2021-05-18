import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './containers/Header'
import { App } from './pages/App'
import { Footer } from './containers/Footer'
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from "redux-thunk";
import { reducer, initialState } from "./redux/reducer";
import { Provider } from "react-redux";
import './styles/main.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxThunk))
);

const renderInDom = (component, element) =>
    ReactDOM.render(
        <Provider store={store}>
            <React.StrictMode>
                {component}
            </React.StrictMode>
        </Provider>,
        element
    )
    
renderInDom(<App />, document.getElementById('main'))
renderInDom(<Header />, document.getElementById('header'))
renderInDom(<Footer />, document.getElementById('footer'))
