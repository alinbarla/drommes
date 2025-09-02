import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, Facebook, ChevronDown, ChevronUp, Star } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { getBreadcrumbsFromPath } from '../utils/breadcrumbs';

const Contact = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const categories = ['Tømrer','Graving','Våtrom','Murer','Maling','Elektriker','Rørlegger','Kjøkken','Arkitekt','Materialer'];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Hvordan får jeg et tilbud?",
      answer: "Fyll ut kontaktformen på denne siden eller ring oss direkte på +47 472 94 697. Vi kommer til ditt hjem eller kontor for å vurdere prosjektet og gi deg et detaljert tilbud innen 24 timer."
    },
    {
      question: "Hvor raskt svarer dere?",
      answer: "Vi svarer vanligvis innen 2 timer på hverdager. For akutte behov er vi tilgjengelige 24/7 på vårt nødnummer. Alle henvendelser får svar innen 24 timer."
    },
    {
      question: "Tilbyr dere gratis konsultasjon?",
      answer: "Ja, vi tilbyr gratis konsultasjon for alle prosjekter. Vårt team kommer til deg for å vurdere prosjektet og gi deg råd. Ingen forpliktelser eller skjulte kostnader."
    },
    {
      question: "Hvilke områder dekker dere?",
      answer: "Vi dekker hele Drammen-området inkludert Lier, Svelvik, Holmestrand og omkringliggende kommuner. Vi tilbyr også reise til større prosjekter i Viken fylkeskommune."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState('sending');
    setSubmitMessage('');
    try {
      await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, to: 'drammenbygg@gmail.com' })
      });
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
      setSubmitState('success');
      setSubmitMessage('Meldingen ble sendt! Vi tar kontakt så snart som mulig.');
    } catch (err) {
      setSubmitState('error');
      setSubmitMessage('Noe gikk galt. Prøv igjen senere.');
    }
  };

  const contactInfo = [
    { icon: MapPin, title: 'Adresse', details: ['Jonas Lies vei 43', 'Drammen 3022'] },
    { icon: Phone, title: 'Telefon', details: ['+47 472 94 697'] },
    { icon: Mail, title: 'E‑post', details: ['drammenbygg@gmail.com'] },
    { icon: Clock, title: 'Åpningstider', details: ['Søndag–Fredag: 08:00–20:00', 'Lørdag: Stengt'] }
  ];

  return (
    <>
      <SEO 
        title="Kontakt Oss - Drømme Huset AS | Bygg og Anlegg i Drammen"
        description="Kontakt Drømme Huset AS for bygg og anleggstjenester i Drammen, Lier, Svelvik og Holmestrand. Gratis konsultasjon og tilbud. Ring +47 472 94 697 eller send oss en melding."
        url="https://dromehusetditt.no/contact"
      />
      <StructuredData 
        type="ContactPage" 
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
        type="BreadcrumbList" 
        data={{ breadcrumbs }}
      />
      <main className="min-h-screen py-20 bg-sand-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-puce-500 mb-6">
            Kontakt Oss
          </h1>
          <p className="text-xl text-puce-500 max-w-3xl mx-auto">
            Klar til å starte ditt byggeprosjekt? Kontakt oss i dag for en 
            gratis konsultasjon og la oss gjøre din visjon til virkelighet i Drammen-området.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <section className="bg-white p-8 rounded-2xl shadow-lg" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className="text-2xl font-bold text-puce-500 mb-6">Send oss en melding</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitState === 'success' && (
                <div className="border border-green-300 bg-green-100 text-green-800 px-4 py-3 rounded-xl">
                  {submitMessage}
                </div>
              )}
              {submitState === 'error' && (
                <div className="border border-red-300 bg-red-100 text-red-800 px-4 py-3 rounded-xl">
                  {submitMessage}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-puce-500 mb-2">
                    Fullt navn *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                    placeholder="Ditt fulle navn"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-puce-500 mb-2">
                    E‑post *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                    placeholder="din.epost@eksempel.no"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-puce-500 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                    placeholder="+47 472 94 697"
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-puce-500 mb-2">
                    Tjenestetype
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Velg tjeneste</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-puce-500 mb-2">
                  Prosjektbeskrivelse *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                  placeholder="Fortell oss om prosjektet, tidslinje og behov..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitState === 'sending'}
                className={`btn-premium w-full py-4 px-6 rounded-xl hover:shadow-xl hover:scale-105 flex items-center justify-center group ${submitState === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitState === 'sending' ? 'Sender...' : 'Send melding'}
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </section>

          {/* Contact Information */}
          <aside className="space-y-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-golden-500 p-3 rounded-xl">
                    <info.icon className="h-6 w-6 text-navy-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Google Maps Integration */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-puce-500 mb-4">Finn oss</h3>
              <div className="h-64 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.0!2d10.2045!3d59.7440!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464113b8b8b8b8b8%3A0x1234567890abcdef!2sJonas%20Lies%20vei%2043%2C%203022%20Drammen!5e0!3m2!1sno!2sno!4v1234567890123!5m2!1sno!2sno"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kart som viser lokasjonen til Drømme Huset AS på Jonas Lies vei 43, Drammen"
                  aria-label="Interaktivt kart som viser lokasjonen til Drømme Huset AS"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-puce-500">
                  Jonas Lies vei 43, 3022 Drammen
                </p>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Jonas+Lies+vei+43,+3022+Drammen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-500 hover:text-gold-400 text-sm font-medium transition-colors"
                >
                  Få veibeskrivelse
                </a>
              </div>
            </div>

            <a
              href="https://www.facebook.com/share/1F8UL7tZqo/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-3"
            >
              <Facebook className="h-6 w-6 text-puce-500" />
              <span className="text-puce-500 font-medium">Besøk oss på Facebook</span>
            </a>

            <Link
              to="/review"
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-3"
            >
              <Star className="h-6 w-6 text-puce-500" />
              <span className="text-puce-500 font-medium">Skriv en anmeldelse</span>
            </Link>

            {/* Local Business Information */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-puce-500 mb-4">Lokal Entreprenør i Drammen</h3>
              <div className="space-y-3 text-puce-500">
                <p className="text-sm">
                  <strong>Organisasjonsnummer:</strong> 123 456 789
                </p>
                <p className="text-sm">
                  <strong>MVA-nummer:</strong> NO123456789MVA
                </p>
                <p className="text-sm">
                  <strong>Ansvarsforsikring:</strong> Gjensidige Forsikring
                </p>
                <p className="text-sm">
                  <strong>Yrkesskadeforsikring:</strong> Gjensidige Forsikring
                </p>
                <p className="text-sm">
                  <strong>Medlemskap:</strong> Byggeindustrien, Drammen Handelskammer
                </p>
              </div>
            </div>

            {/* Service Areas */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-puce-500 mb-4">Våre Serviceområder</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-puce-500">
                <div>• Drammen sentrum</div>
                <div>• Lierbyen</div>
                <div>• Svelvik</div>
                <div>• Holmestrand</div>
                <div>• Konnerud</div>
                <div>• Gulskogen</div>
                <div>• Åssiden</div>
                <div>• Bragernes</div>
                <div>• Tranby</div>
                <div>• Lierskogen</div>
                <div>• Sande</div>
                <div>• Hof</div>
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ Section */}
        <section className="mt-20" aria-labelledby="contact-faq-heading">
          <header className="text-center mb-16">
            <h2 id="contact-faq-heading" className="text-3xl md:text-4xl font-bold text-puce-500 mb-6">
              Vanlige Spørsmål
            </h2>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Svar på de vanligste spørsmålene om våre tjenester og prosjekter
            </p>
          </header>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-sand-500 transition-colors duration-300"
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
        </section>
      </div>
      </main>
    </>
  );
};

export default Contact;