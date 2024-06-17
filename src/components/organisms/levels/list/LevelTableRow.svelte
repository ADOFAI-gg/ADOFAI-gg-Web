<script lang="ts">
  import DifficultyIcon from '@/components/atoms/asset/DifficultyIcon.svelte';
  import Icon from '@/components/atoms/asset/Icon.svelte';
  import TableCell from '@/components/atoms/table/TableCell.svelte';
  import TooltippedTagIcon from '@/components/molecules/levels/TooltippedTagIcon.svelte';
  import type { Level } from '@/types';
  import type { VirtualItem } from '@tanstack/svelte-virtual';

  export let item: VirtualItem;
  export let level: Level;

  //   let el: HTMLTableRowElement;

  //   $: {
  //     if (el) $virtualizer.measureElement(el);
  //   }
</script>

<tr data-index={item.index} class="row" style="height: {item.size}px;">
  <TableCell
    style="color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
          font-size: 16px;
          font-family: var(--font-mono);"
  >
    <div class="row-border"></div>
    {level.id}
  </TableCell>
  <TableCell>
    <DifficultyIcon difficulty={level.difficulty} size={28} censored={level.censored} />
  </TableCell>

  <TableCell leftSideBorder>
    <a href="/levels/{level.id}">{level.title}</a>
  </TableCell>

  <!-- <td leftSideBorder>{item.music.name}</td> -->

  <TableCell leftSideBorder>{level.music.artists.map((x) => x.name).join(' & ')}</TableCell>

  <TableCell leftSideBorder>{level.creators.map((x) => x.name).join(' & ')}</TableCell>

  <TableCell leftSideBorder>
    {level.music.minBpm}
    {#if level.music.minBpm !== level.music.maxBpm}
      - {level.music.maxBpm}
    {/if}
  </TableCell>

  <TableCell leftSideBorder>
    {level.tiles.toLocaleString('en-US')}
  </TableCell>

  <TableCell leftSideBorder>
    <div class="tags">
      {#each level.tags.slice(0, 5) as tag (tag.id)}
        {#if tag.id !== 4}
          <TooltippedTagIcon tag={tag.id} size={20} />
        {/if}
      {/each}

      {#if level.tags.length > 5}
        <div class="tags__and-more">
          +{level.tags.length - 5}
        </div>
      {/if}
    </div>
  </TableCell>

  <TableCell leftSideBorder>
    <div class="warnings">
      <div class="warnings__item" class:active={level.epilepsyWarning} />
      <div class="warnings__item" class:active={!!level.tags.find((x) => x.id === 4)} />
    </div>
  </TableCell>

  <TableCell>
    <div class="links">
      <a href={level.download} target="_blank" rel="noreferrer">
        <Icon icon="download" size={16} alt="Download Icon" />
      </a>

      <a href={level.workshop} target="_blank" rel="noreferrer">
        <Icon
          icon="steam"
          style={level.workshop?.trim() ? 'color: white;' : 'color: rgba(255, 255, 255, 0.2)'}
          size={16}
          alt="Steam Workshop Icon"
        />
      </a>

      <!-- <a href="adofaigg://level/{item.id}">
          <Icon icon="playFilled" size={16} alt="Play On ADOFAI Icon" />
        </a> -->

      <a href={level.video}>
        <Icon icon="playFilled" size={16} alt="Video Icon" />
      </a>
    </div>
  </TableCell>
</tr>

<style lang="scss">
  .row {
    position: relative;
    width: 100%;
  }

  .row-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
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

  .links {
    display: flex;
    gap: 16px;
  }
</style>
