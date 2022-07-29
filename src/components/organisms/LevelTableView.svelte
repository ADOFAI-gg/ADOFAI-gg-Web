<script lang="ts">
  import type { Level } from '@/types';
  import VirtualizedInfiniteScroll from '@adofai-gg/svelte-virtualized-infinite-scroll';
  import DifficultyIcon from '../atoms/DifficultyIcon.svelte';
  import Icon from '../atoms/Icon.svelte';

  export let levels: Level[];

  export let total: number;
</script>

<table class="table-fixed w-fit">
  <colgroup>
    <col width="56" />
    <col width="40" />
    <col width="450" />
    <col width="450" />
    <col width="250" />
    <col width="250" />
    <col width="144" />
    <col width="120" />
    <col width="154" />
    <col width="92" />
    <col width="92" />
  </colgroup>
  <thead>
    <tr>
      <th>ID</th>
      <th>Lv.</th>
      <th>Level Name</th>
      <th>Music Name</th>
      <th>Artist</th>
      <th>Creator</th>
      <th>BPM</th>
      <th>Tiles</th>
      <th>Tags</th>
      <th>EW/NSFW</th>
      <th>Links</th>
    </tr>
  </thead>
  <VirtualizedInfiniteScroll
    on:more
    table
    data={levels}
    let:item
    {total}
    scrollContainer=".simplebar-content-wrapper"
  >
    <td class="font-mono text-lg font-light text-white/80">{item.id}</td>
    <td>
      <DifficultyIcon difficulty={item.difficulty} size={28} />
    </td>
    <td class="col-border">
      <a href="/levels/{item.id}">{item.title}</a>
    </td>
    <td class="col-border">{item.music.name}</td>
    <td class="col-border">{item.music.artists.map((x) => x.name).join(' & ')}</td>
    <td class="col-border">{item.creators.map((x) => x.name).join(' & ')}</td>
    <td class="col-border">
      {item.music.minBpm}
      {#if item.music.minBpm !== item.music.maxBpm}
        - {item.music.maxBpm}
      {/if}
    </td>
    <td class="col-border">
      {item.tiles.toLocaleString('en-US')}
    </td>
    <td class="col-border">
      <div class="flex gap-[4px] items-center">
        {#each item.tags.slice(0, 5) as tag (tag.id)}
          <Icon icon={`${tag.id}`} namespace="tagIcons" size={16} />
        {/each}
        {#if item.tags.length > 5}
          <div
            class="text-[13px] leading-[12px] px-[4px] py-[2px] bg-white/20 rounded-full font-mono font-regular"
          >
            +{item.tags.length - 5}
          </div>
        {/if}
      </div>
    </td>
    <td class="col-border">
      <div class="flex gap-[24px]">
        <div
          class="w-[16px] h-[16px] rounded-full {item.epilepsyWarning ? 'bg-red' : 'bg-white'}"
        />
        <div
          class="w-[16px] h-[16px] rounded-full {item.tags.find((x) => x.id === 4)
            ? 'bg-red'
            : 'bg-white'}"
        />
      </div>
    </td>
    <td>
      <div class="flex gap-[16px]">
        <a href={item.download}>
          <Icon icon="download" size={16} />
        </a>
        <a href={item.workshop}>
          <Icon icon="steam" class={item.workshop ? 'text-white' : 'text-white/40'} size={16} />
        </a>
        <a href="adofaigg://level/{item.id}">
          <Icon icon="playFilled" size={16} />
        </a>
      </div>
    </td>
  </VirtualizedInfiniteScroll>
</table>

<style lang="scss">
  table {
    th {
      text-align: left;

      @apply font-regular text-white/60 text-md pb-[8px];
    }

    :global(tbody) {
      :global(tr) {
        @apply border-t border-white/20;

        height: 52px;

        vertical-align: middle;

        :global(td) {
          @apply text-ellipsis whitespace-nowrap overflow-hidden;
        }

        :global(td.col-border) {
          @apply border-l border-white/20 px-[12px];
        }
      }
    }
  }
</style>
