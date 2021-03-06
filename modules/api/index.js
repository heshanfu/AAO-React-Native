// @flow

import qs from 'query-string'

let root: string

export function setApiRoot(url: string) {
	root = url
}

export const API = (pth: string, query: ?Object = null) => {
	if (process.env.NODE_ENV !== 'production') {
		if (!pth.startsWith('/')) {
			throw new Error('invalid path requested from the api!')
		}
	}
	let url = root + pth
	if (query) {
		url += `?${qs.stringify(query)}`
	}
	return url
}
