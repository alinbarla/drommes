import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Drømme Huset AS - Bygg og Anlegg | Tømrer, Murer, Elektriker',
  description = 'Drømme Huset AS leverer profesjonelle bygg og anleggstjenester. Tømrer, murer, elektriker, rørlegger og mer. Over 25 års erfaring i Norge.',
  image = 'https://dromehusetditt.no/social-image.jpg',
  url = 'https://dromehusetditt.no',
  type = 'website'
}) => {
  const siteName = 'Drømme Huset AS';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} - Profesjonelle bygg og anleggstjenester`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="nb_NO" />
      
      {/* WhatsApp specific optimizations */}
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content={`${siteName} - Profesjonelle bygg og anleggstjenester`} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content="Norwegian" />
      <meta name="author" content={siteName} />
      <meta name="geo.region" content="NO-06" />
      <meta name="geo.placename" content="Drammen" />
      <meta name="geo.position" content="59.7440;10.2045" />
      <meta name="ICBM" content="59.7440, 10.2045" />
      
      {/* Hreflang for Norwegian */}
      <link rel="alternate" hrefLang="no" href={url} />
      <link rel="alternate" hrefLang="nb" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Enhanced meta tags */}
      <meta name="keywords" content="bygg og anlegg, tømrer, murer, elektriker, rørlegger, våtrom, kjøkken, drammen, lier, svelvik, holmestrand, entreprenør, byggmester, konnerud, gulskogen, åssiden, bragernes, lierbyen, tranby, reistad, lierskogen, svelvikstranda, holmestrandstranda, våtromsrenovering, kjøkkenrenovering, tømrerarbeid, murerarbeid, elektrikerarbeid, rørleggerarbeid, byggeprosjekt, husrenovering, nybygg, reparasjon, vedlikehold, nødhjelp, gratis tilbud, kvalitetsgaranti, lokal entreprenør, viken fylkeskommune" />
      <meta name="classification" content="Business" />
      <meta name="category" content="Construction" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:country-name" content="Norway" />
      <meta property="og:region" content="Viken" />
      <meta property="og:postal-code" content="3022" />
      <meta property="og:latitude" content="59.7440" />
      <meta property="og:longitude" content="10.2045" />
      
      {/* Enhanced Twitter */}
      <meta name="twitter:creator" content="@drommehuset" />
      <meta name="twitter:site" content="@drommehuset" />
      <meta name="twitter:label1" content="Lokasjon" />
      <meta name="twitter:data1" content="Drammen, Norge" />
      <meta name="twitter:label2" content="Tjenester" />
      <meta name="twitter:data2" content="Bygg og Anlegg" />
    </Helmet>
  );
};

export default SEO;
