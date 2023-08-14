import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import Navbar from '../components/Navbar/navbar';

const ProductPage = () => {
  return (
    <Router>
      <Navbar /> 
      <Switch>
        {/* Route for the product details page */}
        <Route path="/products/:productId" component={ProductDetails} />
      </Switch>
    </Router>
  );
};

export default ProductPage;
