import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';

const Container = styled.footer`
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
  padding: 30px 20px 35px;
`;

const Content = styled.div`
  max-width: 1100px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  display: flex;
`;

const Sections = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const BrandTitle = styled.div`
  font-size: 21px;
  font-weight: 700;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  opacity: 0.6;
`;

const LegalContent = styled.div`
  opacity: 0.6;
  margin-top: 30px;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  transition: font-weight 0.2s ease;

  &::before {
    content: '›';
    margin-right: 7px;
    transition: margin-right 0.2s ease;
  }

  &:hover,
  &:focus {
    text-decoration: none;
    font-weight: 700;
  }

  &:hover::before,
  &:focus::before {
    text-decoration: none;
    margin-right: 10px;
  }
`;

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Content>
        <Sections>
          <Section style={{ maxWidth: 400, width: '100%' }}>
            <BrandTitle>ADOFAI.gg</BrandTitle>

            <div
              style={{
                maxWidth: 330,
                marginTop: 10,
                flexGrow: 1,
                lineHeight: 1.5
              }}
            >
              {t('footer.description')}
            </div>
          </Section>

          <Section style={{ gap: 10, maxWidth: 250, width: '100%' }}>
            <SectionTitle>Contact</SectionTitle>

            <Link>{t('footer.links.contact.mail')}</Link>
            <NextLink href='/discord' passHref>
              <Link as='a'>{t('footer.links.contact.discord')}</Link>
            </NextLink>
          </Section>

          <Section style={{ gap: 10, maxWidth: 250, width: '100%' }}>
            <SectionTitle>GitHub</SectionTitle>

            <Link>{t('footer.links.github.org')}</Link>
            <Link>{t('footer.links.github.frontRepo')}</Link>
            <Link>{t('footer.links.github.backRepo')}</Link>
          </Section>
        </Sections>
        <LegalContent>
          <a>{t('footer.legal.notice')}</a>・<a>{t('footer.legal.terms')}</a>・
          <a>{t('footer.legal.privacy')}</a>
        </LegalContent>
      </Content>
    </Container>
  );
};

export default Footer;
