import { Close, Menu, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { setActiveCategory } from "../features/shopSlice";

const productCategories = [
	{ name: "All", property: "all" },
	{ name: "Men's Clothing", property: "men's clothing" },
	{ name: "Women's Clothing", property: "women's clothing" },
	{ name: "Jewellery", property: "jewelery" },
	{ name: "Electronics", property: "electronics" },
];

function Navigation() {
	const [categoryClicked, setCategoryClicked] = useState(true);
	const [cartCount, setCartCount] = useState(0);
	const dispatch = useDispatch();
	const { activeCategory, cart } = useSelector((state) => state.shop);

	useEffect(() => {
		let count = 0;
		cart.forEach((item) => {
			count += item.qty;
		});
		setCartCount(count);
	}, [cart, cartCount]);

	return (
		<Nav className="py-2 px-3 flex-btw">
			<div className="nav__left">
				<Link to="/" className="homeLink">
					<p className="mb-0 logo__text">TheShopOver!</p>
				</Link>
			</div>
			<div
				className={`${
					categoryClicked ? "toggle__sidebar" : null
				} nav__mid flexed col-lg-7 col-md`}
				categoryClicked>
				<ul className="col my-auto">
					{productCategories.map((category, id) => {
						const { name, property } = category;
						return (
							<li
								onClick={() => {
									dispatch(setActiveCategory(property));
									setCategoryClicked(!categoryClicked);
								}}
								className={`${
									activeCategory === property ? "active__property" : ""
								} mx-auto category__item`}
								key={id + 1}>
								{name}
							</li>
						);
					})}
				</ul>
			</div>
			<div className="nav__right">
				<Link to="/cart">
					<ShoppingCartOutlined className="cart__icon" />
					<span className="badge__wrap"> {cartCount} </span>
				</Link>
			</div>

			<div
				className="hamburger__container d-lg-none"
				onClick={() => setCategoryClicked(!categoryClicked)}>
				{categoryClicked ? (
					<Menu className="toggle__icon" />
				) : (
					<Close className="toggle__icon" />
				)}
			</div>
		</Nav>
	);
}

export default Navigation;

const Nav = styled.nav`
	height: 50px;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 100;
	background: #f1f7f8;
	width: 100%;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);

	.homeLink {
		text-decoration: none !important;
		color: #000;
	}

	.logo__text {
		font-family: "Cookie", sans-serif;
		font-size: 25px;
		background: var(--pry-clr-1);
		padding: 0 10px;
		color: #fff;
		letter-spacing: 0.5px;
		border-radius: 5px;
	}

	.nav__right {
		position: relative;
		margin-right: 10px;
		margin-top: 5px;

		.cart__icon {
			font-size: 25px;
			color: var(--pry-clr-1);
		}

		.badge__wrap {
			position: absolute;
			top: -5px;
			right: -10px;
			background: var(--pry-clr-2);
			font-size: 13px;
			padding: 1px 6px;
			border-radius: 50%;
			color: #fff;
		}
	}

	.nav__mid {
		margin: 0 5px;

		ul {
			display: flex;
			justify-content: space-around;
			align-items: center;

			li {
				list-style-type: none;
				font-size: 15px;
				font-weight: 500;
				cursor: pointer;
				padding: 3px 10px;
				border: 1px solid var(--pry-clr-3);
				border-radius: 5px;
				letter-spacing: 0.5px;
				transition: var(--sht-trans);

				:hover {
					background: var(--pry-clr-1);
					color: #fff;
				}
			}
		}
	}

	.hamburger__container {
		cursor: pointer;
	}

	.active__property {
		background: var(--pry-clr-1);
		color: #fff;
	}

	@media (max-width: 768px) {
		position: relative;

		.nav__right {
			margin-left: auto;
			margin-right: 20px;
		}

		.nav__mid {
			position: absolute;
			top: 49px;
			left: 0;
			min-height: calc(100vh - 49px);
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			transition: transform 0.25s linear;

			ul {
				display: flex;
				flex-direction: column;
				background: #fff;
				height: 90%;
				width: 100%;
				justify-content: space-around;
				margin-left: auto;
			}

			li {
				width: 50%;
				text-align: center;
				white-space: nowrap;
			}
		}

		.toggle__icon {
			font-size: 25px;
		}

		.toggle__sidebar {
			transform: translateX(-105%);
		}
	}
`;
