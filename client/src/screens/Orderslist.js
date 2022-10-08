import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { deleteOrder } from "../actions/orderActions";

export default function Orderslist() {
  const dispatch = useDispatch();
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);
  const { loading, error, orders } = getordersstate;
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Order Item</th>
            <th>Email</th>
<th>Address</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Delete Order</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order.orderItems.map(item=>{
                                        return <div>
                                            <p>{item.name} [{item.varient}] * {item.quantity}</p>
                                        </div>
                                    })}</td>
                  <td>{order.email}</td>
<td> <p>Street : {order.shippingAddress.street}</p>
                                <p>City : {order.shippingAddress.city}</p>
                                <p>Country : {order.shippingAddress.country}</p>
                                <p>Pincode : {order.shippingAddress.pincode}</p>
                                      </td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isDelivered ? (
                      <h1>Delivered</h1>
                    ) : (
                      <button className="btn" onClick={()=>{dispatch(deliverOrder(order._id))}}>Deliver</button>
                    )}
                  </td>
                  <td>
                    {order.isDelivered === true ? (
                      <i
                        className="fa fa-trash m-1"
                        onClick={() => {
                          dispatch(deleteOrder(order._id));
                        }}
                      ></i>
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
