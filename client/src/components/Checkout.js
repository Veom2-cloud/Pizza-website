import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const dispatch = useDispatch();
  
  
  
  function tokenHander(token) {
    console.log(token);
    dispatch(placeOrder(token, subtotal));
  }
  function abc() {
    if (localStorage.getItem("currentUser")) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    } else {
      alert("Please Login to buy the pizza");
      window.location.href = "/login";
    }
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {success && <Success success="Your Order Placed Successfully" />}

      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        token={tokenHander}
        stripeKey="pk_test_51JXN8ASGX65UtClKQM1qR2CE17v2qSIK3mvU2Mt2nG04vFt2s32pxb7Vj5I8W278pXK92l3D5rZV45XFa1JYgKO900q1RZSIe3"
        currency="INR"
      >
        <button className="btn" onClick={abc}>Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
