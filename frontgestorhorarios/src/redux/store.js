import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

export const history = createBrowserHistory();

const store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(...middleware,
                            routerMiddleware(history)),
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose
    )
);

export default store;
