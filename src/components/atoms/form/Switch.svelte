<script lang="ts">
  export let checked = false;
</script>

<label class="switch" class:checked>
  <span class="switch-handle" class:checked>
    <div class="switch-handle-content">
      <svg
        class="switch-icon-check"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM9.06944 4.98809C9.33901 4.6736 9.30259 4.20012 8.98809 3.93056C8.6736 3.66099 8.20012 3.69741 7.93056 4.01191L5.45764 6.89698L4.03033 5.46967C3.73744 5.17678 3.26256 5.17678 2.96967 5.46967C2.67678 5.76256 2.67678 6.23744 2.96967 6.53033L4.58788 8.14854C5.10275 8.66341 5.94697 8.63098 6.42083 8.07814L9.06944 4.98809Z"
          fill="white"
        />
      </svg>
      <svg
        class="switch-icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM4.53033 3.46967C4.23744 3.17678 3.76256 3.17678 3.46967 3.46967C3.17678 3.76256 3.17678 4.23744 3.46967 4.53033L4.93934 6L3.46967 7.46967C3.17678 7.76256 3.17678 8.23744 3.46967 8.53033C3.76256 8.82322 4.23744 8.82322 4.53033 8.53033L6 7.06066L7.46967 8.53033C7.76256 8.82322 8.23744 8.82322 8.53033 8.53033C8.82322 8.23744 8.82322 7.76256 8.53033 7.46967L7.06066 6L8.53033 4.53033C8.82322 4.23744 8.82322 3.76256 8.53033 3.46967C8.23744 3.17678 7.76256 3.17678 7.46967 3.46967L6 4.93934L4.53033 3.46967Z"
          fill="white"
        />
      </svg>
    </div>
  </span>
  <input class="switch-checkbox" type="checkbox" bind:checked on:change />
</label>

<style lang="scss">
  .switch {
    --checkbox-color: rgba(var(--color-red), 1);

    position: relative;
    display: block;
    width: 28px;
    height: 16px;
    border-radius: 14px;
    background-color: var(--checkbox-color);
    color: var(--checkbox-color);
    user-select: none;
    transition: background-color ease 0.2s;

    &-icon,
    &-icon-check {
      position: absolute;
      top: 0;
      left: 0;
      opacity: var(--icon-opacity);
      transition: opacity ease 0.2s;
    }

    &-handle {
      position: absolute;
      top: 50%;
      left: 2px;
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 6px;
      transition: all ease 0.2s;
      transform: translateY(-50%);

      &-content {
        position: relative;
        width: 100%;
        height: 100%;
      }

      &.checked {
        left: 14px;
      }
    }

    &-checkbox {
      display: none;
    }

    &.checked {
      --checkbox-color: rgba(var(--color-blue), 1);

      .switch-icon {
        --icon-opacity: 0;
      }

      .switch-icon-check {
        --icon-opacity: 1;
      }
    }

    &:not(.checked) {
      .switch-icon {
        --icon-opacity: 1;
      }

      .switch-icon-check {
        --icon-opacity: 0;
      }
    }
  }
</style>
