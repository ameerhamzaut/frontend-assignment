import { SET_ORDERS, DELETE_ORDER } from './orderActions';

const initialState = {
  orders: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case DELETE_ORDER:
      const updatedOrders = state.orders.filter(
        order => order.orderNo !== action.payload
      );
      return {
        ...state,
        orders: updatedOrders
      };
    default:
      return state;
  }
};

export default orderReducer;
