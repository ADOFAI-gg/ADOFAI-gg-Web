<div class="skeleton-container">
  <div class="video" />

  <div class="text-container">
    <div class="text" style="width: 30%;" />
    <div class="text" style="width: 50%;" />
    <div class="text" style="width: 60%;" />
  </div>
</div>

<style lang="scss">
  .skeleton-container {
    $pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    opacity: 0.4;

    .video {
      width: 100%;
      border-radius: 5px;
      background-color: white;
      background-repeat: round;
      animation: $pulse;
      aspect-ratio: 16 / 9;
    }

    .text-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;
      width: 100%;

      .text {
        height: 32px;
        border-radius: 5px;
        background-color: white;
        animation: $pulse;
      }
    }

    @media (min-width: 768px) {
      &:last-child {
        grid-column: span 2 / span 2;
        margin: 0 25%;
      }
    }

    @media (min-width: 1024px) {
      &:last-child {
        grid-column: span 1 / span 1;
        margin: 0;
      }
    }
  }

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }
</style>
