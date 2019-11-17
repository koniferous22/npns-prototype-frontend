import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants';

const BuzzfeedContentDiv = styled.div`
	grid-area: ${props => props.sidebar ? 'content' : 'page'};
	${props => props.sidebar ? `
			margin-left: 10rem;
		` : `
			margin-left: auto;
			margin-right: auto;
		`}
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		margin-left: 0;
		margin-right: 0;
		margin-top: 0px;
		@-moz-document url-prefix() {
			margin-top: 50px;
		}
	}
	margin-top: 20px;
	padding: 10px;
	font-family: Verdana, sans-serif;
	textarea {
		border-radius: 5px;
	}
	form {
		border-radius: 10px;
		padding: 7px;
		background-color: rgba(67, 0, 50, 0.35);
		margin: 10px;
		button {
			margin: 10px;
		}
	}
`

const TryhardContentDiv = props => <div {...props}/>

const ContentDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedContentDiv {...props} />} 
		tryhard={<TryhardContentDiv {...props} />} 
	/>

export default ContentDiv