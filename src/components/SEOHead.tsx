import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  siteConfig, 
  pageMetadata, 
  defaultMetadata, 
  organizationData, 
  localBusinessData,
  productCatalogData,
  generateBreadcrumbData,
  type PageMeta 
} from '../seo/metadata';

interface SEOHeadProps {
  page?: 'home' | 'products' | 'services' | 'distributors' | 'about' | 'contact';
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  customImage?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  includeProductCatalog?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  page,
  customTitle,
  customDescription,
  customKeywords,
  customImage,
  breadcrumbs,
  includeProductCatalog = false
}) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  
  // Get page-specific metadata or use defaults
  const pageMeta: PageMeta = page ? pageMetadata[page] : defaultMetadata;
  
  // Build metadata with custom overrides
  const title = customTitle || pageMeta.title;
  const description = customDescription || pageMeta.description;
  const keywords = customKeywords || pageMeta.keywords;
  const ogImage = customImage || pageMeta.ogImage || siteConfig.defaultImage;
  
  // Build canonical URL
  const canonical = `${siteConfig.siteUrl}${location.pathname}`;
  
  // Build alternate language URLs for hreflang
  const alternateUrls = siteConfig.languages.map(lang => ({
    lang,
    url: `${siteConfig.siteUrl}${location.pathname}${lang !== 'en' ? `?lang=${lang}` : ''}`
  }));
  
  // Generate structured data
  const structuredData = [];
  
  // Always include organization data
  structuredData.push(organizationData);
  
  // Always include local business data
  structuredData.push(localBusinessData);
  
  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    structuredData.push(generateBreadcrumbData(breadcrumbs));
  }
  
  // Add product catalog for products page
  if (includeProductCatalog || page === 'products') {
    structuredData.push(productCatalogData);
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Skytech Aviation" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Hreflang Tags for Multilingual Support */}
      {alternateUrls.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${siteConfig.siteUrl}${location.pathname}`} />
      
      {/* Geo Meta Tags for UAE Targeting */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.1772;55.3093" />
      <meta name="ICBM" content="25.1772, 55.3093" />
      
      {/* Additional UAE targeting */}
      <meta name="geo.country" content="AE" />
      <meta name="geo.city" content="Dubai" />
      <meta name="geo.state" content="Dubai" />
      
      {/* Open Graph Tags */}
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${siteConfig.siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content={currentLang === 'ar' ? 'ar_AE' : currentLang === 'ru' ? 'ru_RU' : 'en_US'} />
      {siteConfig.languages.filter(lang => lang !== currentLang).map(lang => (
        <meta key={lang} property="og:locale:alternate" content={
          lang === 'ar' ? 'ar_AE' : lang === 'ru' ? 'ru_RU' : 'en_US'
        } />
      ))}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteConfig.siteUrl}${ogImage}`} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.siteName} />
      <meta name="application-name" content={siteConfig.siteName} />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
      
      {/* Verification Tags (add your verification codes here) */}
      {/* <meta name="google-site-verification" content="your-verification-code" /> */}
      {/* <meta name="msvalidate.01" content="your-bing-verification-code" /> */}
      
      {/* JSON-LD Structured Data */}
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;