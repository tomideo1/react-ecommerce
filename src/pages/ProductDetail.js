import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import {
	addToCart,
	removeSelectedProduct,
	requestFailure,
	requestProcessing,
	selectedProduct,
} from "../features/shopSlice";
import { AddShoppingCartRounded } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { FadingCircle } from "better-react-spinkit";

function ProductDetail({ color }) {
	const { productId } = useParams();
	const dispatch = useDispatch();
	const { singleProduct, errorMsg, isLoading } = useSelector(
		(state) => state.shop
	);

	const fetchProductDetail = async () => {
		dispatch(requestProcessing());
		const response = await axios
			.get(`https://fakestoreapi.com/products/${productId}`)
			.catch((err) => {
				dispatch(requestFailure(err.message));
			});
		dispatch(selectedProduct(response.data));
	};

	useEffect(() => {
		fetchProductDetail();

		return () => {
			dispatch(removeSelectedProduct());
		};
	}, [productId]);

	return (
		<Container>
			<Row>
				<Section className="flexed flex-wrap py-5 mt-5">
					{isLoading ? (
						<div className="flex-col">
							<FadingCircle size={100} color="#ddd" />
							<h3 className="mt-5 mb-0 py-3 text-white text-center">
								Please Wait
							</h3>
						</div>
					) : errorMsg ? (
						<h3 className="mb-0 text-white">{errorMsg} ... Please Refresh </h3>
					) : (
						<>
							<Col
								sm={10}
								md={5}
								lg={5}
								className="singleProduct__imgWrap py-2 px-3 d-flex flex-column justify-content-between">
								<img
									src={singleProduct.image}
									alt={singleProduct.title}
									className="mx-auto m-2 singleProduct__img"
								/>
								<div className="singleProduct__bottom mt-3">
									<p className="mb-0 single__product-title mr-2">
										{singleProduct.title}{" "}
									</p>

									<p className="mb-0 single__product-price">
										$ {singleProduct.price}
									</p>
								</div>
							</Col>
							<Col
								sm={10}
								md={5}
								lg={5}
								className="singleProduct__details p-2 d-flex flex-column">
								<p className="mb-3 px-3 text-center flexed text-capitalize singleProduct-description">
									{singleProduct.description}{" "}
								</p>

								<div className="flexed singleProduct__bottomRight mx-auto p-2">
									<p className="singleProduct-category mb-0 text-capitalize">
										{singleProduct.category}
									</p>
									<IconButton
										onClick={() => {
											dispatch(addToCart(singleProduct));
										}}>
										<AddShoppingCartRounded className="singleProduct__cart" />
									</IconButton>
								</div>
							</Col>
						</>
					)}
				</Section>
			</Row>
		</Container>
	);
}

export default ProductDetail;

const Section = styled.section`
	min-height: 70vh;
	background: var(--pry-clr-2);
	.singleProduct__imgWrap,
	.singleProduct__details {
		background: #fff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
	}

	.singleProduct__img {
		width: 50%;
	}

	.singleProduct__bottom {
		background: #ddd;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 5px;

		.single__product-title {
			font-weight: bold;
			font-size: 15px;
			text-align: center;
		}
	}
	.single__product-price,
	.singleProduct-category {
		background: var(--pry-clr-1);
		padding: 5px 7px;
		color: #fff;
		font-weight: 500;
		border-radius: 4px;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
	}

	.single__product-price {
		white-space: nowrap;
	}

	.singleProduct__details {
		justify-content: space-evenly;

		.singleProduct__bottomRight {
			min-width: 50%;
			background: #ddd;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
		}
		.singleProduct-description {
			line-height: 1.5rem;
			font-size: 14px;
		}

		.singleProduct__cart {
			color: var(--pry-clr-1);
			font-size: 20px;
		}
	}

	@media (min-width: 768px) {
		.singleProduct__details,
		.singleProduct__imgWrap {
			height: 100%;
		}
	}

	@media (max-width: 768px) {
		.singleProduct__imgWrap {
			flex: 1;
		}
	}
`;
