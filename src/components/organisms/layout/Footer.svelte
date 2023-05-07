<script lang="ts">
  import FooterLink from '@atoms/footer/FooterLink.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import FooterSection from '@molecules/FooterSection.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<footer class="footer">
  <PageContainer>
    <div class="footer__title">
      <Translation key="FOOTER_TITLE" />
    </div>

    <div class="footer__content-container" style="letter-spacing: -0.04em;">
      <div>
        <Translation key="FOOTER_DESCRIPTION" />
      </div>

      <div class="list">
        <FooterSection title="FOOTER_SECTION_CONTACT">
          <FooterLink href="mailto:{import.meta.env.VITE_SUPPORT_MAIL}">
            <Translation key="FOOTER_CONTACT_EMAIL" />
          </FooterLink>

          <FooterLink target="_blank" href={import.meta.env.VITE_DISCORD_INVITE}>
            <Translation key="FOOTER_CONTACT_DISCORD" />
          </FooterLink>
        </FooterSection>
      </div>

      <div class="list">
        <FooterSection title="FOOTER_SECTION_LEGAL">
          <FooterLink href="/legal">
            <Translation key="FOOTER_LEGAL_NOTICE" />
          </FooterLink>

          <!-- <FooterLink href="/tos">
              <Translation key="FOOTER_LEGAL_TERMS" />
            </FooterLink>

            <FooterLink href="/privacy">
              <Translation key="FOOTER_LEGAL_PRIVACY_POLICY" />
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
    width: 100%;
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

        @media (max-width: 768px) {
          width: auto;
        }
      }

      & > div.list {
        display: flex;
        justify-content: center;
      }

      @media (max-width: 768px) {
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
