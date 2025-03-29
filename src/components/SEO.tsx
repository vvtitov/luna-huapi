import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  keywords,
  image = '/images/dp-2/PRIORITY_RENTALS-29.webp',
  url = '',
  type = 'website',
  noindex = false,
}: SEOProps) => {
  const { language } = useLanguage();

  const defaultTitle = language === 'en' 
    ? 'Luna Huapi - Apartments in San Carlos de Bariloche, Argentine Patagonia' 
    : 'Luna Huapi - Departamentos en San Carlos de Bariloche, Patagonia Argentina';

  const defaultDescription = language === 'en'
    ? 'Discover the comfort and charm of our apartments in San Carlos de Bariloche, one of the most beautiful cities in Argentine Patagonia. Exclusive accommodation with views of Lake Nahuel Huapi.'
    : 'Descubre la comodidad y el encanto de nuestros departamentos en San Carlos de Bariloche, una de las ciudades más bellas de la Patagonia argentina. Alojamiento exclusivo con vistas al lago Nahuel Huapi.';

  const defaultKeywords = language === 'en'
    ? 'Luna Huapi, Bariloche apartments, Patagonia accommodation, Nahuel Huapi, San Carlos de Bariloche, temporary rental, Bariloche vacation'
    : 'Luna Huapi, departamentos Bariloche, alojamiento Patagonia, Nahuel Huapi, San Carlos de Bariloche, alquiler temporario, vacaciones Bariloche';

  const baseUrl = 'https://lunahuapi.com';
  const currentUrl = `${baseUrl}${language === 'en' ? '/en' : ''}${url}`;
  const alternateUrl = `${baseUrl}${language === 'en' ? '' : '/en'}${url}`;

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  useEffect(() => {
    document.title = finalTitle;

    const updateMetaTag = (name: string, content: string, property?: string) => {
      let metaTag = property 
        ? document.querySelector(`meta[property="${property}"]`)
        : document.querySelector(`meta[name="${name}"]`);

      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', property);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }

      metaTag.setAttribute('content', content);
    };

    const updateLinkTag = (rel: string, href: string, hrefLang?: string) => {
      let selector = `link[rel="${rel}"]`;
      if (hrefLang) {
        selector += `[hreflang="${hrefLang}"]`;
      }

      let linkTag = document.querySelector(selector);

      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', rel);
        if (hrefLang) {
          linkTag.setAttribute('hreflang', hrefLang);
        }
        document.head.appendChild(linkTag);
      }

      linkTag.setAttribute('href', href);
    };

    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);

    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      const robotsTag = document.querySelector('meta[name="robots"]');
      if (robotsTag && robotsTag.getAttribute('content') === 'noindex, nofollow') {
        document.head.removeChild(robotsTag);
      }
    }

    updateLinkTag('canonical', currentUrl);
    updateLinkTag('alternate', currentUrl, language);
    updateLinkTag('alternate', alternateUrl, language === 'en' ? 'es' : 'en');

    updateMetaTag('og:type', type, 'og:type');
    updateMetaTag('og:url', currentUrl, 'og:url');
    updateMetaTag('og:title', finalTitle, 'og:title');
    updateMetaTag('og:description', finalDescription, 'og:description');
    updateMetaTag('og:image', finalImage, 'og:image');
    updateMetaTag('og:locale', language === 'en' ? 'en_US' : 'es_AR', 'og:locale');

    updateMetaTag('twitter:card', 'summary_large_image', 'twitter:card');
    updateMetaTag('twitter:url', currentUrl, 'twitter:url');
    updateMetaTag('twitter:title', finalTitle, 'twitter:title');
    updateMetaTag('twitter:description', finalDescription, 'twitter:description');
    updateMetaTag('twitter:image', finalImage, 'twitter:image');
  }, [finalTitle, finalDescription, finalKeywords, finalImage, currentUrl, alternateUrl, language, noindex, type]);

  return null;
};

export default SEO;
