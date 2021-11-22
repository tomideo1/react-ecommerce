import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { closeToast } from "../features/shopSlice";
import { Toast } from "react-bootstrap";

function CartAlert() {
	const dispatch = useDispatch();
	const { itemAdded } = useSelector((state) => state.shop);

	return (
		<ToastWrapper className="mx-auto flexed">
			<Toast
				className=""
				onClose={() => {
					dispatch(closeToast());
				}}
				show={itemAdded}
				delay={3000}
				autohide={true}>
				<Toast.Body className="toast__body">
					<p className="mb-0 cart__alert">Item has been added to cart. </p>
				</Toast.Body>
			</Toast>
		</ToastWrapper>
	);
}

export default CartAlert;

const ToastWrapper = styled.div`
	position: absolute;
	top: 20px;
	z-index: 100;
	background: rgba(0, 0, 0, 0.25);
	padding: 5px 0;
	transition: var(--sht-trans);

	.toast__body {
		background: #fff !important;
	}

	.cart__alert {
		font-size: 18px;
	}
`;
