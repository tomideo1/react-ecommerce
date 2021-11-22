import React from "react";
import styled from "styled-components";

function RightNav() {
	return (
		<Div>
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
		</Div>
	);
}

export default RightNav;

const Div = styled.div`
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

	.hamburger__container {
		cursor: pointer;
	}

	.toggle__icon {
		font-size: 25px;
	}
`;
