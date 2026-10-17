import { api, ky, type APIMember, type APILevel } from '~/lib'
import type { APIModList } from '~/lib/types/mod'
import { error, fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { env } from '$env/dynamic/public'
import { env as privEnv } from '$env/dynamic/private'

type Profile = APIMember & {
	description: string | null
	createdAt: string
	badges: string[]
	bannerImage: string | null
	profileLinks: { kind: string; label: string; url: string }[]
}
export const load: PageServerLoad = async ({ params, fetch, parent, url }) => {
	if (!/^\d+$/.test(params.memberId)) error(404, 'Member not found')
	const response = await ky.get(api.forum(`members/${params.memberId}`), {
		fetch,
		throwHttpErrors: false
	})
	if (!response.ok) error(response.status, 'Unable to load profile')
	const profile = await response.json<Profile>()
	const amount = 6
	const offsetValue = Number(url.searchParams.get('offset'))
	const offset =
		Number.isSafeInteger(offsetValue) && offsetValue >= 0 && offsetValue <= 1000000
			? offsetValue
			: 0
	const [levels, mods] = await Promise.all([
		ky
			.get(api.forum(`members/${profile.id}/levels?amount=${amount}&offset=${offset}`), { fetch })
			.json<{ results: APILevel[]; count: number }>(),
		ky
			.get(api.forum(`members/${profile.id}/mods?limit=${amount}&offset=${offset}`), { fetch })
			.json<APIModList>()
			.catch(() => null)
	])
	return {
		profile,
		levels,
		mods,
		amount,
		offset,
		isOwner: (await parent()).currentUser?.id === profile.id,
		pageTitle: `${profile.displayName} · ADOFAI.gg`,
		noFooter: true
	}
}

export const actions: Actions = {
	default: async ({ request, params, fetch }) => {
		const me = await ky.get(api.forum('members/@me'), { fetch, throwHttpErrors: false })
		if (!me.ok || (await me.json<APIMember>()).id !== Number(params.memberId))
			return fail(403, { message: 'forbidden' })
		const form = await request.formData()
		const description = form.get('description')
		if (typeof description !== 'string' || description.length > 2048)
			return fail(400, { message: 'invalid' })
		const displayName = form.get('displayName')
		const handle = form.get('handle')
		if (
			typeof displayName !== 'string' ||
			(displayName.length > 0 && displayName.length < 2) ||
			displayName.length > 20
		)
			return fail(400, { message: 'invalid-profile' })
		if (typeof handle !== 'string' || !/^[a-z0-9_]{4,32}$/.test(handle))
			return fail(400, { message: 'invalid-handle' })
		if (!env.PUBLIC_ACCOUNT_SERVICE_URL) return fail(500, { message: 'save-error' })
		const accountServiceUrl = privEnv.INTERNAL_ACCOUNT_SERVICE_URL || env.PUBLIC_ACCOUNT_SERVICE_URL
		const handleForm = new FormData()
		handleForm.set('action', 'updateHandle')
		handleForm.set('handle', handle)
		const handleResponse = await fetch(new URL('/settings/account/action', accountServiceUrl), {
			method: 'POST',
			headers: { cookie: request.headers.get('cookie') ?? '' },
			body: handleForm
		})
		if (!handleResponse.ok) return fail(handleResponse.status, { message: 'save-error' })
		const accountForm = new FormData()
		accountForm.set(
			'data',
			JSON.stringify([{ key: 'displayName', op: 'set', value: displayName }])
		)
		for (const key of ['newAvatar', 'newBanner']) {
			const file = form.get(key)
			if (file instanceof File && file.size > 0) accountForm.set(key, file, file.name)
		}
		const accountResponse = await fetch(new URL('/api/profile', accountServiceUrl), {
			method: 'PATCH',
			headers: { cookie: request.headers.get('cookie') ?? '' },
			body: accountForm
		})
		if (!accountResponse.ok) {
			const body = (await accountResponse.json().catch(() => null)) as { message?: string } | null
			return fail(accountResponse.status, { message: body?.message ?? 'save-error' })
		}
		const response = await ky.patch(api.forum('members/@me/profile'), {
			fetch,
			json: { description },
			throwHttpErrors: false
		})
		if (!response.ok) return fail(response.status, { message: 'save-error' })
		return { saved: true }
	}
}
