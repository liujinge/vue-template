const router = [
	{
		name: 'login',
		path: '/login',
		component: () => import('pages/login.vue')
	},
  {
		name: 'index',
		path: '/',
		meta: {
			title: '首页'
		},
		component: () => import('pages/index.vue'),
		redirect: '/department',
		children: [
			{
				name: 'department',
				path: '/department',
				meta: {
					title: '部门管理'
				},
				component: () => import('pages/department.vue')
			}, {
				name: 'employee',
				path: '/employee',
				meta: {
					title: '员工管理'
				},
				component: () => import('pages/employee/employee.vue')
			}, {
				name: 'hours',
				path: '/hours',
				meta: {
					title: '工时管理'
				},
				component: () => import('pages/hours.vue')
			}, {
				name: 'permission',
				path: '/permission',
				meta: {
					title: '权限管理'
				},
				component: () => import('pages/permission.vue')
			}
		]
  }
];

export default router;