// @flow
import * as React from 'react'
import {Text, ScrollView, StyleSheet} from 'react-native'
import {sendEmail} from '../../../components/send-email'
import {Cell, Section, TableView, SelectableCell} from '@frogpond/tableview'
import moment from 'moment'
import * as c from '@frogpond/colors'
import type {JobType} from './types'
import glamorous from 'glamorous-native'
import {ShareButton} from '../../../components/nav-buttons'
import {shareJob} from './lib'
import {entities} from '@frogpond/html-lib'

const styles = StyleSheet.create({
	lastUpdated: {
		paddingBottom: 20,
	},
	footer: {
		fontSize: 10,
		color: c.iosDisabledText,
		textAlign: 'center',
	},
})

const Title = glamorous.text({
	fontSize: 36,
	textAlign: 'center',
	marginHorizontal: 18,
	marginVertical: 10,
})

function Information({job}: {job: JobType}) {
	const office = job.office ? (
		<Cell cellStyle="LeftDetail" detail="Office" title={job.office} />
	) : null

	let contactName = job.contactName || job.contactEmail
	const contact = contactName ? (
		<Cell
			accessory={job.contactEmail ? 'DisclosureIndicator' : undefined}
			cellStyle="LeftDetail"
			detail="Contact"
			onPress={() =>
				job.contactEmail
					? sendEmail({to: [job.contactEmail], subject: job.title, body: ''})
					: null
			}
			title={contactName}
		/>
	) : null

	const ending = job.hoursPerWeek === 'Full-time' ? '' : ' hrs/week'
	const hours = job.hoursPerWeek ? (
		<Cell
			cellStyle="LeftDetail"
			detail="Hours"
			title={job.hoursPerWeek + ending}
		/>
	) : null

	const amount = job.timeOfHours ? (
		<Cell cellStyle="LeftDetail" detail="Time of Day" title={job.timeOfHours} />
	) : null

	const category = job.type ? (
		<Cell cellStyle="LeftDetail" detail="Category" title={job.type} />
	) : null

	return (
		<Section header="INFORMATION">
			{office}
			{contact}
			{hours}
			{amount}
			{category}
		</Section>
	)
}

function Description({job}: {job: JobType}) {
	return job.description ? (
		<Section header="DESCRIPTION">
			<SelectableCell text={entities.decode(job.description)} />
		</Section>
	) : null
}

function Skills({job}: {job: JobType}) {
	return job.skills ? (
		<Section header="SKILLS">
			<SelectableCell text={entities.decode(job.skills)} />
		</Section>
	) : null
}

function Comments({job}: {job: JobType}) {
	return job.comments ? (
		<Section header="COMMENTS">
			<SelectableCell text={entities.decode(job.comments)} />
		</Section>
	) : null
}

function LastUpdated({when}: {when: string}) {
	return when ? (
		<Text selectable={true} style={[styles.footer, styles.lastUpdated]}>
			Last updated: {moment(when, 'YYYY/MM/DD').calendar()}
			{'\n'}
			Powered by St. Olaf Student Employment job postings
		</Text>
	) : null
}

type Props = {
	navigation: {state: {params: {job: JobType}}},
}

export class JobDetailView extends React.PureComponent<Props> {
	static navigationOptions = ({navigation}: any) => {
		const {job} = navigation.state.params
		return {
			title: job.title,
			headerRight: <ShareButton onPress={() => shareJob(job)} />,
		}
	}

	render() {
		const job = this.props.navigation.state.params.job

		return (
			<ScrollView>
				<Title selectable={true}>{job.title}</Title>
				<TableView>
					<Information job={job} />
					<Description job={job} />
					<Skills job={job} />
					<Comments job={job} />
				</TableView>
				<LastUpdated when={job.lastModified} />
			</ScrollView>
		)
	}
}
