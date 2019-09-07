import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		message: state.auth.message
	}
}

const HomepageLabel = connect(mapStateToProps)(({message}) => {
	return <p>{message}</p>
});

export default HomepageLabel;
