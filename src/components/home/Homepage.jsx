import React from 'react';

import QueueSidebar from '../queue/QueueSidebar'

import ContentDiv from '../../styled-components/defaults/StyledContentDiv'

export default class Homepage extends React.Component {
	render() {
		return (
			<div>
				<QueueSidebar />
				<ContentDiv sidebar>
					<p>Welcome {(this.props.user && this.props.user.username) ? this.props.user.username : 'guest'}</p>
				</ContentDiv>
			</div>
		);
	}
}
