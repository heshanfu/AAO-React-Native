// @flow

import {version} from '../../package.json'

export const GH_BASE_URL = 'https://github.com/StoDevX/AAO-React-Native'
export const GH_NEW_ISSUE_URL = `${GH_BASE_URL}/issues/new`

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_ALPHA = version.includes('-alpha.')
export const IS_BETA = version.includes('-beta.')
export const IS_PRE = version.includes('-pre.')
export const IS_RC = version.includes('-rc.')
export const IS_DEBUG = IS_ALPHA || IS_BETA || IS_PRE || IS_RC

const GOOGLE_ANALYTICS_PRODUCTION_ID = 'UA-90234209-2'
const GOOGLE_ANALYTICS_DEVELOPMENT_ID = 'UA-90234209-1'

export const GOOGLE_ANALYTICS_ID = IS_PRODUCTION
	? GOOGLE_ANALYTICS_PRODUCTION_ID
	: GOOGLE_ANALYTICS_DEVELOPMENT_ID
