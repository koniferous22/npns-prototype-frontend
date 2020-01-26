import React from 'react';

import QueueSidebar from '../queue/QueueSidebar'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import PageDiv from '../../styled-components/defaults/PageDiv'

export default class Homepage extends React.Component {
	render() {
		return (
			<PageDiv>
				<QueueSidebar />
				<ContentDiv sidebar>
					<h2>
						Welcome {(this.props.user && this.props.user.username) ? this.props.user.username : 'guest'}
					</h2>
					No clue what should be added to the homepage
				</ContentDiv>
			</PageDiv>
		)
	}
}
