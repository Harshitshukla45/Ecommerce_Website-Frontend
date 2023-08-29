import React from "react";
import './App.css';
import Header from './Header.js';
import Home from './Home.js';
import Checkout from './Checkout.js';
import Signin from "./Signin.js";
import Signup from "./Signup.js";
import Footer from "./Footer.js";
import Slide from "./Slide.js";
import { Provider } from "react-redux";
import store from './redux_react/store';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 1000);
  }, [])

  return (
    <>
      {
        data ? (
          <Provider store={store}>
            <Router>
              <div className="app">
                <Header />
                <Switch>
                  <Route path="/checkout">
                    <Checkout />
                  </Route>
                  <Route path="/signin">
                    <Signin />
                  </Route>
                  <Route path="/signup">
                    <Signup />
                  </Route>
                  <Route path="/getpone/:id">
                    <Slide />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
                <Footer />
                <ToastContainer />
              </div>
            </Router>
          </Provider>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )
      }
    </>
  );
}

export default App;
