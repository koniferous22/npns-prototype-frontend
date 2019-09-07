import React from "react"
import { Route, Redirect } from "react-router-dom";


export default class PrivateRoute extends React.Component {
	constructor({verify, token, component: Component, ...rest}) {
		super({verify, token, component: Component, ...rest})
	}
	componentDidMount() {
		this.props.verify(this.props.token)		
	}
	render() {
		const { component: Component, ...rest } = this.props
		return (
			<Route
				{...rest}
				render={props => {
						return rest.loggedIn ? (
							<Component {...rest} />
						) : (
							<Redirect
								to={{
									pathname: "/login",
									state: { from: this.props.location }
								}}
							/>
						)
					}
				}
			/>
		);
	}

}