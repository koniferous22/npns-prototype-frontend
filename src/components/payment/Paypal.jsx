import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { boostActions } from '../../actions/content/boost'

function Paypal({ product, problemId, token }) {
	const [paidFor, setPaidFor] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(null);
	const paypalRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		const script = document.createElement("script")
		script.src = "https://www.paypal.com/sdk/js?currency=EUR&client-id=AZ1HpdnQzwO8xVWTG-W9_DYDtNDmLR3xCH9RYY0N46r07ayHnUEGOekpgei5rwoVSpQTTDgdkxr7g5Fi"
		script.addEventListener("load", () => setLoaded(true))
		document.body.appendChild(script)
		
		if(loaded) {
			setTimeout(() => {
				window.paypal
					.Buttons({
						createOrder: (data, actions) => {
							return actions.order.create({
								purchase_units: [
									{
										description: product.description,
										amount: {
											currency_code: 'EUR',
											value: product.value,
										},
									},
								],
							});
						},
						onApprove: async (data, actions) => {
							const order = await actions.order.capture();
							setPaidFor(true);
							const boost = {value: product.value, problemId: problemId, order: order};
							dispatch(boostActions.savePaypalOrder(boost, token));
						},
						onError: err => {
							setError(err);
							console.error(err);
						},
					})
					.render(paypalRef.current);
			}, [product.description, product.value]);
		}
	})


	if (paidFor) {
		return (
			<div>
				<h2>Congratulations, you just boosted the problem!</h2>
			</div>
		);
	}

	return (
		<div>
			{error && <div>Uh oh, an error occurred! {error.message}</div>}
			<div ref={paypalRef} />
		</div>
	);
}

export default Paypal
