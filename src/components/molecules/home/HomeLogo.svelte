<script lang="ts">
  import HomeLogoImage from '@atoms/home/HomeLogoImage.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<div class="flex items-center flex-col gap-[12px] text-center w-full">
  <HomeLogoImage />
  <span class="text-2xl font-medium">
    <Translation key="HOME_HERO_DESCRIPTION">
      <a
        data-key="forumLink"
        href="https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit#gid=1848316468"
        rel="noreferrer"
        target="_blank"
        class="text-yellow hover:underline focus:underline"
      >
        Unofficial ADOFAI Forum?
      </a>
    </Translation>
  </span>
</div>
