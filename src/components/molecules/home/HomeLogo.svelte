<script lang="ts">
  import HomeLogoImage from '@atoms/home/HomeLogoImage.svelte';
  import Translation from '@/components/utils/Translation.svelte';

  const forumLinkReplacer = (html: string) => {
    return html.replace(
      /<forumLink>(.+?)<\/forumLink>/g,
      `<a
        class="forum-link"
        href="https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit#gid=1848316468"
        rel="noreferrer"
        target="_blank"
      >
        $1
      </a>`
    );
  };
</script>

<div class="home-logo">
  <HomeLogoImage />

  <span class="description">
    <Translation key="HOME_HERO_DESCRIPTION" htmlReplacer={forumLinkReplacer} />
  </span>
</div>

<style lang="scss">
  .home-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;

    .description {
      font-weight: 500;
      font-size: 24px;

      :global(a.forum-link) {
        color: rgba(var(--color-yellow), 1);

        &:hover,
        &:focus {
          text-decoration-line: underline;
        }
      }
    }
  }
</style>
