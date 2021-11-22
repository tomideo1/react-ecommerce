import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	requestFailure,
	requestProcessing,
	setProducts,
} from "../features/shopSlice";
import ProductComponent from "./ProductComponent";
import styled from "styled-components";
import axios from "axios";

const ProductListing = () => {
	const dispatch = useDispatch();

	const fetchProducts = async () => {
		dispatch(requestProcessing());
		const response = await axios
			.get("https://fakestoreapi.com/products")
			.catch((err) => {
				dispatch(requestFailure(err.message));
			});
		dispatch(setProducts(response?.data));
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<Container className="flexed">
			<ProductComponent />
		</Container>
	);
};

export default ProductListing;

const Container = styled.div`
	min-height: calc(100vh - 49px);
`;
