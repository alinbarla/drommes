import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, MapPin, Clock, Phone, Award, Users, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { getBreadcrumbsFromPath } from '../utils/breadcrumbs';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);

  const services = {
    'tomrerarbeid': {
      title: 'Tømrerarbeid i Drammen',
      description: 'Profesjonelle tømrerarbeider med høy kvalitet og presisjon i Drammen, Lier, Svelvik og Holmestrand. Vi leverer alt fra tak og gulv til vinduer og dører.',
      longDescription: 'Drømme Huset AS er din pålitelige partner for alle typer tømrerarbeid i Drammen-området. Med over 25 års erfaring leverer vi håndverk av høyeste kvalitet, fra små reparasjoner til store byggeprosjekter. Vårt team av erfarne tømrere og byggmestere har spesialisert seg på moderne byggeteknikker og tradisjonelt håndverk.',
      features: [
        'Tak og takkonstruksjoner',
        'Gulv og gulvbelegg',
        'Vinduer og dører',
        'Utvidelser og påbygg',
        'Renovering og reparasjoner',
        'Terrasser og utendørs konstruksjoner',
        'Kjøkken og innredning',
        'Skap og møbler'
      ],

      image: '/images/tomrer/main.webp',
      category: 'Tømrer',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand', 'Konnerud', 'Gulskogen', 'Åssiden', 'Bragernes'],
      duration: '1-8 uker',
      guarantee: '5 års garanti',
      process: [
        {
          step: 1,
          title: 'Gratis konsultasjon',
          description: 'Vi kommer til deg for å vurdere prosjektet og gi deg et detaljert tilbud'
        },
        {
          step: 2,
          title: 'Planlegging og design',
          description: 'Vi lager en detaljert plan med tidslinje og materialliste'
        },
        {
          step: 3,
          title: 'Utførelse',
          description: 'Vårt team utfører arbeidet med høyeste kvalitet og presisjon'
        },
        {
          step: 4,
          title: 'Kvalitetskontroll',
          description: 'Vi sjekker alt grundig og sikrer at du er 100% fornøyd'
        }
      ],
      faqs: [
        {
          question: "Hvor lang tid tar et typisk tømrerprosjekt?",
          answer: "Det avhenger av prosjektets størrelse. Små reparasjoner kan ta 1-2 dager, mens større prosjekter som tak eller utvidelser kan ta 2-8 uker. Vi gir alltid realistiske tidsrammer."
        },
        {
          question: "Hvilke materialer bruker dere?",
          answer: "Vi bruker kun kvalitetsmaterialer fra anerkjente leverandører. Vi kan tilby alt fra standard til premium materialer avhengig av ditt budsjett og ønsker."
        },
        {
          question: "Tilbyr dere garanti på arbeidet?",
          answer: "Ja, vi tilbyr 5 års garanti på alle tømrerarbeider. Dette dekker både materialer og utførelse."
        },
        {
          question: "Kan dere hjelpe med byggesøknader?",
          answer: "Ja, vi kan hjelpe deg med byggesøknader og sikre at alt er i henhold til gjeldende byggeregler."
        }
      ],
      keywords: ['tømrer drammen', 'tømrerarbeid lier', 'byggmester svelvik', 'tømrer holmestrand', 'tak drammen', 'gulv lier', 'vinduer svelvik']
    },
    'vatromsrenovering': {
      title: 'Våtromsrenovering i Drammen',
      description: 'Komplette våtromsrenoveringer med moderne design og funksjonalitet i Drammen-området. Vi bruker kun kvalitetsmaterialer og tilbyr 10 års garanti.',
      longDescription: 'Transformér ditt våtrom til en moderne oase med våre profesjonelle våtromsrenoveringer. Drømme Huset AS har over 25 års erfaring med våtromsprosjekter i Drammen, Lier, Svelvik og Holmestrand. Vi spesialiserer oss på å skape funksjonelle og vakre våtrom som varer i mange år.',
      features: [
        'Komplett renovering',
        'Flislegging og overflater',
        'Sanitærutstyr',
        'Elektriske installasjoner',
        'Ventilasjon og oppvarming',
        'Gulvvarme',
        'Smart hjem-teknologi',
        'Tilgjengelighetsløsninger'
      ],

      image: '/images/vatrom/main.webp',
      category: 'Våtrom',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand', 'Konnerud', 'Gulskogen', 'Åssiden', 'Bragernes'],
      duration: '2-4 uker',
      guarantee: '10 års garanti',
      process: [
        {
          step: 1,
          title: 'Design og planlegging',
          description: 'Vi designer ditt nye våtrom basert på dine ønsker og behov'
        },
        {
          step: 2,
          title: 'Rivning og forberedelse',
          description: 'Sikker rivning av eksisterende våtrom med minimal støy og støv'
        },
        {
          step: 3,
          title: 'Installasjoner',
          description: 'Rørlegger, elektriker og andre installasjoner utføres av fagfolk'
        },
        {
          step: 4,
          title: 'Flislegging og finishing',
          description: 'Profesjonell flislegging og sluttarbeid for perfekt resultat'
        }
      ],
      faqs: [
        {
          question: "Hvor mye koster en våtromsrenovering?",
          answer: "Vi gir alltid detaljerte tilbud basert på prosjektets omfang og dine ønsker. Kontakt oss for et personlig tilbud tilpasset ditt behov."
        },
        {
          question: "Hvor lang tid tar en våtromsrenovering?",
          answer: "En typisk våtromsrenovering tar 2-4 uker, avhengig av kompleksiteten. Vi holder deg oppdatert gjennom hele prosessen."
        },
        {
          question: "Kan jeg bo hjemme under renoveringen?",
          answer: "Ja, vi setter opp midlertidige løsninger og holder støy og støv til et minimum."
        },
        {
          question: "Hvilke materialer anbefaler dere?",
          answer: "Vi anbefaler kvalitetsmaterialer som varer lenge. Vi har samarbeid med de beste leverandørene og kan tilby gode priser."
        }
      ],
      keywords: ['våtrom drammen', 'våtromsrenovering lier', 'bad svelvik', 'våtrom holmestrand', 'flislegging drammen', 'sanitær lier']
    },
    'kjokkenrenovering': {
      title: 'Kjøkkenrenovering i Drammen',
      description: 'Skreddersydde kjøkken-møbler med moderne design og funksjonalitet i Drammen-området. Vi tilbyr gratis designkonsultasjon og leverer fra skap til komplett kjøkken.',
      longDescription: 'Skap ditt drømmekjøkken med våre profesjonelle kjøkkenrenoveringer. Drømme Huset AS har over 25 års erfaring med kjøkkenprosjekter i Drammen, Lier, Svelvik og Holmestrand. Vi kombinerer funksjonalitet med moderne design for å skape kjøkken som er både praktiske og vakre.',
      features: [
        'Kjøkkenmøbler og skap',
        'Benkeplater og overflater',
        'Elektriske installasjoner',
        'Rørleggerarbeid',
        'Design og planlegging',
        'Smart hjem-teknologi',
        'Oppbevaring og organisering',
        'Belysning og ventilasjon'
      ],

      image: '/images/kjokken/main.webp',
      category: 'Kjøkken',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand', 'Konnerud', 'Gulskogen', 'Åssiden', 'Bragernes'],
      duration: '3-6 uker',
      guarantee: '5 års garanti',
      process: [
        {
          step: 1,
          title: 'Designkonsultasjon',
          description: 'Gratis designkonsultasjon hvor vi planlegger ditt nye kjøkken'
        },
        {
          step: 2,
          title: 'Tilbud og planlegging',
          description: 'Detaljert tilbud med 3D-visualisering av ditt nye kjøkken'
        },
        {
          step: 3,
          title: 'Produksjon og levering',
          description: 'Skreddersydde møbler produseres og leveres til ditt hjem'
        },
        {
          step: 4,
          title: 'Montering og installasjon',
          description: 'Profesjonell montering av alt utstyr og installasjoner'
        }
      ],
      faqs: [
        {
          question: "Hvor mye koster en kjøkkenrenovering?",
          answer: "Vi tilbyr løsninger for alle budsjetter og gir alltid detaljerte tilbud basert på prosjektets omfang og dine ønsker. Kontakt oss for et personlig tilbud."
        },
        {
          question: "Hvor lang tid tar en kjøkkenrenovering?",
          answer: "En typisk kjøkkenrenovering tar 3-6 uker, inkludert produksjon og montering. Vi holder deg oppdatert gjennom hele prosessen."
        },
        {
          question: "Tilbyr dere 3D-design?",
          answer: "Ja, vi tilbyr 3D-visualisering så du kan se hvordan ditt nye kjøkken blir før vi starter."
        },
        {
          question: "Kan jeg velge mine egne materialer?",
          answer: "Absolutt! Vi samarbeider med de beste leverandørene og kan tilby et bredt utvalg av materialer og farger."
        }
      ],
      keywords: ['kjøkken drammen', 'kjøkkenrenovering lier', 'kjøkkenmøbler svelvik', 'kjøkken holmestrand', 'benkeplate drammen', 'kjøkkendesign lier']
    },
    'elektriker': {
      title: 'Elektriker i Drammen',
      description: 'Sikker elektrisk installasjon og vedlikehold av høy kvalitet i Drammen-området. Vi er godkjent elektriker med alle nødvendige sertifikater.',
      longDescription: 'Drømme Huset AS tilbyr profesjonelle elektrikertjenester i Drammen, Lier, Svelvik og Holmestrand. Vårt team av godkjente elektrikere har over 25 års erfaring og holder seg oppdatert på de nyeste standardene og teknologiene.',
      features: [
        'Elektriske installasjoner',
        'Hovedtavler og sikringer',
        'Belysning og stikkontakter',
        'Smart hjem-teknologi',
        '24/7 nødhjelp',
        'Sikkerhetssjekk',
        'Energieffektive løsninger',
        'Oppgradering av gamle installasjoner'
      ],

      image: '/images/elektriker/main.webp',
      category: 'Elektriker',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand', 'Konnerud', 'Gulskogen', 'Åssiden', 'Bragernes'],
      duration: '1-3 dager',
      guarantee: '2 års garanti',
      process: [
        {
          step: 1,
          title: 'Sikkerhetssjekk',
          description: 'Vi sjekker din eksisterende elektriske installasjon for sikkerhet'
        },
        {
          step: 2,
          title: 'Planlegging',
          description: 'Vi planlegger de nødvendige endringene og installasjonene'
        },
        {
          step: 3,
          title: 'Utførelse',
          description: 'Sikker utførelse av alle elektriske arbeider'
        },
        {
          step: 4,
          title: 'Testing og godkjenning',
          description: 'Vi tester alt og sikrer at det oppfyller alle krav'
        }
      ],
      faqs: [
        {
          question: "Er dere godkjent elektrikere?",
          answer: "Ja, vi er godkjent elektriker med alle nødvendige sertifikater og forsikringer."
        },
        {
          question: "Tilbyr dere 24/7 nødhjelp?",
          answer: "Ja, vi tilbyr nødhjelp 24/7 for akutte elektriske problemer."
        },
        {
          question: "Kan dere hjelpe med smart hjem-teknologi?",
          answer: "Absolutt! Vi har erfaring med smart hjem-løsninger og kan hjelpe deg med installasjon og oppsett."
        },
        {
          question: "Hvor raskt kan dere komme?",
          answer: "For akutte problemer kommer vi vanligvis samme dag. For planlagte prosjekter kan vi ofte starte innen 1-2 dager."
        }
      ],
      keywords: ['elektriker drammen', 'elektriker lier', 'elektriker svelvik', 'elektriker holmestrand', 'elektrisk installasjon drammen', 'smart hjem lier']
    },
    'murerarbeid': {
      title: 'Murerarbeid i Drammen',
      description: 'Solid murerarbeid med tradisjonelle og moderne teknikker i Drammen-området. Vi leverer alt fra fundament til fasadearbeid.',
      longDescription: 'Drømme Huset AS tilbyr profesjonelle murertjenester i Drammen, Lier, Svelvik og Holmestrand. Vårt team av erfarne murere kombinerer tradisjonelle teknikker med moderne materialer for å levere varige og vakre resultater.',
      features: [
        'Fundament og grunnarbeid',
        'Murarbeid og puss',
        'Fasader og overflater',
        'Reparasjoner og vedlikehold',
        'Isolasjon og tetting',
        'Skorstein og peis',
        'Støttemurer og terrasser',
        'Restaurering av gamle bygninger'
      ],

      image: '/images/murer/main.webp',
      category: 'Murer',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand', 'Konnerud', 'Gulskogen', 'Åssiden', 'Bragernes'],
      duration: '1-4 uker',
      guarantee: '5 års garanti',
      process: [
        {
          step: 1,
          title: 'Vurdering og planlegging',
          description: 'Vi vurderer prosjektet og lager en detaljert plan'
        },
        {
          step: 2,
          title: 'Materialer og forberedelse',
          description: 'Vi sikrer at alle nødvendige materialer er på plass'
        },
        {
          step: 3,
          title: 'Utførelse',
          description: 'Profesjonell utførelse av murerarbeidet'
        },
        {
          step: 4,
          title: 'Finishing og kvalitetskontroll',
          description: 'Sluttarbeid og grundig kvalitetskontroll'
        }
      ],
      faqs: [
        {
          question: "Hvilke typer murerarbeid tilbyr dere?",
          answer: "Vi tilbyr alt fra fundament og grunnarbeid til fasadearbeid, reparasjoner og restaurering av gamle bygninger."
        },
        {
          question: "Bruker dere moderne eller tradisjonelle teknikker?",
          answer: "Vi kombinerer tradisjonelle murerteknikker med moderne materialer og metoder for best mulig resultat."
        },
        {
          question: "Hvor lang tid tar murerarbeid?",
          answer: "Det avhenger av prosjektets størrelse. Små reparasjoner kan ta 1-2 dager, mens større prosjekter kan ta 1-4 uker."
        },
        {
          question: "Kan dere hjelpe med byggesøknader?",
          answer: "Ja, vi kan hjelpe deg med byggesøknader og sikre at alt er i henhold til gjeldende byggeregler."
        }
      ],
      keywords: ['murer drammen', 'murerarbeid lier', 'mur svelvik', 'murer holmestrand', 'fundament drammen', 'fasade lier']
    },
    'rorlegger': {
      title: 'Rørlegger i Drammen',
      description: 'Kompetent rørleggerarbeid og sanitetssystemer i Drammen-området. Vi leverer alt fra ny installasjon til reparasjoner.',
      longDescription: 'Drømme Huset AS tilbyr profesjonelle rørleggertjenester i Drammen, Lier, Svelvik og Holmestrand. Vårt team av erfarne rørleggere har over 25 års erfaring og kan håndtere alt fra små reparasjoner til store installasjonsprosjekter.',
      features: [
        'Sanitærinstallasjoner',
        'Varmtvannssystemer',
        'Avløp og vannforsyning',
        'Reparasjoner og vedlikehold',
        'Gulvvarme og oppvarming',
        'Våtromsinstallasjoner',
        'Ventilasjon og avtrekk',
        'Vannbehandling og filtrering'
      ],

      image: '/images/Rørlegger/main.webp',
      category: 'Rørlegger',
      areas: ['Drammen', 'Lier', 'Svelvik', 'Holmestrand', 'Konnerud', 'Gulskogen', 'Åssiden', 'Bragernes'],
      duration: '1-3 dager',
      guarantee: '3 års garanti',
      process: [
        {
          step: 1,
          title: 'Diagnose og vurdering',
          description: 'Vi diagnostiserer problemet eller vurderer behovet for ny installasjon'
        },
        {
          step: 2,
          title: 'Planlegging og tilbud',
          description: 'Detaljert plan og tilbud for løsningen'
        },
        {
          step: 3,
          title: 'Utførelse',
          description: 'Profesjonell utførelse av rørleggerarbeidet'
        },
        {
          step: 4,
          title: 'Testing og godkjenning',
          description: 'Vi tester alle installasjoner og sikrer at alt fungerer perfekt'
        }
      ],
      faqs: [
        {
          question: "Tilbyr dere nødhjelp for rørleggerproblemer?",
          answer: "Ja, vi tilbyr nødhjelp 24/7 for akutte rørleggerproblemer som lekkasjer og stoppet avløp."
        },
        {
          question: "Hvor raskt kan dere komme for reparasjoner?",
          answer: "For akutte problemer kommer vi vanligvis samme dag. For planlagte prosjekter kan vi ofte starte innen 1-2 dager."
        },
        {
          question: "Kan dere installere gulvvarme?",
          answer: "Ja, vi har omfattende erfaring med gulvvarme-installasjoner og kan hjelpe deg med både ny installasjon og oppgradering."
        },
        {
          question: "Hvilke garantier tilbyr dere?",
          answer: "Vi tilbyr 3 års garanti på alle rørleggerarbeider, både materialer og utførelse."
        }
      ],
      keywords: ['rørlegger drammen', 'rørlegger lier', 'rørlegger svelvik', 'rørlegger holmestrand', 'sanitær drammen', 'gulvvarme lier']
    }
  };

  const service = services[slug as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen py-20 bg-sand-500 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-puce-500 mb-4">Tjeneste ikke funnet</h1>
          <Link to="/services" className="btn-premium">
            Tilbake til tjenester
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${service.title} - Drømme Huset AS | ${service.category} i Drammen`}
        description={service.description}
        url={`https://dromehusetditt.no/services/${slug}`}
        image={service.image}
      />
      <StructuredData 
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
                         
                          
          }
        }}
      />
      <StructuredData 
        type="FAQ" 
        data={{ faqs: service.faqs }}
      />
      <StructuredData 
        type="BreadcrumbList" 
        data={{ breadcrumbs }}
      />
      <StructuredData 
        type="HowTo" 
        data={{
          name: `Hvordan bestille ${service.title.toLowerCase()}`,
          description: `En komplett guide til å bestille ${service.title.toLowerCase()} fra Drømme Huset AS`,
          steps: service.process.map(step => ({
            name: step.title,
            text: step.description
          }))
        }}
      />
      
      <main className="min-h-screen py-20 bg-sand-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-puce-500 mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              {service.longDescription}
            </p>
          </header>

          {/* Service Overview */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <img
                src={service.image}
                alt={`${service.title} - Profesjonelle ${service.category.toLowerCase()}-tjenester`}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                loading="eager"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-puce-500 mb-6">Hvorfor velge oss?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-500 p-3 rounded-xl">
                    <Award className="h-6 w-6 text-puce-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-puce-500 mb-2">25+ års erfaring</h3>
                    <p className="text-puce-500">Over 25 års erfaring med {service.category.toLowerCase()}-prosjekter i Drammen-området</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-500 p-3 rounded-xl">
                    <Shield className="h-6 w-6 text-puce-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-puce-500 mb-2">{service.guarantee}</h3>
                    <p className="text-puce-500">Alle våre arbeider har kvalitetsgaranti for din trygghet</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-500 p-3 rounded-xl">
                    <Users className="h-6 w-6 text-puce-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-puce-500 mb-2">Lokale eksperter</h3>
                    <p className="text-puce-500">Vi kjenner Drammen-området og kan hjelpe deg med lokale forhold</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Features */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-puce-500 mb-8 text-center">Våre {service.category}-tjenester</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                  <CheckCircle className="h-8 w-8 text-gold-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-puce-500">{feature}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-puce-500 mb-8 text-center">Vår prosess</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-puce-500">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-puce-500 mb-2">{step.title}</h3>
                  <p className="text-puce-500">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Service Areas */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-puce-500 mb-8 text-center">Våre serviceområder</h2>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.areas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gold-500" />
                    <span className="text-puce-500 font-medium">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <h2 className="text-3xl font-bold text-puce-500 mb-4">Få ditt tilbud i dag</h2>
              <p className="text-xl text-puce-500 mb-6">
                Gratis konsultasjon og tilbud
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

          {/* FAQ Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-puce-500 mb-8 text-center">Ofte stilte spørsmål</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {service.faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-puce-500 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-puce-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Services */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-puce-500 mb-8 text-center">Relaterte tjenester</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(services).filter(([key]) => key !== slug).slice(0, 3).map(([key, relatedService]) => (
                <Link
                  key={key}
                  to={`/services/${key}`}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <img
                    src={relatedService.image}
                    alt={relatedService.title}
                    className="w-full h-32 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-bold text-puce-500 mb-2 group-hover:text-gold-500 transition-colors duration-300">
                    {relatedService.title}
                  </h3>
                  <p className="text-puce-500 text-sm mb-4">
                    {relatedService.description.substring(0, 100)}...
                  </p>
                  <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors duration-300">
                    Les mer
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ServiceDetail;
