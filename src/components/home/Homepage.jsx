import React from 'react';

import QueueSidebar from '../queue/QueueSidebar'

import ContentDiv from '../../styled-components/defaults/ContentDiv'

export default class Homepage extends React.Component {
	render() {
		return (
			<div>
				<QueueSidebar />
				<ContentDiv sidebar>
					<h2>
						Welcome {(this.props.user && this.props.user.username) ? this.props.user.username : 'guest'}
					</h2>
					No clue what should be added to the homepage
				</ContentDiv>
			</div>
		);
	}
}
