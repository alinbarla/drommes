import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, MapPin, Clock, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { getBreadcrumbsFromPath } from '../utils/breadcrumbs';

const Services = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);

  const services = [
    {
      id: 1,
      title: 'Tømrerarbeid',
      slug: 'tomrerarbeid',
      description: 'Profesjonelle tømrerarbeider med høy kvalitet og presisjon i Drammen-området. Vi leverer alt fra tak og gulv til vinduer og dører.',
      features: [
        'Tak og takkonstruksjoner',
        'Gulv og gulvbelegg',
        'Vinduer og dører',
        'Utvidelser og påbygg',
        'Renovering og reparasjoner'
      ],
      pricing: 'Fra 25,000 NOK',
      image: '/images/tomrer/main.webp',
      category: 'Tømrer',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand'],
      duration: '1-8 uker',
      guarantee: '5 års garanti'
    },
    {
      id: 2,
      title: 'Våtromsrenovering',
      slug: 'vatromsrenovering',
      description: 'Komplette våtromsrenoveringer med moderne design og funksjonalitet. Vi bruker kun kvalitetsmaterialer og tilbyr 10 års garanti.',
      features: [
        'Komplett renovering',
        'Flislegging og overflater',
        'Sanitærutstyr',
        'Elektriske installasjoner',
        'Ventilasjon og oppvarming'
      ],
      pricing: 'Fra 50,000 NOK',
      image: '/images/vatrom/main.webp',
      category: 'Våtrom',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand'],
      duration: '2-4 uker',
      guarantee: '10 års garanti'
    },
    {
      id: 3,
      title: 'Kjøkkenrenovering',
      slug: 'kjokkenrenovering',
      description: 'Skreddersydde kjøkken-møbler med moderne design og funksjonalitet. Vi tilbyr gratis designkonsultasjon og leverer fra skap til komplett kjøkken.',
      features: [
        'Kjøkkenmøbler og skap',
        'Benkeplater og overflater',
        'Elektriske installasjoner',
        'Rørleggerarbeid',
        'Design og planlegging'
      ],
      pricing: 'Fra 150,000 NOK',
      image: '/images/kjokken/main.webp',
      category: 'Kjøkken',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand'],
      duration: '3-6 uker',
      guarantee: '5 års garanti'
    },
    {
      id: 4,
      title: 'Elektriker',
      slug: 'elektriker',
      description: 'Sikker elektrisk installasjon og vedlikehold av høy kvalitet. Vi er godkjent elektriker med alle nødvendige sertifikater.',
      features: [
        'Elektriske installasjoner',
        'Hovedtavler og sikringer',
        'Belysning og stikkontakter',
        'Smart hjem-teknologi',
        '24/7 nødhjelp'
      ],
      pricing: 'Fra 12,000 NOK',
      image: '/images/elektriker/main.webp',
      category: 'Elektriker',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand'],
      duration: '1-3 dager',
      guarantee: '2 års garanti'
    },
    {
      id: 5,
      title: 'Murerarbeid',
      slug: 'murerarbeid',
      description: 'Solid murerarbeid med tradisjonelle og moderne teknikker. Vi leverer alt fra fundament til fasadearbeid.',
      features: [
        'Fundament og grunnarbeid',
        'Murarbeid og puss',
        'Fasader og overflater',
        'Reparasjoner og vedlikehold',
        'Isolasjon og tetting'
      ],
      pricing: 'Fra 30,000 NOK',
      image: '/images/murer/main.webp',
      category: 'Murer',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand'],
      duration: '1-4 uker',
      guarantee: '5 års garanti'
    },
    {
      id: 6,
      title: 'Rørlegger',
      slug: 'rorlegger',
      description: 'Kompetent rørleggerarbeid og sanitetssystemer. Vi leverer alt fra ny installasjon til reparasjoner.',
      features: [
        'Sanitærinstallasjoner',
        'Varmtvannssystemer',
        'Avløp og vannforsyning',
        'Reparasjoner og vedlikehold',
        'Gulvvarme og oppvarming'
      ],
      pricing: 'Fra 18,000 NOK',
      image: '/images/Rørlegger/main.webp',
      category: 'Rørlegger',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand'],
      duration: '1-3 dager',
      guarantee: '3 års garanti'
    }
  ];

  return (
    <>
      <SEO 
        title="Våre Tjenester - Drømme Huset AS | Bygg og Anlegg i Drammen"
        description="Utforsk våre omfattende tjenester innen bygg og anlegg i Drammen, Lier, Svelvik og Holmestrand. Tømrer, murer, elektriker, rørlegger, våtrom og kjøkken. Gratis tilbud og konsultasjon."
        url="https://drommehuset.no/services"
      />
      <StructuredData 
        type="Organization" 
        data={{}}
      />
      <StructuredData 
        type="LocalBusiness" 
        data={{}}
      />
      <StructuredData 
        type="BreadcrumbList" 
        data={{ breadcrumbs }}
      />
      {services.map((service) => (
        <StructuredData 
          key={service.id}
          type="Service" 
          data={{
            name: service.title,
            description: service.description,
            provider: {
              "@type": "LocalBusiness",
              "name": "Drømme Huset AS"
            },
            areaServed: service.areas,
            offers: {
              "@type": "Offer",
              "price": service.pricing,
              "priceCurrency": "NOK"
            }
          }}
        />
      ))}
      
      <main className="min-h-screen py-20 bg-sand-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-puce-500 mb-6">
              Våre Tjenester
            </h1>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Utforsk våre omfattende tjenester innen bygg og anlegg som viser 
              vårt engasjement for kvalitet, innovasjon og håndverk i Drammen-området.
            </p>
          </header>

          {/* Services Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" aria-labelledby="services-heading">
            <h2 id="services-heading" className="sr-only">Våre Tjenester</h2>
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} - ${service.description.substring(0, 50)}...`}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    width="400"
                    height="256"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="btn-premium px-3 py-1 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-puce-500 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-puce-500 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-puce-500">
                        <CheckCircle className="h-4 w-4 text-gold-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-puce-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {service.areas.slice(0, 2).join(', ')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gold-500">
                      {service.pricing}
                    </span>
                    <span className="text-sm text-puce-500">
                      {service.guarantee}
                    </span>
                  </div>
                  
                  <Link
                    to={`/services/${service.slug}`}
                    className="btn-premium w-full inline-flex items-center justify-center py-3 px-4 rounded-xl hover:shadow-xl hover:scale-105 group"
                  >
                    Se Detaljer
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </section>

          {/* Why Choose Us Section */}
          <section className="bg-white p-8 rounded-2xl shadow-lg mb-16" aria-labelledby="why-choose-heading">
            <h2 id="why-choose-heading" className="text-3xl font-bold text-puce-500 mb-8 text-center">
              Hvorfor velge Drømme Huset AS?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-puce-500" />
                </div>
                <h3 className="text-lg font-semibold text-puce-500 mb-2">25+ års erfaring</h3>
                <p className="text-sm text-puce-500">Over 25 års erfaring i byggebransjen med fokus på kvalitet og pålitelighet</p>
              </div>
              <div className="text-center">
                <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-puce-500" />
                </div>
                <h3 className="text-lg font-semibold text-puce-500 mb-2">Lokal ekspertise</h3>
                <p className="text-sm text-puce-500">Dyp kunnskap om lokale forhold og byggeregler i Drammen-området</p>
              </div>
              <div className="text-center">
                <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-puce-500" />
                </div>
                <h3 className="text-lg font-semibold text-puce-500 mb-2">Kvalitetsgaranti</h3>
                <p className="text-sm text-puce-500">Alle arbeider har 2-10 års garanti avhengig av tjenestetype</p>
              </div>
              <div className="text-center">
                <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-puce-500" />
                </div>
                <h3 className="text-lg font-semibold text-puce-500 mb-2">24/7 nødhjelp</h3>
                <p className="text-sm text-puce-500">Tilgjengelige for akutte behov og nødsituasjoner</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-puce-500 mb-6">
              Klar til å starte ditt prosjekt?
            </h2>
            <p className="text-xl text-puce-500 mb-8 max-w-2xl mx-auto">
              Kontakt oss i dag for en gratis konsultasjon og la oss diskutere hvordan vi kan hjelpe deg med ditt byggeprosjekt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-premium inline-flex items-center py-4 px-8 rounded-xl hover:shadow-xl hover:scale-105 group"
              >
                Få Gratis Tilbud
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <a
                href="tel:+4747294697"
                className="bg-white text-puce-500 border-2 border-puce-500 inline-flex items-center py-4 px-8 rounded-xl hover:bg-puce-500 hover:text-white transition-all duration-300 group"
              >
                <Phone className="mr-2 h-5 w-5" />
                Ring +47 472 94 697
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Services;
