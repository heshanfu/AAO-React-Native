// @flow
import * as React from 'react'
import {StyleSheet, View, Platform} from 'react-native'
import * as c from '@frogpond/colors'
import {type AppTheme} from '@frogpond/app-theme'
import {withTheme} from '@callstack/react-theme-provider'

const dotBarStyles = StyleSheet.create({
	diagram: {
		marginTop: 9,
		marginBottom: 8,
		flexDirection: 'column',
		alignItems: 'center',
	},
	circle: {
		height: 5,
		width: 5,
		borderRadius: 5,
	},
	line: {
		width: 1,
		flex: 1,
	},
})

function DottedBar({style, theme}: {style?: any, theme: AppTheme}) {
	let background = {backgroundColor: theme.accent}

	return (
		<View style={[dotBarStyles.diagram, style]}>
			<View style={[background, dotBarStyles.circle]} />
			<View style={[background, dotBarStyles.line]} />
			<View style={[background, dotBarStyles.circle]} />
		</View>
	)
}

const ThemedDottedBar = withTheme(DottedBar)

const solidBarStyles = StyleSheet.create({
	border: {
		width: 1.5,
		backgroundColor: c.black75Percent,
	},
})

function SolidBar({style}: {style?: any}) {
	return <View style={[solidBarStyles.border, style]} />
}

export function Bar(props: Object) {
	switch (Platform.OS) {
		case 'ios':
			return <SolidBar {...props} />
		case 'android':
			return <ThemedDottedBar {...props} />
		default:
			return <SolidBar {...props} />
	}
}
