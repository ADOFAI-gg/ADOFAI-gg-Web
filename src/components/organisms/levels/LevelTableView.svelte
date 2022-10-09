<script lang="ts">
  import type { Level } from '@/types';
  import VirtualizedInfiniteScroll from '@adofai-gg/svelte-virtualized-infinite-scroll';
  import DifficultyIcon from '../../atoms/DifficultyIcon.svelte';
  import Icon from '../../atoms/Icon.svelte';
  import Translation from '../../utils/Translation.svelte';

  export let levels: Level[];

  export let total: number;

  let swWidth = 0;
</script>

<table class="table-fixed w-fit">
  <colgroup>
    <col width="56" />
    <col width="40" />
    <col width="450" />
    <!-- <col width="450" /> -->
    <col width="250" />
    <col width="250" />
    <col width="144" />
    <col width="120" />
    <col width="154" />
    <col style="min-width: {swWidth + 24}px" />
    <col width="92" />
  </colgroup>
  <thead>
    <tr>
      <th>
        <Translation key="SEARCH_TABLE_COL_ID" />
      </th>
      <th>
        <Translation key="SEARCH_TABLE_COL_DIFFICULTY" />
      </th>
      <th>
        <Translation key="SEARCH_TABLE_COL_LEVEL_NAME" />
      </th>
      <!-- <th>
        <Translation key="SEARCH_TABLE_COL_MUSIC_NAME" />
      </th> -->
      <th>
        <Translation key="SEARCH_TABLE_COL_ARTIST" />
      </th>
      <th>
        <Translation key="SEARCH_TABLE_COL_CREATOR" />
      </th>
      <th>
        <Translation key="SEARCH_TABLE_COL_BPM" />
      </th>
      <th>
        <Translation key="SEARCH_TABLE_COL_TILES" />
      </th>
      <th>
        <Translation key="SEARCH_TABLE_COL_TAGS" />
      </th>
      <th class="relative">
        <div bind:clientWidth={swWidth} class="absolute w-fit left-0 top-0">
          <Translation key="SEARCH_TABLE_COL_WARNINGS" />
        </div>
      </th>
      <th>
        <Translation key="SEARCH_TABLE_COL_LINKS" />
      </th>
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
    <!-- <td class="col-border">{item.music.name}</td> -->
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
          class="w-[16px] h-[16px] rounded-full {item.epilepsyWarning
            ? 'bg-red'
            : 'border-white/40 border-[2px]'}"
        />
        <div
          class="w-[16px] h-[16px] rounded-full {item.tags.find((x) => x.id === 4)
            ? 'bg-red'
            : 'border-white/40 border-[2px]'}"
        />
      </div>
    </td>
    <td>
      <div class="flex gap-[16px]">
        <a href={item.download} target="_blank">
          <Icon icon="download" size={16} />
        </a>
        <a href={item.workshop} target="_blank">
          <Icon icon="steam" class={item.workshop ? 'text-white' : 'text-white/20'} size={16} />
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

      @apply font-regular text-white/60 text-md pb-[8px] whitespace-nowrap;
    }

    :global(tbody) {
      :global(tr) {
        @apply border-t border-white/20;

        height: 52px;

        vertical-align: middle;

        :global(td) {
          @apply text-ellipsis whitespace-nowrap overflow-hidden;
        }

        :global(a) {
          @apply transition-all;

          &:hover {
            @apply underline;
          }
        }

        :global(td.col-border) {
          @apply border-l border-white/20 px-[12px];
        }
      }
    }
  }
</style>
