function calculatePayment(boost) {
	const numBoost = Number(boost)
	const paypalPayoutFee = numBoost*0.02
	const ourFee = 0.01 + numBoost*0.06
	const requiredPayment = (0.05 + numBoost*1.02 + ourFee)*100/94
	const paypalIncomeFee = 0.05 + requiredPayment*6/100
	const paypalSumFee = paypalIncomeFee + paypalPayoutFee
	const payment = {'boost':numBoost.toFixed(2),'ourFee':ourFee.toFixed(2),'requiredPayment':requiredPayment.toFixed(2),'paypalSumFee':paypalSumFee.toFixed(2)}

	return payment
}
/* treba domysliet zaokruhlovanie */
export default calculatePayment
