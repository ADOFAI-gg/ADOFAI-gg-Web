import type { UserListItemModel } from '@adofai-gg/ui'
import type { APILevel } from '../types'
import { convertUser } from './converter'

export const creatorListModel = (level: () => APILevel) => {
	const value = $derived.by<UserListItemModel[]>(() => {
		const l = level()

		const res = l.creators.map(
			(x) =>
				({
					type: 'user',
					data: convertUser(x, 'creator')
					// href: `/users/${x.id}`
				}) as UserListItemModel
		)

		if (!l.creatorAlias) return res

		return [
			{
				type: 'group',
				name: l.creatorAlias,
				data: res
			}
		]
	})

	return value
}

export const artistListModel = (level: () => APILevel) => {
	const value = $derived.by<UserListItemModel[]>(() => {
		const l = level()

		const res = l.music.artists.map(
			(x) =>
				({
					type: 'user',
					data: convertUser(x, 'artist')
					// href: `/users/${x.id}`
				}) as UserListItemModel
		)

		return res
	})

	return value
}
