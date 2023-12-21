<script lang="ts">
  import FooterLink from '@atoms/footer/FooterLink.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import FooterSection from '@molecules/FooterSection.svelte';
  import Translation from '@/components/utils/Translation.svelte';
  import { PUBLIC_DISCORD_INVITE, PUBLIC_SUPPORT_MAIL } from '$env/static/public';
</script>

<footer class="footer">
  <PageContainer>
    <div class="footer__title">
      <Translation key="footer:title" />
    </div>

    <div class="footer__content-container" style="letter-spacing: -0.04em;">
      <div>
        <Translation key="footer:description" />
      </div>

      <div class="list">
        <FooterSection title="footer:section-contact">
          <FooterLink href="mailto:{PUBLIC_SUPPORT_MAIL}">
            <Translation key="footer:link-email" />
          </FooterLink>

          <FooterLink target="_blank" href={PUBLIC_DISCORD_INVITE}>
            <Translation key="footer:link-discord" />
          </FooterLink>
        </FooterSection>
      </div>

      <div class="list">
        <FooterSection title="footer:section-legal">
          <FooterLink href="/docs/legal">
            <Translation key="footer:link-legal-notice" />
          </FooterLink>

          <!-- <FooterLink href="/docs/terms">
              <Translation key="footer:link-terms" />
            </FooterLink>

            <FooterLink href="/docs/privacy">
              <Translation key="footer:link-privacy" />
            </FooterLink> -->
        </FooterSection>
      </div>
    </div>

    <div class="footer__copyright">© 2023 ADOFAI.gg Development Team.</div>
  </PageContainer>
</footer>

<style lang="scss">
  .footer {
    position: sticky;
    left: 0;
    width: var(--client-width);
    padding: 24px 0;
    background-color: rgba(var(--color-darkblue), 0.2);

    &__title {
      font-weight: 700;
      font-size: 21px;
    }

    &__content-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 12px;

      & > div {
        flex-grow: 1;
        width: 0;

        @media (width <= 768px) {
          width: auto;
        }
      }

      & > div.list {
        display: flex;
        justify-content: center;
      }

      @media (width <= 768px) {
        flex-direction: column;
        gap: 24px;
        align-items: flex-start;
      }
    }

    &__copyright {
      margin-top: 14px;
      letter-spacing: -0.04em;
      opacity: 0.6;
    }
  }
</style>
