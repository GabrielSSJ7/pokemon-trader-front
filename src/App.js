import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/global.scss";

import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./pages/unauthorized";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  return (
    <div>
      <Router>
	<Routes>
	  <Route path="/" element={
	    <PrivateRoute>
	      <Home />
	    </PrivateRoute>
	  } />
	  <Route path="/login" element={<Login/>} />
	  <Route path="/unauthorized" element={<Unauthorized/>} />
	</Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
