import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCart } from "../../features/shopSlice";

function OrderSummary() {
	const [deliveryType, setDeliveryType] = useState(null);
	const [promoCode, setPromoCode] = useState(null);
	const cart = useSelector(selectCart);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		let items = 0;
		let price = 0;

		cart.forEach((item) => {
			items += item.qty;
			price += item.qty * item.price;
		});

		setTotalPrice(price);
		setTotalItems(items);
	}, [cart, totalPrice, setTotalPrice, totalItems, setTotalItems]);

	return (
		<StyledCol sm={10} md={5} lg={4} className="cartPage__right">
			<h3 className="mb-0 summary__title text-center">
				Order Summary
				<div className="underline"></div>
			</h3>

			<div className="summary__totals p-3 mt-2 mb-4">
				<div className="top flex-btw ">
					<p className="mb-0 total__tag">Total Items: </p>
					<h5 className="mb-0 total__value"> {totalItems} </h5>
				</div>
				<div className="bottom flex-btw mt-3">
					<p className="mb-0 total__tag">Total Amount: </p>
					<h5 className="mb-0 total__value fw-bold">
						$ {totalPrice.toLocaleString()}{" "}
					</h5>
				</div>
			</div>
			<div className="summary__deliveries">
				<h5 className=" mb-0 delivery__title text-center">
					Additional Information
					<div className="underline"></div>
				</h5>
			</div>
			<div className="delivery__wrap mb-4 mt-3">
				<label className="w-100">
					<p className="my-2 delivery__label">Select Delivery Type</p>
					<select
						className=" px-2 py-1"
						value={deliveryType}
						onChange={(e) => {
							setDeliveryType(e.target.value);
						}}>
						<option value="grapefruit">Standard - $ 200</option>
						<option value="lime">Premium - $ 400</option>
					</select>
				</label>
			</div>

			<div className="promotions__wrap">
				<p className="mb-2 promotions__label">Promo Code (optional)</p>
				<input
					type="text"
					className="promo__input px-2"
					value={promoCode}
					onChange={(e) => setPromoCode(e.target.value)}
				/>
				<button className="promo__apply d-block my-3 ">Apply</button>
			</div>
			<div className="underline-full"></div>
			<div className="summary__checkout flex-btw p-3 mt-2">
				<p className="total__tag mb-0 ">Total</p>

				<h5 className="total__value mb-0 fw-bold">
					$ {totalPrice.toLocaleString()}
				</h5>
			</div>
			<button className="checkout__btn w-75 mx-auto mt-3">Checkout</button>
		</StyledCol>
	);
}

export default OrderSummary;

const StyledCol = styled(Col)`
	display: flex;
	flex-direction: column;
	background: #fff;
	padding: 20px;
	border-radius: 7px;

	.promo__input {
		border: 1px solid var(--pry-clr-2);
		transition: var(--sht-trans);

		:focus {
			border: 1px solid var(--pry-clr-2);
			outline-width: 0;
		}
	}

	.total__tag {
		font-size: 15px;
		white-space: nowrap;
	}

	.total__value {
		white-space: nowrap;
	}

	.promo__apply,
	.checkout__btn {
		border: 1px solid var(--pry-clr-2);
		padding: 5px 20px;
		background: transparent;
		color: var(--pry-clr-1);
		border-radius: 3px;
		transition: var(--sht-trans);

		:hover {
			background: var(--pry-clr-1);
			color: #fff;
		}
	}
`;
