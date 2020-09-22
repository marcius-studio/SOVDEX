import Router from '@koa/router'
const router = new Router()

import { klines } from '../api/klines/queries'
import { config } from '../api/config'

/**
 * Return klines
 * @request http://localhost:3000/?symbol=soveos&interval=5m&limit=100
 * @returns {array} => [{open, high, low, close, time}]
 */

router.get('/', async (ctx, next) => {
	let params = ctx.query || {}
	params.limit = (params.limit && params.limit <= 300) ? params.limit : 300

	if (params.symbol && params.interval) {
		ctx.body = await klines(params) || []
		return false
	}

	ctx.body = 'Endpoint ready'
})

/**
 * Default config for charts
 * @returns {object} => {markets:Array, intervals:Array}
 */

router.get('/config', async (ctx, next) => {
	ctx.body = config
})

export default router