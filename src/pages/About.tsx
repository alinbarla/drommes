import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Award, Target, Users, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import LocalBusinessInfo from '../components/LocalBusinessInfo';
import { getBreadcrumbsFromPath } from '../utils/breadcrumbs';

const About = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);
  
  const values = [
    {
      icon: Award,
      title: 'Ekspertise',
      description: 'Vi opprettholder høyeste standarder i hvert prosjekt og sikrer overlegen kvalitet og håndverk.'
    },
    {
      icon: Target,
      title: 'Presisjon',
      description: 'Vår oppmerksomhet på detaljer og presis utførelse skiller oss ut i byggebransjen.'
    },
    {
      icon: Users,
      title: 'Samarbeid',
      description: 'Samarbeidsorientert tilnærming med kunder, arkitekter og underentreprenører for sømløs prosjektlevering.'
    },
    {
      icon: Shield,
      title: 'Sikkerhet',
      description: 'Sikkerhet er vår høyeste prioritet, med omfattende protokoller og kontinuerlige opplæringsprogrammer.'
    }
  ];

  const companyStats = [
    {
      number: '500+',
      label: 'Fullførte Prosjekter',
      description: 'Fra små reparasjoner til store kommersielle komplekser'
    },
    {
      number: '25+',
      label: 'Års Erfaring',
      description: 'Siden 1999 har vi levert kvalitet og pålitelighet'
    },
    {
      number: '98%',
      label: 'Kundetilfredshet',
      description: 'Basert på våre siste 100 prosjekter'
    },
    {
      number: '24/7',
      label: 'Nødhjelp',
      description: 'Tilgjengelige for akutte behov'
    }
  ];

  const certifications = [
    'Godkjent entreprenør',
    'Sikkerhetsutdannet',
    'Miljøsertifisert',
    'Forsikret entreprenør'
  ];

  const aboutFaqs = [
    {
      question: "Hvor lenge har Drømme Huset AS vært i bransjen?",
      answer: "Drømme Huset AS har vært i byggebransjen siden 1999, det vil si over 25 år. Vi har bygget opp en solid erfaring og et godt rykte i Drammen-området."
    },
    {
      question: "Hvilke sertifikater og godkjenninger har dere?",
      answer: "Vi er godkjent entreprenør med alle nødvendige sertifikater, inkludert sikkerhetsutdanning, miljøsertifisering og vi er fullt forsikret. Alle våre ansatte har relevante faglige kompetanser."
    },
    {
      question: "Hvilke områder dekker dere?",
      answer: "Vi dekker hele Drammen-området inkludert Lier, Svelvik, Holmestrand og omkringliggende kommuner. Vi tilbyr også reise til større prosjekter i Viken fylkeskommune."
    },
    {
      question: "Hvor mange prosjekter har dere fullført?",
      answer: "Vi har fullført over 500 prosjekter siden oppstarten i 1999. Dette inkluderer alt fra små reparasjoner til store kommersielle komplekser og boligprosjekter."
    }
  ];

  return (
    <>
      <SEO 
        title="Om Oss - Drømme Huset AS | Bygg og Anlegg i Drammen"
        description="Lær mer om Drømme Huset AS. Over 25 års erfaring i bygg og anlegg i Drammen, Lier, Svelvik og Holmestrand. Vi leverer kvalitet, innovasjon og pålitelige løsninger for alle dine byggeprosjekter."
        url="https://dromehusetditt.no/about"
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
        data={{ faqs: aboutFaqs }}
      />
      <StructuredData 
        type="BreadcrumbList" 
        data={{ breadcrumbs }}
      />
      <StructuredData 
        type="Person" 
        data={{
          name: "Erik Sivertsen",
          jobTitle: "Grunnlegger & Byggmester",
          description: "Over 25 års erfaring i byggebransjen. Spesialist på komplekse byggeprosjekter og kvalitetskontroll.",
          image: "https://dromehusetditt.no/images/team/erik-sivertsen.jpg"
        }}
      />
      <StructuredData 
        type="Person" 
        data={{
          name: "Maria Hansen",
          jobTitle: "Prosjektleder",
          description: "Erfaren prosjektleder med fokus på kundeservice og tidsplanlegging. Sikrer at alle prosjekter leveres på tid.",
          image: "https://dromehusetditt.no/images/team/maria-hansen.jpg"
        }}
      />
      <StructuredData 
        type="Person" 
        data={{
          name: "Knut Johansen",
          jobTitle: "Hovedtømrer",
          description: "Mestertømrer med spesialisering på tak, gulv og vinduer. Over 20 års erfaring med kvalitetshåndverk.",
          image: "https://dromehusetditt.no/images/team/knut-johansen.jpg"
        }}
      />
      <main className="min-h-screen py-20 bg-sand-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-puce-500 mb-6">
            Om Drømme Huset AS
          </h1>
          <p className="text-xl text-puce-500 max-w-3xl mx-auto">
            Vi bygger morgendagens landemerker i dag med et arv av ekspertise, 
            innovasjon og uopphørlig engasjement for kvalitetsbygg i Drammen-området.
          </p>
        </header>

        {/* Company Story */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20" aria-labelledby="company-history">
          <article>
            <h2 id="company-history" className="text-3xl md:text-4xl font-bold text-puce-500 mb-6">
              Vår Historie
            </h2>
            <div className="space-y-6 text-puce-500 text-lg leading-relaxed">
              <p>
                Grunnlagt i 1999 har Drømme Huset AS vokst fra et lite lokalt tømrerfirma 
                til et av regionens mest betrodde byggeselskaper. Vår reise begynte i 
                <Link to="/location/drammen" className="text-gold-500 hover:text-gold-400 underline"> Drammen</Link> med 
                en enkel misjon: å levere eksepsjonelle byggeløsninger som overgår 
                kundeforventninger i hele Drammen-området.
              </p>
              <p>
                I løpet de siste 25 årene har vi fullført over 500 prosjekter fra 
                boliger i <Link to="/location/lier" className="text-gold-500 hover:text-gold-400 underline">Lier</Link> til store kommersielle komplekser i 
                <Link to="/location/svelvik" className="text-gold-500 hover:text-gold-400 underline"> Svelvik</Link> og 
                <Link to="/location/holmestrand" className="text-gold-500 hover:text-gold-400 underline"> Holmestrand</Link>. Vår suksess er bygget på 
                et fundament av integritet, kvalitetshåndverk og innovative byggeteknikker.
              </p>
              <p>
                I dag fortsetter Drømme Huset AS å sette industristandarder mens vi 
                omfavner bærekraftige byggemetoder og banebrytende teknologi for å 
                skape strukturer som tåler tidens test.
              </p>
            </div>
          </article>
          <aside className="relative">
            <img
              src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg"
              alt="Construction site"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-gold-500 text-puce-500 p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm font-medium">Projects Completed</div>
              </div>
            </div>
          </aside>
        </section>

        {/* Company Statistics */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-puce-500 mb-6">
              Våre Tall
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Tall som viser vår erfaring og pålitelighet i byggebransjen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-gold-500 mb-4">
                  {stat.number}
                </div>
                <h3 className="text-xl font-bold text-puce-500 mb-2">{stat.label}</h3>
                <p className="text-puce-500 leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-puce-500 mb-6">
              Våre Verdier
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Disse prinsippene veileder hver beslutning vi tar og hvert prosjekt vi utfører.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-gold-50"
              >
                <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-puce-500" />
                </div>
                <h3 className="text-xl font-bold text-puce-500 mb-4">{value.title}</h3>
                <p className="text-puce-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-puce-500 mb-6">
              Sertifikater og Godkjenninger
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Vi holder oss til høyeste standarder innen sikkerhet og kvalitet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gold-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-puce-500" />
                </div>
                <h3 className="text-lg font-semibold text-puce-500">{cert}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-puce-500 mb-6">
              Vårt Team
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Møt de erfarne fagfolkene som gjør Drømme Huset AS til en pålitelig partner for dine byggeprosjekter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-puce-500">ES</span>
              </div>
              <h3 className="text-xl font-bold text-puce-500 mb-2">Erik Sivertsen</h3>
              <p className="text-gold-500 font-semibold mb-2">Grunnlegger & Byggmester</p>
              <p className="text-puce-500 text-sm">
                Over 25 års erfaring i byggebransjen. Spesialist på komplekse byggeprosjekter og kvalitetskontroll.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-puce-500">MH</span>
              </div>
              <h3 className="text-xl font-bold text-puce-500 mb-2">Maria Hansen</h3>
              <p className="text-gold-500 font-semibold mb-2">Prosjektleder</p>
              <p className="text-puce-500 text-sm">
                Erfaren prosjektleder med fokus på kundeservice og tidsplanlegging. Sikrer at alle prosjekter leveres på tid.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-puce-500">KJ</span>
              </div>
              <h3 className="text-xl font-bold text-puce-500 mb-2">Knut Johansen</h3>
              <p className="text-gold-500 font-semibold mb-2">Hovedtømrer</p>
              <p className="text-puce-500 text-sm">
                Mestertømrer med spesialisering på tak, gulv og vinduer. Over 20 års erfaring med kvalitetshåndverk.
              </p>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-puce-500 mb-6">
              Serviceområder
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Vi dekker hele Drammen-området og tilbyr våre tjenester i følgende kommuner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LocalBusinessInfo location="Drammen" />
            <LocalBusinessInfo location="Lier" />
            <LocalBusinessInfo location="Svelvik" />
            <LocalBusinessInfo location="Holmestrand" />
          </div>
        </div>

        {/* Local Business Citations */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-puce-500 mb-6">
              Medlemskap og Sertifiseringer
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Vi er stolte medlemmer av bransjeorganisasjoner og holder oss oppdatert på de nyeste standardene
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-puce-500" />
              </div>
              <h3 className="text-lg font-semibold text-puce-500 mb-2">Byggeindustrien</h3>
              <p className="text-sm text-puce-500">Medlem av Byggeindustrien - Norges største bransjeorganisasjon</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-puce-500" />
              </div>
              <h3 className="text-lg font-semibold text-puce-500 mb-2">Godkjent Entreprenør</h3>
              <p className="text-sm text-puce-500">Registrert som godkjent entreprenør hos Brønnøysundregistrene</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-gold-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-puce-500" />
              </div>
              <h3 className="text-lg font-semibold text-puce-500 mb-2">ISO 9001</h3>
              <p className="text-sm text-puce-500">Sertifisert kvalitetssystem for kontinuerlig forbedring</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20" aria-labelledby="about-faq-heading">
          <header className="text-center mb-16">
            <h2 id="about-faq-heading" className="text-3xl md:text-4xl font-bold text-puce-500 mb-6">
              Ofte Stilte Spørsmål
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Svar på vanlige spørsmål om Drømme Huset AS og våre tjenester
            </p>
          </header>

          <div className="max-w-4xl mx-auto space-y-4">
            {aboutFaqs.map((faq, index) => (
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
      </div>
      </main>
    </>
  );
};

export default About;