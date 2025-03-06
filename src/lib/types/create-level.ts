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

	videoUrl: string
	workshopUrl: string
	description: string

	tiles: number | null
	minBPM: number | null
	maxBPM: number | null
	expectedDifficulty: number | null

	limits: {
		neoCosmos: boolean
		seizure: boolean
	}

	thumbnail?: { file: File; url: string }
}

export type PartialLevelCreatePayload = PartialKeys<LevelCreatePayload, 'music'>

export type UploadState =
	| { status: 'idle' }
	| { status: 'uploading'; progress: number; abort: AbortController }
	| { status: 'complete'; fileId: string; fileName: string }
	| { status: 'fail'; error: Error }

export type LevelUploadInfo = {
	url: string
	s3ObjectKey: string
}
