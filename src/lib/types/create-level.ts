import type { PartialKeys } from '@tanstack/virtual-core'

export type IdOrCreate<Id, Data> =
	| {
			exists: false
			data: Data
	  }
	| {
			exists: true
			id: Id
			data: Data
	  }

export type MusicIdOrCreate = IdOrCreate<
	number,
	{
		name: string
		artists: MemberIdOrCreate[]
	}
>

export type MemberIdOrCreate = IdOrCreate<
	number,
	{
		name: string
		avatarUrl: string | null
	}
>

export interface LevelCreatePayload {
	music: MusicIdOrCreate
	creators: MemberIdOrCreate[]
	appendingTitle: string
	creatorAlias: string
}

export type PartialLevelCreatePayload = PartialKeys<LevelCreatePayload, 'music'>

export type UploadState =
	| { status: 'idle' }
	| { status: 'uploading'; progress: number; abort: AbortController }
	| { status: 'complete'; fileId: string }
	| { status: 'fail'; error: Error }
