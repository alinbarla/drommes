import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Service' | 'Review' | 'FAQ' | 'BreadcrumbList' | 'ImageObject' | 'Article' | 'Person' | 'Organization' | 'HowTo' | 'Product' | 'WebSite' | 'ContactPage';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'LocalBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Drømme Huset AS",
          "description": "Profesjonelle bygg og anleggstjenester i Drammen-området. Over 25 års erfaring med tømrer, murer, elektriker og mer.",
          "url": "https://drommehusetditt.no",
          "telephone": "+4747294697",
          "email": "drammenbygg@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jonas Lies vei 43",
            "addressLocality": "Drammen",
            "postalCode": "3022",
            "addressCountry": "NO"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "59.7440",
            "longitude": "10.2045"
          },
          "openingHours": "Mo-Su 08:00-20:00",
          
          "areaServed": [
            "Drammen",
            "Lier", 
            "Svelvik",
            "Holmestrand"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Bygg og anleggstjenester",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Tømrerarbeid",
                  "description": "Profesjonelle tømrerarbeider med høy kvalitet"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Våtromsrenovering",
                  "description": "Komplette våtromsrenoveringer"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Elektriker",
                  "description": "Sikker elektrisk installasjon"
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127"
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+4747294697",
              "contactType": "customer service",
              "email": "drammenbygg@gmail.com",
              "availableLanguage": "Norwegian",
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"],
                "opens": "08:00",
                "closes": "20:00"
              }
            },
            {
              "@type": "ContactPoint",
              "telephone": "+4747294697",
              "contactType": "emergency",
              "availableLanguage": "Norwegian",
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              }
            }
          ],
          "sameAs": [
            "https://www.facebook.com/share/1F8UL7tZqo/"
          ]
        };

      case 'Service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Drømme Huset AS"
          },
          "areaServed": {
            "@type": "City",
            "name": "Drammen"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${data.name} - Tjenester`,
            "itemListElement": data.services || []
          }
        };

      case 'Review':
        return {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "LocalBusiness",
            "name": "Drømme Huset AS"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": data.author
          },
          "reviewBody": data.review
        };

      case 'FAQ':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.faqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };

      case 'BreadcrumbList':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.breadcrumbs.map((breadcrumb: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": breadcrumb.name,
            "item": `https://drommehusetditt.no${breadcrumb.path === '/' ? '' : breadcrumb.path}`
          }))
        };

      case 'ImageObject':
        return {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "contentUrl": data.url,
          "description": data.description,
          "name": data.name,
          "creator": {
            "@type": "Organization",
            "name": "Drømme Huset AS"
          }
        };



      case 'Article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.excerpt,
          "author": {
            "@type": "Organization",
            "name": "Drømme Huset AS",
            "url": "https://drommehusetditt.no"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Drømme Huset AS",
            "logo": {
              "@type": "ImageObject",
              "url": "https://drommehusetditt.no/logo.png"
            }
          },
          "datePublished": data.datePublished,
          "dateModified": data.dateModified || data.datePublished,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          },
          "image": data.image,
          "articleSection": data.category,
          "keywords": data.keywords
        };

      case 'Person':
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": data.name,
          "jobTitle": data.jobTitle,
          "worksFor": {
            "@type": "Organization",
            "name": "Drømme Huset AS"
          },
          "description": data.description,
          "image": data.image,
          "url": data.url
        };

      case 'Organization':
        return {
                "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Drømme Huset AS",
      "url": "https://drommehusetditt.no",
          "logo": "https://drommehusetditt.no/logo.png",
          "description": "Profesjonelle bygg og anleggstjenester i Drammen-området. Over 25 års erfaring med tømrer, murer, elektriker og mer.",
          "foundingDate": "1999",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jonas Lies vei 43",
            "addressLocality": "Drammen",
            "postalCode": "3022",
            "addressCountry": "NO"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+4747294697",
            "contactType": "customer service",
            "email": "drammenbygg@gmail.com"
          },
          "sameAs": [
            "https://www.facebook.com/share/1F8UL7tZqo/"
          ]
        };

      case 'HowTo':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": data.name,
          "description": data.description,
          "image": data.image,
          "totalTime": data.totalTime,
          "estimatedCost": {
            "@type": "MonetaryAmount",
            
            "value": data.estimatedCost
          },
          "supply": data.supplies?.map((supply: any) => ({
            "@type": "HowToSupply",
            "name": supply.name
          })),
          "tool": data.tools?.map((tool: any) => ({
            "@type": "HowToTool",
            "name": tool.name
          })),
          "step": data.steps?.map((step: any, index: number) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text,
            "image": step.image
          }))
        };

      case 'Product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "image": data.image,
          "brand": {
            "@type": "Brand",
            "name": "Drømme Huset AS"
          },
          "offers": {
            "@type": "Offer",
            
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Drømme Huset AS"
            }
          }
        };

      case 'WebSite':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Drømme Huset AS",
          "url": "https://drommehusetditt.no",
          "description": "Profesjonelle bygg og anleggstjenester i Drammen-området",
          "publisher": {
            "@type": "Organization",
            "name": "Drømme Huset AS"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://drommehusetditt.no/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };



      case 'ContactPage':
        return {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Kontakt Oss - Drømme Huset AS",
          "description": "Kontakt Drømme Huset AS for bygg og anleggstjenester i Drammen, Lier, Svelvik og Holmestrand",
          "url": "https://drommehusetditt.no/contact",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Drømme Huset AS",
            "telephone": "+4747294697",
            "email": "drammenbygg@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jonas Lies vei 43",
              "addressLocality": "Drammen",
              "postalCode": "3022",
              "addressCountry": "NO"
            }
          }
        };

      default:
        return {};
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

export default StructuredData;
