import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./components/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Navigation from "./components/Navigation";
import Cart from "./pages/cart/Cart";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div className="app">
			<Router>
				<Navigation />
				<Switch>
					<Route exact path="/" component={ProductListing} />
					<Route exact path="/product/:productId" component={ProductDetail} />
					<Route exact path="/cart" component={Cart} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
