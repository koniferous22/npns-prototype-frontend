import React from 'react';
import { connect } from 'react-redux'

import ThemeDropdownEntries from '../../styled-components/header/ThemeDropdownEntries'

import { globalActions } from '../../actions/global'

const mapStateToProps = state => ({
	displayed: state.global.themesDisplayed,
	currentTheme: state.global.theme,
	themes: state.global.themes || {}
})

const mapDispatchToProps = dispatch => {
	return {
		show: () => dispatch(globalActions.showThemes()),
		hide: () => dispatch(globalActions.hideThemes()),
		setTheme: (theme) => dispatch(globalActions.setTheme(theme))
	}
}

class ThemeDrowdown extends React.Component {

	componentWillUnmount() {
		if (this.props.displayed) {
			this.props.hide()
		}
	}
	render() {
		const themeDivs = (
			<ThemeDropdownEntries>
				{Object.keys(this.props.themes).map((theme, index) => (
					<li key={index}>
						<div onClick={() => this.props.setTheme(theme)}>{this.props.themes[theme].label}</div>
					</li>
				))}
			</ThemeDropdownEntries>
		)
		const currentTheme = this.props.themes[this.props.currentTheme];
		return (
			<div  className="dropdown" >
				<div className="button" onClick={this.props.displayed ? this.props.hide : this.props.show}>{currentTheme.textWhenSelected || currentTheme.label}</div>
				{ this.props.displayed && themeDivs}
			</div>
		)
	}
}

export default  connect(mapStateToProps, mapDispatchToProps)(ThemeDrowdown)