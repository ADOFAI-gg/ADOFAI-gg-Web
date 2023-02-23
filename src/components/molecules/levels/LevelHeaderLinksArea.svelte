<script lang="ts">
  import Icon from '@atoms/asset/Icon.svelte';
  // import Tooltip from '@atoms/common/Tooltip.svelte';
  // import Translation from '@/components/utils/Translation.svelte';
  import type { Level } from '@/types';

  export let level: Level;
</script>

<div class="links">
  <!-- <Tooltip placement="bottom-end">
    <a slot="button" href="adofaigg://level/{level.id}">
      <Icon icon="playFilled" size={36} alt="Play button icon" />
    </a>
    <div class="p-2 text-lg font-medium">
      <Translation key="LEVEL_OPEN_IN_ADOFAI" />
    </div>
  </Tooltip> -->

  {#if level.workshop}
    <a href={level.workshop} target="_blank" rel="noreferrer">
      <Icon icon="steam" size={36} alt="Steam Workshop icon" />
    </a>
  {/if}

  {#if level.download}
    <a href={level.download} target="_blank" rel="noreferrer">
      <Icon icon="download" size={36} alt="Download icon" />
    </a>
  {/if}
</div>

<style lang="scss">
  .links {
    display: flex;
    gap: 18px;
    align-items: flex-start; /* 없으면 링크 아이콘 height이 이상해짐 */

    a {
      transition: all 0.2s ease-in-out;
      transition-property: transform;
    }

    a:hover,
    a:focus {
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      justify-content: flex-end;
    }
  }
</style>
