export default {
	path: '/',
	redirect: {
		name: 'market',
		params: { symbol: 'soveos' }
	},
	name: 'home',
	meta: {
		name: 'Home',
	},
	component: { template: '<router-view />' }
}