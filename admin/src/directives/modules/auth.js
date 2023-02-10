/**
 * v-auth
 * 按钮权限指令
 */

import { authStore } from '@/store/modules/authStore'

const auth = {
	mounted(el, binding) {
		const { value } = binding
		const state = authStore();
		// const currentPageRoles = state.authButtonList[state.routeName] || []
		const currentPageRoles = state.authButtonList['roleId'] || []
		if (value) {
			if (!currentPageRoles.includes(value)) el.remove()
		}

	},
}

export default auth;