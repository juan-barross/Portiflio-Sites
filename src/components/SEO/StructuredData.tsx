import { Helmet } from 'react-helmet-async';
import { APP_CONFIG } from '@/lib/constants';

interface StructuredDataProps {
  type?: 'Person' | 'Organization' | 'WebPage' | 'Article';
  data?: Record<string, unknown>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  type = 'Person',
  data = {}
}) => {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    switch (type) {
      case 'Person':
        return {
          ...baseData,
          name: 'Juan',
          jobTitle: 'Desenvolvedor Web',
          description: APP_CONFIG.SITE_DESCRIPTION,
          url: APP_CONFIG.SITE_URL,
          sameAs: Object.values(APP_CONFIG.SOCIAL_LINKS),
          knowsAbout: [
            'Desenvolvimento Web',
            'React',
            'JavaScript',
            'TypeScript',
            'Design UI/UX',
            'Frontend Development',
            'Responsive Design'
          ],
          serviceType: 'Desenvolvimento Web',
          areaServed: 'Brasil',
          image: `${APP_CONFIG.SITE_URL}/profile-image.jpg`,
          ...data
        };

      case 'Organization':
        return {
          ...baseData,
          name: APP_CONFIG.SITE_NAME,
          description: APP_CONFIG.SITE_DESCRIPTION,
          url: APP_CONFIG.SITE_URL,
          logo: `${APP_CONFIG.SITE_URL}/logo.png`,
          sameAs: Object.values(APP_CONFIG.SOCIAL_LINKS),
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: `+${APP_CONFIG.WHATSAPP_NUMBER}`,
            contactType: 'customer service',
            availableLanguage: 'Portuguese'
          },
          ...data
        };

      case 'WebPage':
        return {
          ...baseData,
          name: APP_CONFIG.SITE_NAME,
          description: APP_CONFIG.SITE_DESCRIPTION,
          url: APP_CONFIG.SITE_URL,
          isPartOf: {
            '@type': 'WebSite',
            name: APP_CONFIG.SITE_NAME,
            url: APP_CONFIG.SITE_URL
          },
          ...data
        };

      default:
        return { ...baseData, ...data };
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};