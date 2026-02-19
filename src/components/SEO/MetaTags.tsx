import { Helmet } from 'react-helmet-async';
import { APP_CONFIG } from '@/lib/constants';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description = APP_CONFIG.SITE_DESCRIPTION,
  keywords = 'desenvolvedor web, sites futuristas, landing pages, design moderno',
  image = `${APP_CONFIG.SITE_URL}/og-image.jpg`,
  url = APP_CONFIG.SITE_URL,
  type = 'website',
  noIndex = false
}) => {
  const fullTitle = title ? `${title} | ${APP_CONFIG.SITE_NAME}` : APP_CONFIG.SITE_NAME;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={APP_CONFIG.SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@juan_dev" />

      {/* Additional Meta Tags */}
      <meta name="author" content="Juan - Desenvolvedor Web" />
      <meta name="theme-color" content="#8b5cf6" />
      <meta name="msapplication-TileColor" content="#8b5cf6" />
    </Helmet>
  );
};