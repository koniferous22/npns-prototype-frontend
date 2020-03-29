import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import StyledThemeDropdown from '../../styled-components/header/ThemeDropdown'
import ThemeDropdownEntries from '../../styled-components/header/ThemeDropdownEntries'

import { hideThemes, showThemes, setTheme } from '../../store/global'

const ThemeDrowdown = () => {
	const dispatch = useDispatch()
	const displayed = useSelector(state => state.global.themesDisplayed)
	const currentThemeFromState = useSelector(state => state.global.theme)
	const themes = useSelector(state => state.global.themes || {})
	
	useEffect(() => {
		return () => {
			dispatch(hideThemes())
		};
	}, [dispatch]);

	const themeDivs = (
		<ThemeDropdownEntries>
			{Object.keys(themes).map((theme, index) => (
				<li key={index}>
					<div onClick={() => dispatch(setTheme(theme))}>{themes[theme].label}</div>
				</li>
			))}
		</ThemeDropdownEntries>
	)
	const currentTheme = themes[currentThemeFromState];
	return (
		<div>
			<StyledThemeDropdown className="button" onClick={() => displayed ? dispatch(hideThemes()) : dispatch(showThemes())}>{currentTheme.textWhenSelected || currentTheme.label}</StyledThemeDropdown>
			{displayed && themeDivs}
		</div>
	)
}

export default ThemeDrowdown
