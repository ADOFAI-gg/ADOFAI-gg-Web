<script lang="ts">
  import Translation from '@/components/utils/Translation.svelte';
  import Button from '@atoms/interaction/Button.svelte';
  import Google from 'svelte-icons/fa/FaGoogle.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { StringTranslationKey } from '@/utils/i18n';

  const dispatch = createEventDispatcher();

  export let labelKey: StringTranslationKey = 'sign-in:more-options';
</script>

<div class="oauth2-container">
  <div class="oauth2-header">
    <div class="oauth2-line" />
    <p>
      <Translation key={labelKey} />
    </p>
    <div class="oauth2-line" />
  </div>
  <div class="oauth2-options">
    <Button type="authAction" on:click={() => dispatch('googleSignup')}>
      <Google />
    </Button>
    <Button type="authAction" on:click={() => dispatch('discordSignup')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"
        ><path
          fill="#fff"
          d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
        /></svg
      >
    </Button>
  </div>
</div>

<style lang="scss">
  .oauth2-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
  }

  .oauth2-header {
    display: flex;
    gap: 12px;
    align-items: center;
    align-self: stretch;

    > p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      line-height: 1.2;
      text-align: center;
    }
  }

  .oauth2-line {
    flex-grow: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.4);
  }

  .oauth2-options {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    align-self: stretch;
  }

  .oauth2-options :global(svg) {
    width: 20px;
    height: 20px;
  }
</style>
