import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

const dev = process.env.NODE_ENV === 'development';
const enhancer = dev ? console.tron.createEnhancer() : null;

const store = createStore(rootReducer, enhancer);

export default store;
