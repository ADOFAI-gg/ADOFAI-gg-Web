<script lang="ts">
  export let component: HTMLElement;

  export let text: string;

  let ref: HTMLElement;

  $: {
    if (ref) {
      ref.appendChild(component);
      component.innerText = text;
    }
  }
</script>

<span bind:this={ref} />
