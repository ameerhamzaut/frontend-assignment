import { createStore } from 'redux';
import orderReducer from './orderReducer';

const store = createStore(orderReducer);

export default store;
