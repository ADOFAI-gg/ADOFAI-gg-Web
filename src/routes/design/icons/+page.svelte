<script lang="ts">
  import _ from 'lodash';
  import MainSectionTitle from '@atoms/common/MainSectionTitle.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import axios from 'axios';
  import Icon from '@atoms/asset/Icon.svelte';
  import Tooltip from '@atoms/common/Tooltip.svelte';

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

<div class="h-nav" />

<PageContainer>
  {#await loadPromise then data}
    {#each data as group}
      <div class="mt-[16px]">
        <MainSectionTitle title={group.directory} />
        <div class="flex flex-wrap gap-4">
          {#each group.files as file}
            <div class="flex flex-col items-center">
              <Icon namespace={group.directory} icon={file?.file ?? ''} size={32} alt="." />
              <div class="mt-2">{file?.file}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  {/await}
</PageContainer>
