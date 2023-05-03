import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function OrderDetails() {
  const { state: { order } } = useLocation();
  const [editedOrder, setEditedOrder] = useState(order);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedOrder({ ...editedOrder, [name]: value });
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setEditedOrder({ ...editedOrder, status: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/orders/${order.id}`, editedOrder).then(response => {
      setEditedOrder(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <form className='container mt-2' autoFocus='false' onSubmit={handleSubmit}>

      <h2 disabled>Shipments Details</h2>
      <div className="row form-group">
        <div className="col">
          <input type="text" tabindex="-1" aria-disabled="true" disabled className="order-no form-control bg-light pe-none" name="orderNo" value={editedOrder.orderNo} />
        </div>
        <div className="col">
          <DatePicker
            value={editedOrder.date}
            disabled
            onChange={(date) =>
              setEditedOrder({
                ...editedOrder,
                date: date,
              })
            }
            minDate={new Date("2023-05-02")}
            maxDate={new Date("2023-07-02")}

            className="dates form-control bg-light"
          />
        </div>
      </div>
      <div className="row form-group mt-4 ">
        <div className="col">
          <input type="text" disabled={!editedOrder.editable} className="form-control bg-light" name="customer" value={editedOrder.customer} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="text" disabled className="tracking-no form-control bg-light" name="trackingNo" value={editedOrder.trackingNo} />
        </div>
      </div>
      <div className="row form-group mt-4 mb-4">
        <div className="col mb-4 ">
          <input type="text" disabled={!editedOrder.editable} className="form-control bg-light" name="consignee" value={editedOrder.consignee} onChange={handleChange} />
        </div>
        <div className="col">
          <div className="input-group">
            <select disabled={!editedOrder.editable} className="form-select bg-light" name="status" value={editedOrder.status} onChange={handleStatusChange}>
              <option value="Delivered">Delivered</option>
              <option value="Shipped">Shipped</option>
              <option value="In Transit">In Transit</option>
            </select>

          </div>
        </div>
      </div>
      {editedOrder.editable ? (
        <button type="submit" className="btn btn-success" onClick={() => setEditedOrder({ ...editedOrder, editable: false })}>Save</button>
      ) : (
        <button type="button" className="btn btn-primary" onClick={() => setEditedOrder({ ...editedOrder, editable: true })}>Edit</button>
      )}
    </form>
  );
}

export default OrderDetails;
