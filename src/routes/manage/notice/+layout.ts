import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async () => {
	return {
		activeSidebarItem: 'notice',
		pageTitle: 'ADOFAI.gg - Manage Notices'
	}
}
