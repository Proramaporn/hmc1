import userReducer from './reducers/userReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    userReducer: userReducer,
});

const configureStore = createStore(rootReducer);
export default configureStore;