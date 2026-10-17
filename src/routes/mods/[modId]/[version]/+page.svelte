<script lang="ts">
	import ModDetail from '~/lib/components/mods/ModDetail.svelte'
	import type { ModDetailData } from '~/lib/types/mod'
	let { data }: { data: ModDetailData } = $props()
</script>

<ModDetail {data} />
