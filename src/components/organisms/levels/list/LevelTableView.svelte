<script lang="ts">
  import type { Level } from '@/types';
  import DifficultyIcon from '@atoms/asset/DifficultyIcon.svelte';
  import Icon from '@atoms/asset/Icon.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { browser } from '$app/environment';
  import { default as Cell } from '@atoms/table/TableCell.svelte';
  import TooltippedTagIcon from '@/components/molecules/levels/TooltippedTagIcon.svelte';
  import VirtualTable from '@/components/utils/VirtualTable.svelte';
  import LoadingSpinner from '@/components/atoms/common/LoadingSpinner.svelte';

  export let levels: Level[];

  export let total: number;

  let swWidth = 0;
</script>

{#if browser}
  <VirtualTable style="width: {1582 + swWidth + 24}px;" data={levels} let:item {total} on:more>
    <colgroup slot="cols">
      <col width="56" />
      <col width="40" />
      <col width="450" />
      <!-- <col width="450" /> -->
      <col width="250" />
      <col width="250" />
      <col width="144" />
      <col width="120" />
      <col width="180" />
      <col style="min-width: {swWidth + 24}px;" />
      <col width="92" />
    </colgroup>
    <thead slot="head">
      <tr>
        <th>
          <Translation key="level-table-cols:id" />
        </th>

        <th>
          <Translation key="level-table-cols:difficulty" />
        </th>

        <th>
          <Translation key="level-table-cols:level-name" />
        </th>

        <!-- <th>
        <Translation key="SEARCH_TABLE_COL_MUSIC_NAME" />
      </th> -->

        <th>
          <Translation key="level-table-cols:artist" />
        </th>

        <th>
          <Translation key="level-table-cols:creator" />
        </th>

        <th>
          <Translation key="level-table-cols:bpm" />
        </th>

        <th>
          <Translation key="level-table-cols:tiles" />
        </th>

        <th>
          <Translation key="level-table-cols:tags" />
        </th>

        <th class="auto-fit">
          <div bind:clientWidth={swWidth}>
            <Translation key="level-table-cols:warnings" />
          </div>
        </th>

        <th>
          <Translation key="level-table-cols:links" />
        </th>
      </tr>
    </thead>

    <Cell
      style="color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
          font-size: 16px;
          font-family: var(--font-mono);">{item.id}</Cell
    >

    <Cell>
      <DifficultyIcon difficulty={item.difficulty} size={28} censored={item.censored} />
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
            <TooltippedTagIcon tag={tag.id} size={20} />
          {/if}
        {/each}

        {#if item.tags.length > 5}
          <div class="tags__and-more">
            +{item.tags.length - 5}
          </div>
        {/if}
      </div>
    </Cell>

    <Cell leftSideBorder>
      <div class="warnings">
        <div class="warnings__item" class:active={item.epilepsyWarning} />
        <div class="warnings__item" class:active={!!item.tags.find((x) => x.id === 4)} />
      </div>
    </Cell>

    <Cell>
      <div class="links">
        <a href={item.download} target="_blank" rel="noreferrer">
          <Icon icon="download" size={16} alt="Download Icon" />
        </a>

        <a href={item.workshop} target="_blank" rel="noreferrer">
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
          <Icon icon="playFilled" size={16} alt="Video Icon" />
        </a>
      </div>
    </Cell>

    <div slot="loading" class="list-loader">
      <LoadingSpinner size={48} />
    </div>
  </VirtualTable>
{/if}

<style lang="scss">
  .list-loader {
    display: flex;
    justify-content: center;
  }

  .tags {
    display: flex;
    gap: 4px;
    align-items: center;

    &__and-more {
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

    &__item {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-radius: 100em;

      &.active {
        border: none;
        background-color: rgba(var(--color-red), 1);
      }
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
