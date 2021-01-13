import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const customCompose =
        process.env.NODE_ENV === 'development'
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
            : compose;

    const composedEnhancers = customCompose(...enhancers);

    return createStore(rootReducer, composedEnhancers);
}
