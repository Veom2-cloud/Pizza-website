import "./App.css";
import "bootstrap";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Cartscreen from "./screens/Cartscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Ordersscreen from "./screens/Ordersscreen";
import Adminscreen from "./screens/Adminscreen";
import Detailscreen from "./screens/Detailscreen";
function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Route path="/" exact component={Homescreen} />
        <Route path="/cart" exact component={Cartscreen} />
        <Route path="/register" exact component={Registerscreen} />
        <Route path="/login" exact component={Loginscreen} />
        <Route path="/orders" exact component={Ordersscreen} />
        <Route path="/admin" component={Adminscreen} />
        <Route path="/pizza/:pizzaid" component={Detailscreen} exact />
      </BrowserRouter>
    </div>
  );
}

export default App;
