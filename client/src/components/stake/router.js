export default {
	path: '/stake',
	name: 'stake',
	meta: {
			name: 'Stake',
			auth: true,
	},
	component: () => import('./index.vue')
}