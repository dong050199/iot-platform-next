import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const middleware = [thunk];

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
export const store = createStore(rootReducer, enhancer);
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
