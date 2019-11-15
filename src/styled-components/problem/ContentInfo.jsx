import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedContentInfo = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-content: center;
	margin: 0px 2px 2px 2px;
	border-bottom: 1px solid grey;
	h3 {
		flex-grow: 1;
		margin-left: 0px;
		margin-bottom: 0px;
	}
	* {
		margin-left: 7px;
	}

`
	
const TryhardContentInfo = props => <div {...props}/>

const ContentInfo = props => <ThemeSelector 
		buzzfeed={<BuzzfeedContentInfo {...props} />} 
		tryhard={<TryhardContentInfo {...props} />} 
	/>

export default ContentInfo