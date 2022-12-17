import { createStore } from 'redux';
import { rootReducer } from './AppState';

const configureStore = () => createStore(rootReducer, {});

export default configureStore;
