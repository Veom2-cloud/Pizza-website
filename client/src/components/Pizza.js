import React, { useState } from "react";
import { addToCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

export default function Pizza({ pizza }) {
  AOS.init({});
  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("small");

  const dispatch = useDispatch();

  function addtocart() {
    dispatch(addToCart(pizza, quantity, varient));
    alert("You have added " + pizza.name + " {" + varient + "} to cart ");
  }

  return (
    <div key={pizza._id}
    >
      <Link
        to={`/pizza/${pizza._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div data-aos="zoom-in" ></div>
        <div
          style={{
            margin: "30px 50px 50px 50px",
            height: "450px",
            background: "green",
          }}
          className="shadow p-3 mb-5 bg-white rounded "
        >
          <div>
            <h1>{pizza.name}</h1>
            <img
              src={pizza.image}
              className="img-fluid"
              style={{ height: "200px", weight: "200px" }}
              alt="img"
            ></img>
          </div>

          <hr></hr>

          <div className="flex-container">
            <div className="w-100 m-1">
              <p>Varient</p>
              <select
                className="form-select"
                value={varient}
                onChange={(e) => {
                  setvarient(e.target.value);
                }}
              >
                {pizza.varients.map((varient) => {
                  return <option value={varient}>{varient}</option>;
                })}
              </select>
            </div>
            <div className="w-100 m-1">
              <p>Quantity</p>
              <select
                className="form-select"
                value={quantity}
                onChange={(e) => {
                  setquantity(e.target.value);
                }}
              >
                {[...Array(10).keys()].map((x, i) => {
                  return <option value={i + 1}>{i + 1}</option>;
                })}
              </select>
            </div>
          </div>

          <hr></hr>

          <div className="flex-container">
            <div className="m-1 w-100">
              <h1 className="mt-1">
                Price: {pizza.prices[0][varient] * quantity} Rs/-
              </h1>
            </div>
            <div className="m-1 w-100">
              <button className="btn" onClick={addtocart}>
                ADD TO CART{" "}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
