import React from 'react';
import HomepageLabel from './HomepageLabel'

import QueueSidebar from '../queue/QueueSidebar'

export default class Homepage extends React.Component {
  	render() {
	    return (
	    	<div>
	    		<QueueSidebar />
       			<p>Homepage friend</p>
       			<HomepageLabel />
       		</div>
    	);
  	}
}
