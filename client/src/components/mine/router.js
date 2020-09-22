export default {
	path: '/mine',
	name: 'mine',
	meta: {
			name: 'Mine',
			auth: true,
	},
	component: () => import('./index.vue')
}