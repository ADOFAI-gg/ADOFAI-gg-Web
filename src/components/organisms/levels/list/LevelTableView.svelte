<script lang="ts">
  import type { Level } from '@/types';
  import VirtualizedInfiniteScroll from '@adofai-gg/svelte-virtualized-infinite-scroll';
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { browser } from '$app/environment';
  import Table from '@atoms/table/Table.svelte';
  import { default as Cell } from '@atoms/table/TableCell.svelte';

  export let levels: Level[];

  export let total: number;

  let swwidth = 0;
</script>

{#if browser}
  <Table style="width: {1582 + swwidth + 24}px;">
    <colgroup>
      <col width="56" />
      <col width="40" />
      <col width="450" />
      <!-- <col width="450" /> -->
      <col width="250" />
      <col width="250" />
      <col width="144" />
      <col width="120" />
      <col width="180" />
      <col style="min-width: {swwidth + 24}px;" />
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

        <th class="auto-fit">
          <div bind:clientWidth={swwidth}>
            <Translation key="SEARCH_TABLE_COL_WARNINGS" />
          </div>
        </th>

        <th>
          <Translation key="SEARCH_TABLE_COL_LINKS" />
        </th>
      </tr>
    </thead>

    <VirtualizedInfiniteScroll on:more table data={levels} let:item {total} scrollContainer="#root">
      <Cell
        style="color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
          font-size: 16px;
          font-family: var(--font-mono);">{item.id}</Cell
      >

      <Cell>
        <DifficultyIcon difficulty={item.difficulty} size={28} />
      </Cell>

      <Cell leftSideBorder>
        <a href="/levels/{item.id}">{item.title}</a>
      </Cell>

      <!-- <td leftSideBorder>{item.music.name}</td> -->

      <Cell leftSideBorder>{item.music.artists.map((x) => x.name).join(' & ')}</Cell>

      <Cell leftSideBorder>{item.creators.map((x) => x.name).join(' & ')}</Cell>

      <Cell leftSideBorder>
        {item.music.minBpm}
        {#if item.music.minBpm !== item.music.maxBpm}
          - {item.music.maxBpm}
        {/if}
      </Cell>

      <Cell leftSideBorder>
        {item.tiles.toLocaleString('en-US')}
      </Cell>

      <Cell leftSideBorder>
        <div class="tags">
          {#each item.tags.slice(0, 5) as tag (tag.id)}
            {#if tag.id !== 4}
              <Icon
                disableFade
                icon={`${tag.id}`}
                namespace="tagIcons"
                size={20}
                alt="{tag.name} tag icon"
              />
            {/if}
          {/each}

          {#if item.tags.length > 5}
            <div class="and-more">
              +{item.tags.length - 5}
            </div>
          {/if}
        </div>
      </Cell>

      <Cell leftSideBorder>
        <div class="warnings">
          <div class={item.epilepsyWarning ? 'active' : ''} />
          <div class={item.tags.find((x) => x.id === 4) ? 'active' : ''} />
        </div>
      </Cell>

      <Cell>
        <div class="links">
          <a href={item.download} target="_blank">
            <Icon disableFade icon="download" size={16} alt="Download Icon" />
          </a>

          <a href={item.workshop} target="_blank">
            <Icon
              icon="steam"
              style={item.workshop ? 'color: white;' : 'color: rgba(255, 255, 255, 0.2)'}
              size={16}
              alt="Steam Workshop Icon"
            />
          </a>

          <!-- <a href="adofaigg://level/{item.id}">
          <Icon icon="playFilled" size={16} alt="Play On ADOFAI Icon" />
        </a> -->

          <a href={item.video}>
            <Icon disableFade icon="playFilled" size={16} alt="Video Icon" />
          </a>
        </div>
      </Cell>
    </VirtualizedInfiniteScroll>
  </Table>
{/if}

<style lang="scss">
  .tags {
    display: flex;
    gap: 4px;
    align-items: center;

    .and-more {
      padding: 2px 4px;
      border-radius: 100em;
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: 400;
      font-size: 13px;
      font-family: var(--font-mono);
      line-height: 12px;
    }
  }

  .warnings {
    display: flex;
    gap: 24px;

    div {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-radius: 100em;
    }

    div.active {
      border: none;
      background-color: rgba(var(--color-red), 1);
    }
  }

  th.auto-fit {
    position: relative;

    & > div {
      position: absolute;
      top: 0;
      left: 0;
      width: fit-content;
    }
  }

  .links {
    display: flex;
    gap: 16px;
  }
</style>
