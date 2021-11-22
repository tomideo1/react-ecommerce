import React from "react";
import { useSelector } from "react-redux";
import { selectItemAdded } from "../features/shopSlice";
import { Container, Row } from "react-bootstrap";
import FadingCircle from "better-react-spinkit/dist/FadingCircle";
import CartAlert from "./CartAlert";
import SingleProduct from "./SingleProduct";

function ProductComponent() {
	const { errorMsg, isLoading } = useSelector((state) => state.shop);
	const itemAdded = useSelector(selectItemAdded);

	return (
		<Container>
			<Row>
				{itemAdded && <CartAlert />}
				{isLoading ? (
					<div className="flex-col">
						<FadingCircle size={100} color="#ddd" />
						<h3 className="mt-5 mb-0 py-3 text-white text-center">
							Please Wait
						</h3>
					</div>
				) : errorMsg ? (
					<h3 className="mb-0 text-white text-center">
						{errorMsg} ... Please Refresh{" "}
					</h3>
				) : (
					<SingleProduct />
				)}
			</Row>
		</Container>
	);
}

export default ProductComponent;
