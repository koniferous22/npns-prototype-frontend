// TODO: HOC, that based on current theme will render component
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	theme: state.global.theme
})

const ThemeSelector = props => {
	return props[props.theme]
}

export default connect(mapStateToProps)(ThemeSelector)