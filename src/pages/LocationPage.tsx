import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { getBreadcrumbsFromPath } from '../utils/breadcrumbs';

const LocationPage = () => {
  const { location } = useParams<{ location: string }>();
  const currentLocation = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(currentLocation.pathname);

  const locations = {
    'drammen': {
      name: 'Drammen',
      fullName: 'Drammen',
      description: 'Bygg og anleggstjenester i Drammen sentrum og omkringliggende områder',
      longDescription: 'Drømme Huset AS er din pålitelige partner for alle typer bygg og anleggstjenester i Drammen. Med over 25 års erfaring i byen leverer vi håndverk av høyeste kvalitet til både private og bedrifter. Vi kjenner Drammen godt og kan hjelpe deg med alt fra små reparasjoner til store byggeprosjekter.',
      neighborhoods: ['Drammen sentrum', 'Bragernes', 'Åssiden', 'Konnerud', 'Gulskogen', 'Skoger', 'Mjøndalen', 'Nedre Eiker'],
      services: [
        'Tømrerarbeid i Drammen',
        'Våtromsrenovering i Drammen',
        'Kjøkkenrenovering i Drammen',
        'Elektriker i Drammen',
        'Murerarbeid i Drammen',
        'Rørlegger i Drammen'
      ],
      specializations: [
        'Husrenovering i Drammen sentrum',
        'Nybygg i Konnerud og Gulskogen',
        'Våtromsrenovering i Bragernes',
        'Kjøkkenrenovering i Åssiden',
        'Elektrikerarbeid i Skoger',
        'Murerarbeid i Mjøndalen'
      ],
      keywords: ['bygg drammen', 'tømrer drammen', 'våtrom drammen', 'kjøkken drammen', 'elektriker drammen', 'murer drammen', 'rørlegger drammen', 'byggmester drammen'],
      coordinates: { lat: 59.7440, lng: 10.2045 },
      postalCode: '3000-3049'
    },
    'lier': {
      name: 'Lier',
      fullName: 'Lier kommune',
      description: 'Profesjonelle bygg og anleggstjenester i Lier, Lierbyen og omkringliggende områder',
      longDescription: 'Drømme Huset AS leverer omfattende bygg og anleggstjenester i Lier kommune. Med vår lokale kunnskap og over 25 års erfaring hjelper vi både private og bedrifter med alle typer byggeprosjekter. Vi kjenner Lier godt og kan tilby tilpassede løsninger for ditt behov.',
      neighborhoods: ['Lierbyen', 'Lierskogen', 'Tranby', 'Reistad', 'Lierstranda', 'Lierdalen', 'Frogner', 'Lierfoss'],
      services: [
        'Tømrerarbeid i Lier',
        'Våtromsrenovering i Lier',
        'Kjøkkenrenovering i Lier',
        'Elektriker i Lier',
        'Murerarbeid i Lier',
        'Rørlegger i Lier'
      ],
      specializations: [
        'Husrenovering i Lierbyen',
        'Nybygg i Lierskogen',
        'Våtromsrenovering i Tranby',
        'Kjøkkenrenovering i Reistad',
        'Elektrikerarbeid i Lierstranda',
        'Murerarbeid i Lierdalen'
      ],
      keywords: ['bygg lier', 'tømrer lier', 'våtrom lier', 'kjøkken lier', 'elektriker lier', 'murer lier', 'rørlegger lier', 'byggmester lier'],
      coordinates: { lat: 59.7833, lng: 10.2500 },
      postalCode: '3400-3499'
    },
    'svelvik': {
      name: 'Svelvik',
      fullName: 'Svelvik kommune',
      description: 'Bygg og anleggstjenester i Svelvik og omkringliggende områder',
      longDescription: 'Drømme Huset AS tilbyr profesjonelle bygg og anleggstjenester i Svelvik kommune. Med vår lokale tilstedeværelse og omfattende erfaring hjelper vi både private og bedrifter med alle typer byggeprosjekter. Vi kjenner Svelvik godt og kan tilby kvalitetstjenester tilpasset lokale forhold.',
      neighborhoods: ['Svelvik sentrum', 'Svelvikstranda', 'Svelvikåsen', 'Svelvikskogen', 'Svelvikdalen', 'Svelvikfjellet'],
      services: [
        'Tømrerarbeid i Svelvik',
        'Våtromsrenovering i Svelvik',
        'Kjøkkenrenovering i Svelvik',
        'Elektriker i Svelvik',
        'Murerarbeid i Svelvik',
        'Rørlegger i Svelvik'
      ],
      specializations: [
        'Husrenovering i Svelvik sentrum',
        'Nybygg i Svelvikåsen',
        'Våtromsrenovering i Svelvikstranda',
        'Kjøkkenrenovering i Svelvikskogen',
        'Elektrikerarbeid i Svelvikdalen',
        'Murerarbeid i Svelvikfjellet'
      ],
      keywords: ['bygg svelvik', 'tømrer svelvik', 'våtrom svelvik', 'kjøkken svelvik', 'elektriker svelvik', 'murer svelvik', 'rørlegger svelvik', 'byggmester svelvik'],
      coordinates: { lat: 59.6167, lng: 10.4000 },
      postalCode: '3060-3069'
    },
    'holmestrand': {
      name: 'Holmestrand',
      fullName: 'Holmestrand kommune',
      description: 'Bygg og anleggstjenester i Holmestrand og omkringliggende områder',
      longDescription: 'Drømme Huset AS leverer omfattende bygg og anleggstjenester i Holmestrand kommune. Med vår lokale kunnskap og over 25 års erfaring hjelper vi både private og bedrifter med alle typer byggeprosjekter. Vi kjenner Holmestrand godt og kan tilby tilpassede løsninger for ditt behov.',
      neighborhoods: ['Holmestrand sentrum', 'Holmestrandstranda', 'Holmestrandåsen', 'Holmestrandskogen', 'Holmestranddalen', 'Holmestrandfjellet'],
      services: [
        'Tømrerarbeid i Holmestrand',
        'Våtromsrenovering i Holmestrand',
        'Kjøkkenrenovering i Holmestrand',
        'Elektriker i Holmestrand',
        'Murerarbeid i Holmestrand',
        'Rørlegger i Holmestrand'
      ],
      specializations: [
        'Husrenovering i Holmestrand sentrum',
        'Nybygg i Holmestrandåsen',
        'Våtromsrenovering i Holmestrandstranda',
        'Kjøkkenrenovering i Holmestrandskogen',
        'Elektrikerarbeid i Holmestranddalen',
        'Murerarbeid i Holmestrandfjellet'
      ],
      keywords: ['bygg holmestrand', 'tømrer holmestrand', 'våtrom holmestrand', 'kjøkken holmestrand', 'elektriker holmestrand', 'murer holmestrand', 'rørlegger holmestrand', 'byggmester holmestrand'],
      coordinates: { lat: 59.5000, lng: 10.3167 },
      postalCode: '3070-3079'
    }
  };

  const locationData = locations[location as keyof typeof locations];

  if (!locationData) {
    return (
      <div className="min-h-screen py-20 bg-sand-500 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-puce-500 mb-4">Lokasjon ikke funnet</h1>
          <Link to="/contact" className="btn-premium">
            Kontakt oss
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`Bygg og Anlegg i ${locationData.fullName} - Drømme Huset AS | ${locationData.name}`}
        description={`Profesjonelle bygg og anleggstjenester i ${locationData.fullName}. Tømrer, murer, elektriker, rørlegger, våtrom og kjøkken. Over 25 års erfaring i ${locationData.name}.`}
        url={`https://drommehuset.no/location/${location}`}
      />
      <StructuredData 
        type="LocalBusiness" 
        data={{
          name: `Drømme Huset AS - ${locationData.fullName}`,
          description: `Profesjonelle bygg og anleggstjenester i ${locationData.fullName}`,
          url: `https://drommehuset.no/location/${location}`,
          telephone: "+4747294697",
          email: "drammenbygg@gmail.com",
          address: {
            "@type": "PostalAddress",
            "addressLocality": locationData.fullName,
            "addressCountry": "NO"
          },
          geo: {
            "@type": "GeoCoordinates",
            "latitude": locationData.coordinates.lat.toString(),
            "longitude": locationData.coordinates.lng.toString()
          },
          areaServed: locationData.neighborhoods,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            "name": `Bygg og anleggstjenester i ${locationData.fullName}`,
            "itemListElement": locationData.services.map(service => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service
              }
            }))
          }
        }}
      />
      <StructuredData 
        type="BreadcrumbList" 
        data={{ breadcrumbs }}
      />
      
      <main className="min-h-screen py-20 bg-sand-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-puce-500 mb-6">
              Bygg og Anlegg i {locationData.fullName}
            </h1>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              {locationData.longDescription}
            </p>
          </header>

          {/* Location Overview */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-puce-500 mb-6">Våre tjenester i {locationData.name}</h2>
              <div className="space-y-4">
                {locationData.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0" />
                    <span className="text-puce-500">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-puce-500 mb-6">Kontakt oss i {locationData.name}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold-500" />
                  <a href="tel:+4747294697" className="text-puce-500 hover:text-gold-500 transition-colors">
                    +47 472 94 697
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gold-500" />
                  <span className="text-puce-500">Vi dekker hele {locationData.fullName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gold-500" />
                  <span className="text-puce-500">Søndag-Fredag: 08:00-20:00</span>
                </div>
              </div>
              <Link
                to="/contact"
                className="btn-premium w-full mt-6 inline-flex items-center justify-center py-3 px-4 rounded-xl hover:shadow-xl hover:scale-105 group"
              >
                Få Gratis Tilbud
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </section>

          {/* Neighborhoods */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-puce-500 mb-8 text-center">Vi dekker disse områdene i {locationData.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {locationData.neighborhoods.map((neighborhood, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                  <MapPin className="h-6 w-6 text-gold-500 mx-auto mb-2" />
                  <span className="text-puce-500 font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Specializations */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-puce-500 mb-8 text-center">Våre spesialiseringer i {locationData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationData.specializations.map((specialization, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Star className="h-8 w-8 text-gold-500 mb-4" />
                  <h3 className="text-lg font-semibold text-puce-500 mb-2">{specialization}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Service Links */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-puce-500 mb-8 text-center">Våre tjenester i {locationData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/services/tomrerarbeid"
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <h3 className="text-xl font-bold text-puce-500 mb-2 group-hover:text-gold-500 transition-colors duration-300">
                  Tømrerarbeid i {locationData.name}
                </h3>
                <p className="text-puce-500 text-sm mb-4">
                  Profesjonelle tømrerarbeider med høy kvalitet og presisjon
                </p>
                <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors duration-300">
                  Les mer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
              <Link
                to="/services/vatromsrenovering"
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <h3 className="text-xl font-bold text-puce-500 mb-2 group-hover:text-gold-500 transition-colors duration-300">
                  Våtromsrenovering i {locationData.name}
                </h3>
                <p className="text-puce-500 text-sm mb-4">
                  Komplette våtromsrenoveringer med moderne design
                </p>
                <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors duration-300">
                  Les mer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
              <Link
                to="/services/kjokkenrenovering"
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <h3 className="text-xl font-bold text-puce-500 mb-2 group-hover:text-gold-500 transition-colors duration-300">
                  Kjøkkenrenovering i {locationData.name}
                </h3>
                <p className="text-puce-500 text-sm mb-4">
                  Skreddersydde kjøkken-møbler med moderne design
                </p>
                <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors duration-300">
                  Les mer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
              <Link
                to="/services/elektriker"
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <h3 className="text-xl font-bold text-puce-500 mb-2 group-hover:text-gold-500 transition-colors duration-300">
                  Elektriker i {locationData.name}
                </h3>
                <p className="text-puce-500 text-sm mb-4">
                  Sikker elektrisk installasjon og vedlikehold
                </p>
                <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors duration-300">
                  Les mer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
              <Link
                to="/services/murerarbeid"
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <h3 className="text-xl font-bold text-puce-500 mb-2 group-hover:text-gold-500 transition-colors duration-300">
                  Murerarbeid i {locationData.name}
                </h3>
                <p className="text-puce-500 text-sm mb-4">
                  Solid murerarbeid med tradisjonelle og moderne teknikker
                </p>
                <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors duration-300">
                  Les mer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
              <Link
                to="/services/rorlegger"
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <h3 className="text-xl font-bold text-puce-500 mb-2 group-hover:text-gold-500 transition-colors duration-300">
                  Rørlegger i {locationData.name}
                </h3>
                <p className="text-puce-500 text-sm mb-4">
                  Kompetent rørleggerarbeid og sanitetssystemer
                </p>
                <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors duration-300">
                  Les mer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-puce-500 mb-8 text-center">Hvorfor velge oss i {locationData.name}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <Star className="h-8 w-8 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-puce-500 mb-2">25+ års erfaring</h3>
                <p className="text-sm text-puce-500">Over 25 års erfaring i {locationData.name}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <MapPin className="h-8 w-8 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-puce-500 mb-2">Lokal ekspertise</h3>
                <p className="text-sm text-puce-500">Vi kjenner {locationData.name} godt</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <CheckCircle className="h-8 w-8 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-puce-500 mb-2">Kvalitetsgaranti</h3>
                <p className="text-sm text-puce-500">Alle arbeider har garanti</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <Phone className="h-8 w-8 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-puce-500 mb-2">24/7 nødhjelp</h3>
                <p className="text-sm text-puce-500">Tilgjengelige for akutte behov</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-puce-500 mb-4">
                Klar til å starte ditt prosjekt i {locationData.name}?
              </h2>
              <p className="text-xl text-puce-500 mb-6">
                Kontakt oss i dag for en gratis konsultasjon og la oss gjøre din visjon til virkelighet.
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
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default LocationPage;
