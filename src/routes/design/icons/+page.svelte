<script lang="ts">
  import _ from 'lodash';
  import MainSectionTitle from '@atoms/common/MainSectionTitle.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import axios from 'axios';
  import Icon from '@atoms/asset/Icon.svelte';

  const load = async () => {
    const {
      data: { tree }
    } = await axios.get(
      'https://api.github.com/repos/adofai-gg/adofai-gg-assets/git/trees/main?recursive=1'
    );

    const fileNames: string[] = tree
      .filter((x: { path: string }) => x.path.endsWith('.svg'))
      .map((x: { path: string }) => x.path);

    return Object.entries(
      _.groupBy(
        fileNames
          .map((x) => {
            const [directory, file] = x.split('/');

            if (!file) return null;

            return {
              directory,
              file: file.slice(0, file.length - 4)
            };
          })
          .filter((x) => !!x),
        'directory'
      )
    ).map(([directory, files]) => ({ directory, files }));
  };

  const loadPromise = load();
</script>

<div class="nav-spacer" />

<PageContainer>
  {#await loadPromise then data}
    {#each data as group}
      <div class="icon-group">
        <MainSectionTitle title={group.directory} />
        <div class="icon-list">
          {#each group.files as file}
            <div class="icon-list-item">
              <Icon namespace={group.directory} icon={file?.file ?? ''} size={32} alt="." />
              <div class="icon-filename">{file?.file}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  {/await}
</PageContainer>

<style lang="scss">
  .nav-spacer {
    height: var(--nav-height);
  }

  .icon-group {
    margin-top: 16px;

    .icon-list {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      .icon-list-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .icon-filename {
        margin-top: 8px;
      }
    }
  }
</style>
