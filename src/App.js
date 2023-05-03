import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import OrderDetails from './components/OrderDetails.js';

function OrderTable() {
  const [orders, setOrders] = useState([]);


  //method use to fetch json data from .txt file
  // useEffect(() => {
  //   fetch('/data.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       setOrders(data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  //axios method use to fetch json data from api
    useEffect(() => {
      axios.get('https://my.api.mockaroo.com/shipments.json?key=5e0b62d0')
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

  const handleDelete = (orderNo) => {
    const index = orders.findIndex((order) => order.orderNo === orderNo);
    if (index !== -1) {
      const updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      setOrders(updatedOrders);
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1 className='header-page'>Shipments</h1>
          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Delivery Date</th>
                <th>Customer</th>
                <th>Tracking No</th>
                <th>Status</th>
                <th>Consignee</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className='table-primary'>
              {orders.map(order => (
                <tr key={order.orderNo}>
                  <td>{order.orderNo}</td>
                  <td>{order.date}</td>
                  <td>{order.customer}</td>
                  <td>{order.trackingNo}</td>
                  <td>{order.status}</td>
                  <td>{order.consignee}</td>
                  <td>
                    <button className='btn btn-danger' onClick={() => handleDelete(order.orderNo)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link className='btn btn-primary' to={{
                      pathname: `/about/${order.orderNo}`,
                      state: { order }
                    }}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Route>
        <Route path="/about/:orderNo">
          <OrderDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default OrderTable;

