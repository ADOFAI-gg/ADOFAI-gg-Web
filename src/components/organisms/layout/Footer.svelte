<script lang="ts">
  import FooterLink from '@atoms/footer/FooterLink.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import FooterSection from '@molecules/FooterSection.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<footer>
  <PageContainer>
    <div class="title">
      <Translation key="FOOTER_TITLE" />
    </div>

    <div class="content-container" style="letter-spacing: -0.04em;">
      <div>
        <Translation key="FOOTER_DESCRIPTION" />
      </div>

      <div class="list">
        <FooterSection title="FOOTER_SECTION_CONTACT">
          <FooterLink href="mailto:adofai.gg@gmail.com">
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

    <div class="copyright">
      © 2023 ADOFAI.gg Development Team. <Translation key="FOOTER_COPYRIGHT" />
    </div>
  </PageContainer>
</footer>

<style lang="scss">
  footer {
    position: sticky;
    left: 0;
    width: 100vw;
    padding: 24px 0;
    background-color: rgba(var(--color-darkblue), 0.2);

    .title {
      font-weight: 700;
      font-size: 21px;
    }

    .content-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 12px;

      & > div {
        flex-grow: 1;
        width: 0;
      }

      & > div.list {
        display: flex;
        justify-content: center;
      }
    }

    .copyright {
      margin-top: 14px;
      letter-spacing: -0.04em;
      opacity: 0.6;
    }
  }
</style>
