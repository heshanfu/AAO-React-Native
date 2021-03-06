// @flow
import {filterListSpecs, type FilterType} from '@frogpond/filter'
import {formatTerms} from './format-terms'

export type FilterComboType = {
	filters: FilterType[],
	description: string,
}

export function formatFilterCombo(filters: FilterType[]): FilterComboType {
	const filterCombo = filters.filter(f => f.enabled)
	const comboDescription = filterCombo
		.map(f => describeFilter(f, filters))
		.join(', ')
	return {filters: filterCombo, description: comboDescription}
}

function describeFilter(f: FilterType, filters: FilterType[]) {
	switch (f.key) {
		case 'level': {
			const levelFilter = filterListSpecs(filters).find(f => f.key === 'level')
			const selectedLevels = levelFilter ? levelFilter.spec.selected : []
			return selectedLevels.map(level => level.title).join('/') + ' Level'
		}
		case 'spaceAvailable': {
			return 'Space Available'
		}
		case 'status': {
			return 'Open Courses'
		}
		case 'type': {
			return 'Labs Only'
		}
		case 'term': {
			const termFilter = filterListSpecs(filters).find(f => f.key === 'term')
			const selectedTerms = termFilter ? termFilter.spec.selected : []
			const terms = selectedTerms.map(t => parseInt(t.title))
			return formatTerms(terms)
		}
		case 'gereqs': {
			const geFilter = filterListSpecs(filters).find(f => f.key === 'gereqs')
			const selectedGEs = geFilter ? geFilter.spec.selected : []
			return selectedGEs.map(ge => ge.title).join('/')
		}
		case 'department': {
			const deptFilter = filterListSpecs(filters).find(
				f => f.key === 'department',
			)
			const selectedDepts = deptFilter ? deptFilter.spec.selected : []
			return selectedDepts.map(dept => dept.title).join('/')
		}
		default:
			return ''
	}
}
