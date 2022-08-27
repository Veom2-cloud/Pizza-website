import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import Error from "../components/Error";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css' 


import Loading from "../components/Loading";
export default function Detailscreen({ match }) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);

  const { pizza, error, loading } = getpizzabyidstate;

  const editpizzastate = useSelector((state) => state.editPizzaReducer);
  const { editloading, editerror, editsuccess } = editpizzastate;

  useEffect(() => {
    if (pizza) {
      if (pizza._id == match.params.pizzaid) {
        setname(pizza.name);
        setdescription(pizza.description);
        setcategory(pizza.category);
        setsmallprice(pizza.prices[0]["small"]);
        setmediumprice(pizza.prices[0]["medium"]);
        setlargeprice(pizza.prices[0]["large"]);
        setimage(pizza.image);
      } else {
        dispatch(getPizzaById(match.params.pizzaid));
      }
    } else {
      dispatch(getPizzaById(match.params.pizzaid));
    }
  }, [pizza, dispatch]);

  
  return (
    <div>
      <div className="text-center shadow-lg p-3 mb-5 bg-white rounded">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editloading && <Loading />}
        <div className="row mt-5">
        <div className="col-md-6">
          <div className="card p-2 m-2 shadow p-3 mb-5 bg-white rounded">
            <h1 style={{fontSize: '20px'}} className="d-flex justify-content-center"><b>{name}</b></h1>
          <div className="img-wrapper">
          <Zoom>
          <img
              src={image}
              className="img-fluid"
              style={{ height: "200px", weight: "200px" }}
              alt="img"
            ></img>
          </Zoom>
          <div className="justify-content-center">Click on image to zoom in </div>
          </div>
          <h1 className="mt-4"></h1>
           <ul style ={{color : "black"}}><li><p>{description}</p></li>
           </ul>
          </div>
        </div>
       
       </div>
      </div>
    </div>
  );
}
