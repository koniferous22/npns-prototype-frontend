import React from 'react';

import calculatePayment from '../../payment/calculatePayment'
import './graph.css'

class Transparency extends React.Component {
	render() {
		const boost = this.props.boost
		const payment = calculatePayment(boost)
		const barWidth = 500 
		return(
			<div>
				<p>{payment.boost} € boost will require {payment.requiredPayment} €, out of which {payment.paypalSumFee} € goes to PayPal and {payment.ourFee} € goes to NPNS.</p> 
				<p>The rest goes to the problem solver, they will pay no more fees.</p>
				<p>If your PayPal account is registered in EEA country, PayPal will get slightly smaller cut.</p>
				<div className="bar" style={{"width": barWidth}}>
					<section id="red" style={{"width": barWidth*payment.boost/payment.requiredPayment}}>Boost</section>
					<section id="blue" style={{"width": barWidth*payment.paypalSumFee/payment.requiredPayment}}>PayPal</section>
					<section id="yellow" style={{"width": barWidth*payment.ourFee/payment.requiredPayment}}>NPNS</section>
				</div>
</div>
		)
	}
}

export default Transparency
