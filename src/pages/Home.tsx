import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import PerformanceImage from '../components/PerformanceImage';
import StructuredData from '../components/StructuredData';
import { getBreadcrumbsFromPath } from '../utils/breadcrumbs';

const Home = () => {
  const location = useLocation();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Hvor mye koster et typisk byggeprosjekt?",
              answer: "Vi tilbyr gratis tilbud og detaljerte overslag for alle prosjekter. Kostnaden varierer basert på prosjektets omfang og kompleksitet. Kontakt oss for et personlig tilbud tilpasset ditt behov."
    },
    {
      question: "Hvor lang tid tar et typisk prosjekt?",
      answer: "Prosjekttiden avhenger av prosjektets størrelse. Et våtrom tar vanligvis 2-3 uker, kjøkkenrenovering 3-4 uker, mens større prosjekter kan ta 2-6 måneder. Vi kommuniserer alltid realistiske tidsrammer og holder deg oppdatert gjennom hele prosessen."
    },
    {
      question: "Tilbyr dere gratis tilbud og konsultasjon?",
      answer: "Ja, vi tilbyr gratis tilbud og konsultasjon for alle prosjekter. Vårt team kommer til ditt hjem eller kontor for å vurdere prosjektet og gi deg et detaljert tilbud. Ingen forpliktelser eller skjulte kostnader."
    },
    {
      question: "Jobber dere i hele Drammen-området?",
      answer: "Ja, vi dekker hele Drammen-området inkludert Lier, Svelvik, Holmestrand, Konnerud, Gulskogen, Åssiden, Bragernes og omkringliggende kommuner i Viken fylkeskommune. Vi tilbyr også reise til større prosjekter i Buskerud og Vestfold. Kontakt oss for å bekrefte dekning i ditt område."
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Tømrerarbeid',
      description: 'Profesjonelle tømrerarbeider med høy kvalitet og presisjon i Drammen-området. Vi leverer alt fra tak og gulv til vinduer og dører. Gratis tilbud og 5 års garanti på alle arbeider.',
      image: '/images/tomrer/main.avif',
      category: 'Tømrer'
    },
    {
      id: 2,
      title: 'Gravetjenester',
      description: 'Kompetent graving og grunnarbeid for alle typer prosjekter i Drammen, Lier, Svelvik og Holmestrand. Vi har egen maskinpark og erfaren operatører. Rask levering og konkurransedyktige priser.',
      image: '/images/graving/main.avif',
      category: 'Graving'
    },
    {
      id: 3,
      title: 'Våtrom',
      description: 'Komplette våtromsrenoveringer med moderne design og funksjonalitet. Vi bruker kun kvalitetsmaterialer og tilbyr 10 års garanti på våtromsarbeid.',
      image: '/images/vatrom/main.avif',
      category: 'Våtrom'
    },
    {
      id: 4,
      title: 'Murerarbeid',
      description: 'Solid murerarbeid med tradisjonelle og moderne teknikker. Vi leverer alt fra fundament til fasadearbeid. Gratis konsultasjon og detaljert tilbud.',
      image: '/images/murer/main.avif',
      category: 'Murer'
    },
    {
      id: 5,
      title: 'Maling',
      description: 'Profesjonell maling og overflatebehandling for alle overflater. Vi bruker miljøvennlige produkter og tilbyr både innvendig og utvendig maling.',
      image: '/images/maling/main.avif',
      category: 'Maling'
    },
    {
      id: 6,
      title: 'Elektriker',
      description: 'Sikker elektrisk installasjon og vedlikehold av høy kvalitet. Vi er godkjent elektriker med alle nødvendige sertifikater. 24/7 nødhjelp tilgjengelig.',
      image: '/images/elektriker/main.avif',
      category: 'Elektriker'
    },
    {
      id: 7,
      title: 'Rørlegger',
      description: 'Kompetent rørleggerarbeid og sanitetssystemer. Vi leverer alt fra ny installasjon til reparasjoner. Gratis diagnose og rask respons.',
      image: '/images/rorlegger/main.avif',
      category: 'Rørlegger'
    },
    {
      id: 8,
      title: 'Kjøkken-møbler',
      description: 'Skreddersydde kjøkken-møbler med moderne design og funksjonalitet. Vi tilbyr gratis designkonsultasjon og leverer fra skap til komplett kjøkken.',
      image: '/images/kjokken/main.avif',
      category: 'Kjøkken'
    },
    {
      id: 9,
      title: 'Arkitekt',
      description: 'Profesjonell arkitekttegning og planlegging for dine byggeprosjekter. Vi hjelper deg med byggesøknader og detaljplaner. Gratis første konsultasjon.',
      image: '/images/arkitekt/main.avif',
      category: 'Arkitekt'
    },
    {
      id: 10,
      title: 'Salg av byggematerialer',
      description: 'Kvalitetsbyggematerialer til konkurransedyktige priser. Vi leverer direkte til byggeplass og tilbyr rabatter for større ordrer.',
      image: '/images/salg-av-byggematerialer/main.avif',
      category: 'Materialer'
    }
  ];





  return (
    <>
      <SEO 
        title="Drømme Huset AS - Bygg og Anlegg i Drammen | Tømrer, Murer, Elektriker"
        description="Drømme Huset AS leverer profesjonelle bygg og anleggstjenester i Drammen, Lier, Svelvik og Holmestrand. Tømrer, murer, elektriker, rørlegger, våtrom og kjøkken. Over 25 års erfaring i Viken fylkeskommune."
        url="https://drommehusetditt.no"
      />
      <StructuredData 
        type="WebSite" 
        data={{}}
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
        type="FAQ" 
        data={{ faqs }}
      />
      <StructuredData 
        type="Review" 
        data={{
          author: "Anders Sivertsen",
          review: "Drømme Huset AS leverte et fantastisk våtromsprosjekt. De var profesjonelle, ryddige og leverte akkurat det vi ønsket oss. Kan varmt anbefales!"
        }}
      />
      <StructuredData 
        type="Review" 
        data={{
          author: "Maria Hansen",
          review: "Kjøkkenrenoveringen ble levert på tid og innenfor budsjett. Teamet var dyktige og tok godt vare på hjemmet vårt under arbeidet."
        }}
      />
      <StructuredData 
        type="Review" 
        data={{
          author: "Knut Johansen",
          review: "Elektrikerarbeidet ble utført raskt og profesjonelt. De var tilgjengelige da vi trengte dem og løste alle utfordringer effektivt."
        }}
      />
      {breadcrumbs.length > 1 && (
        <StructuredData 
          type="BreadcrumbList" 
          data={{ breadcrumbs }}
        />
      )}
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-32" style={{
        backgroundImage: 'url(/hero.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} aria-label="Hovedbanner med tjenesteoversikt">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
              <span className="block sm:inline">Profesjonelle</span>
              <span className="block sm:inline text-gold-500"> håndverkstjenester</span>
            </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Med over 20 års erfaring som tømrere og byggmestere leverer vi håndverk av høyeste kvalitet og pålitelighet, fra start til ferdig nøkkel: i Drammen, Oslo, Sandvika, Asker, Lier, Tonsberg, Kongsberg, Hoksund, Svelvik, Holmestrand, Baerum over 240 prosjekter
              </p>
            <Link
              to="/contact"
              className="btn-premium inline-flex items-center py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:shadow-xl hover:scale-105 group text-sm sm:text-base"
              aria-label="Kontakt oss for å starte ditt byggeprosjekt"
            >
              Start Ditt Prosjekt
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-sand-500" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-puce-500 mb-4 sm:mb-6 px-4 sm:px-0">
              Våre Tjenester
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-puce-500 max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
              Vi tilbyr pålitelige og profesjonelle håndverkstjenester innen tømrer, snekkerarbeid, graver, betong, våtromsrenovering, kjøkken møbler, maler, arkitekt, elektriker, rørlegger, selger av alle byggematerialer, til lokale kunder i hele Viken, Vestfold og Telemark fylkeskommune-i Drammen-området(~150km).
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 px-4 sm:px-0">
            {projects.map((project) => {
              const imageUrl = `${project.image}?t=${Date.now()}`;
              return (
              <Link
                key={project.id}
                to={`/services/${project.id === 1 ? 'tomrerarbeid' : project.id === 2 ? 'graving' : project.id === 3 ? 'vatromsrenovering' : project.id === 4 ? 'murerarbeid' : project.id === 5 ? 'maling' : project.id === 6 ? 'elektriker' : project.id === 7 ? 'rorlegger' : project.id === 8 ? 'kjokkenrenovering' : project.id === 9 ? 'arkitekt' : 'materialer'}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <PerformanceImage
                    src={imageUrl}
                    alt={`${project.title} i Drammen - ${project.description.substring(0, 50)}... Profesjonelle ${project.category.toLowerCase()}-tjenester fra Drømme Huset AS`}
                    className="w-full h-48 sm:h-56 md:h-64 group-hover:scale-110 transition-transform duration-500"
                    width={400}
                    height={256}
                    priority={project.id <= 3}
                    fallbackSrc="/hero.avif"

                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="btn-premium px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-puce-500 mb-2">
                        {project.title}
                      </h3>
                  <p className="text-puce-500 text-xs sm:text-sm leading-relaxed mb-3">
                        {project.description}
                      </p>
                  <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors duration-300 text-sm sm:text-base">
                    Se Tjeneste
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
            })}
          </div>

          <div className="text-center px-4 sm:px-0">
            <Link
              to="/gallery"
              className="btn-premium inline-flex items-center py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:shadow-xl hover:scale-105 group text-sm sm:text-base"
            >
              Se Alle Tjenester
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold text-puce-500 mb-6">
              Vanlige Spørsmål
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Svar på de vanligste spørsmålene om våre tjenester og prosjekter i Drammen, Lier, Svelvik og Holmestrand
            </p>
          </header>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-sand-500 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gold-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-puce-500">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gold-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gold-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-puce-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-puce-500 mb-4">
              Har du flere spørsmål?
            </p>
            <Link
              to="/contact"
              className="btn-premium inline-flex items-center py-3 px-6 rounded-xl hover:shadow-xl hover:scale-105 group"
            >
              Kontakt Oss
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold text-puce-500 mb-6">
              Kundetilbakemeldinger
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Se hva våre fornøyde kunder sier om våre tjenester og kvalitet i Drammen-området
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-sand-500 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-puce-500 mb-4">
                "Drømme Huset AS leverte et fantastisk våtromsprosjekt. De var profesjonelle, ryddige og leverte akkurat det vi ønsket oss. Kan varmt anbefales!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  AS
                </div>
                <div>
                  <p className="font-semibold text-puce-500">Anders Sivertsen</p>
                  <p className="text-sm text-puce-500">Våtromsrenovering, Drammen</p>
                </div>
              </div>
            </div>

            <div className="bg-sand-500 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-puce-500 mb-4">
                "Kjøkkenrenoveringen ble levert på tid og innenfor budsjett. Teamet var dyktige og tok godt vare på hjemmet vårt under arbeidet."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  MH
                </div>
                <div>
                  <p className="font-semibold text-puce-500">Maria Hansen</p>
                  <p className="text-sm text-puce-500">Kjøkkenrenovering, Lier</p>
                </div>
              </div>
            </div>

            <div className="bg-sand-500 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-puce-500 mb-4">
                "Elektrikerarbeidet ble utført raskt og profesjonelt. De var tilgjengelige da vi trengte dem og løste alle utfordringer effektivt."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  KJ
                </div>
                <div>
                  <p className="font-semibold text-puce-500">Knut Johansen</p>
                  <p className="text-sm text-puce-500">Elektrikerarbeid, Svelvik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Business Section */}
      <section className="py-20 bg-gradient-to-br from-gold-100 to-gold-200 text-puce-500" aria-labelledby="local-business-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 id="local-business-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Lokale Tømrere og Byggmestere i Drammen
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Vi er stolte av å være dyktige håndverkere og byggmestere i Drammen-området med over 25 års erfaring. 
              Som <Link to="/about" className="text-gold-400 hover:text-gold-300 underline">godkjent entreprenør</Link> leverer vi 
              <Link to="/gallery" className="text-gold-400 hover:text-gold-300 underline"> kvalitetsarbeid</Link> til 
              <Link to="/contact" className="text-gold-400 hover:text-gold-300 underline"> lokale kunder</Link> i hele regionen.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Serviceområder</h3>
              <p className="text-lg mb-4">
                Drammen, Lier, Svelvik, Holmestrand og omkringliggende kommuner
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Åpningstider</h3>
              <p className="text-lg mb-4">
                Søndag - Fredag: 08:00 - 20:00<br />
                Lørdag: Stengt
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Nødnummer</h3>
              <p className="text-lg mb-4">
                <a href="tel:+4747294697" className="text-puce-500 hover:text-puce-600 transition-colors">
                  +47 472 94 697
                </a>
              </p>
            </div>
          </div>

          {/* Local SEO Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Hvorfor velge Drømme Huset AS?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Lokal ekspertise</h4>
                <p className="text-sm">Over 25 års erfaring i Drammen-området</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Kvalitetsgaranti</h4>
                <p className="text-sm">Alle arbeider har 5-10 års garanti</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Rask respons</h4>
                <p className="text-sm">24/7 nødhjelp tilgjengelig</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Transparente priser</h4>
                <p className="text-sm">Ingen skjulte kostnader eller overraskelser</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
    </>
  );
};

export default Home;