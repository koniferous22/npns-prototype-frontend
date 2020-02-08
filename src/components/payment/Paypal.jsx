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
		script.src = "https://www.paypal.com/sdk/js?client-id=AdG3BJ7WeAy-ORGh_KuGTAWwEe9FG0KlIHvXgm-UUns7ZMs_Uan-kOgtFEnzSTeBUUAm5JOjTUEngcsL"
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
											currency_code: 'USD',
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
				<span>{product.value}</span>
			</div>
		);
	}

	return (
		<div>
			{error && <div>Uh oh, an error occurred! {error.message}</div>}
			<h2>
				You are about to boost the problem for ${product.value}.
			</h2>
			<div ref={paypalRef} />
		</div>
	);
}

export default Paypal
