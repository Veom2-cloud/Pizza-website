import { getPizzaById } from "../actions/pizzaActions";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Loading from "../components/Loading";
export default function Detailscreen({ match }) {
  const dispatch = useDispatch();

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);

  const { pizza , error, loading } = getpizzabyidstate;

  useEffect(() => {
    dispatch(getPizzaById(match.params.pizzaid));
  }, [pizza, dispatch]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error="Something Went Wrong" />
      ) : (
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card p-2 m-2 shadow p-3 mb-5 bg-white rounded">
              <h1
                style={{ fontSize: "20px" }}
                className="d-flex justify-content-center"
              >
                <b>{pizza.name}</b>
              </h1>
              <div className="img-wrapper">
                <Zoom>
                  <img
                    src={pizza.image}
                    className="img-fluid m-3 bigimg"
                    alt=""
                  />
                </Zoom>
                <div className="justify-content-center">
                  Click on image to zoom in{" "}
                </div>
              </div>
              <h1 className="mt-4">
                <b>About this Restaurant</b>
              </h1>
              <ul style={{ color: "black" }}>
                <li>
                  <p>{pizza.description}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
