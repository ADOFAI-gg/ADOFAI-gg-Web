import type { PersistedState } from 'runed'
import { getContext } from 'svelte'

export const SidebarCollapseContext = Symbol('collapse sidebar')
export const getSidebarCollapse = () => getContext<PersistedState<boolean>>(SidebarCollapseContext)
