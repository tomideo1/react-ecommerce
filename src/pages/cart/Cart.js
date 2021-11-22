import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCart } from "../../features/shopSlice";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";

function Cart() {
	const cartItems = useSelector(selectCart);

	return (
		<Container>
			<Row>
				<Section className="d-flex justify-content-center align-items-start flex-wrap py-4 mt-5">
					{cartItems.length === 0 ? (
						<h3>Your Cart is empty!</h3>
					) : (
						<div className="wrapper flexed flex-wrap col-lg-9 mx-auto px-4">
							<Col sm={8} md={5} lg={6} className="cartPage__left">
								{cartItems.map((item) => {
									return <CartItems item={item} />;
								})}
							</Col>
							<OrderSummary />
						</div>
					)}
				</Section>
			</Row>
		</Container>
	);
}

export default Cart;

const Section = styled.section`
	background: #d4d4d4;

	.wrapper {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
`;
