export const SET_ORDERS = 'SET_ORDERS';
export const DELETE_ORDER = 'DELETE_ORDER';

export const setOrders = orders => {
  return {
    type: SET_ORDERS,
    payload: orders
  };
};

export const deleteOrder = orderNo => {
  return {
    type: DELETE_ORDER,
    payload: orderNo
  };
};
