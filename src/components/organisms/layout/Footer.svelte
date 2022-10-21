<script lang="ts">
  import FooterLink from '@atoms/footer/FooterLink.svelte';
  import PageContainer from '@atoms/common/PageContainer.svelte';
  import FooterSection from '@molecules/FooterSection.svelte';
  import Translation from '@/components/utils/Translation.svelte';
</script>

<footer class="bg-black bg-opacity-20 w-full sticky left-0">
  <PageContainer>
    <div class="py-[24px]">
      <div class="text-xl font-bold">
        <Translation key="FOOTER_TITLE" />
      </div>
      <div class="flex flex-wrap mt-[12px]">
        <div class="inline-block flex-grow w-0">
          <div>
            <Translation key="FOOTER_DESCRIPTION" />
          </div>
        </div>

        <div class="flex-grow w-0 flex justify-center">
          <FooterSection title="FOOTER_SECTION_CONTACT">
            <FooterLink href="mailto:adofai.gg@gmail.com">
              <Translation key="FOOTER_CONTACT_EMAIL" />
            </FooterLink>
            <FooterLink target="_blank" href={import.meta.env.VITE_DISCORD_INVITE}>
              <Translation key="FOOTER_CONTACT_DISCORD" />
            </FooterLink>
          </FooterSection>
        </div>

        <div class="flex-grow w-0 flex justify-center">
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
      <div class="mt-[14px] opacity-60">
        <Translation key="FOOTER_COPYRIGHT" />
      </div>
    </div>
  </PageContainer>
</footer>
