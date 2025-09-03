import React, { useState } from 'react';
import { Star, Send, CheckCircle, User, MapPin } from 'lucide-react';
import SEO from './SEO';
import StructuredData from './StructuredData';

interface ReviewFormData {
  name: string;
  email: string;
  location: string;
  service: string;
  rating: number;
  review: string;
  projectType: string;
}

const ReviewCollection = () => {
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    email: '',
    location: '',
    service: '',
    rating: 5,
    review: '',
    projectType: ''
  });
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const services = [
    'Tømrerarbeid',
    'Våtromsrenovering', 
    'Kjøkkenrenovering',
    'Elektriker',
    'Murerarbeid',
    'Rørlegger',
    'Graving',
    'Maling',
    'Arkitekt',
    'Materialer'
  ];

  const locations = [
    'Drammen',
    'Lier',
    'Svelvik', 
    'Holmestrand',
    'Konnerud',
    'Gulskogen',
    'Åssiden',
    'Bragernes'
  ];

  const projectTypes = [
    'Små reparasjoner',
    'Renovering',
    'Nybygg',
    'Utvidelse',
    'Vedlikehold',
    'Nødhjelp'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('sending');
    setSubmitMessage('');

    try {
      // In a real application, you would send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setFormData({
        name: '',
        email: '',
        location: '',
        service: '',
        rating: 5,
        review: '',
        projectType: ''
      });
      setSubmitState('success');
      setSubmitMessage('Takk for din anmeldelse! Vi setter stor pris på tilbakemeldingen.');
    } catch (err) {
      setSubmitState('error');
      setSubmitMessage('Noe gikk galt. Prøv igjen senere.');
    }
  };

  return (
    <>
      <SEO 
        title="Skriv en anmeldelse - Drømme Huset AS | Bygg og Anlegg i Drammen"
        description="Del din opplevelse med Drømme Huset AS. Skriv en anmeldelse og hjelp andre å finne kvalitetsbygg og anleggstjenester i Drammen-området."
        url="https://drommehusetditt.no/review"
      />
      <StructuredData 
        type="Review" 
        data={{
          itemReviewed: {
            "@type": "LocalBusiness",
            "name": "Drømme Huset AS"
          },
          reviewRating: {
            "@type": "Rating",
            "ratingValue": "4.8",
            "bestRating": "5"
          },
          author: {
            "@type": "Person",
            "name": "Våre kunder"
          },
          reviewBody: "Profesjonelle bygg og anleggstjenester i Drammen-området"
        }}
      />
      
      <div className="min-h-screen py-20 bg-sand-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-puce-500 mb-6">
              Skriv en anmeldelse
            </h1>
            <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Del din opplevelse med Drømme Huset AS og hjelp andre å finne kvalitetsbygg og anleggstjenester i Drammen-området.
            </p>
          </header>

          {/* Review Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-puce-500 mb-6">Din anmeldelse</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitState === 'success' && (
                <div className="border border-green-300 bg-green-100 text-green-800 px-4 py-3 rounded-xl flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {submitMessage}
                </div>
              )}
              {submitState === 'error' && (
                <div className="border border-red-300 bg-red-100 text-red-800 px-4 py-3 rounded-xl">
                  {submitMessage}
                </div>
              )}

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-puce-500 mb-2">
                  Hvor fornøyd var du med tjenesten? *
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingChange(rating)}
                      className={`p-2 rounded-lg transition-colors ${
                        rating <= formData.rating
                          ? 'text-gold-500'
                          : 'text-gray-300 hover:text-gold-400'
                      }`}
                    >
                      <Star className="h-8 w-8 fill-current" />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-puce-500 mt-1">
                  {formData.rating === 1 && 'Meget utilfreds'}
                  {formData.rating === 2 && 'Utilfreds'}
                  {formData.rating === 3 && 'Nøytral'}
                  {formData.rating === 4 && 'Fornøyd'}
                  {formData.rating === 5 && 'Meget fornøyd'}
                </p>
              </div>

              {/* Personal Information */}
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
                    E-post
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                    placeholder="din.epost@eksempel.no"
                  />
                </div>
              </div>

              {/* Project Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-puce-500 mb-2">
                    Lokasjon *
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Velg lokasjon</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-puce-500 mb-2">
                    Tjeneste *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Velg tjeneste</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-puce-500 mb-2">
                  Type prosjekt
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Velg prosjekttype</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-puce-500 mb-2">
                  Din anmeldelse *
                </label>
                <textarea
                  id="review"
                  name="review"
                  required
                  rows={6}
                  value={formData.review}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                  placeholder="Fortell oss om din opplevelse med Drømme Huset AS. Hva likte du best? Hva kunne vært bedre? Hvilke råd vil du gi til andre kunder?"
                />
                <p className="text-sm text-puce-500 mt-1">
                  Minimum 50 tegn. Jo mer detaljert, jo bedre hjelp for andre kunder.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitState === 'sending'}
                className={`btn-premium w-full py-4 px-6 rounded-xl hover:shadow-xl hover:scale-105 flex items-center justify-center group ${submitState === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitState === 'sending' ? 'Sender anmeldelse...' : 'Send anmeldelse'}
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>

          {/* Why Reviews Matter */}
          <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-puce-500 mb-6 text-center">
              Hvorfor anmeldelser er viktige
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <User className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-puce-500 mb-2">Hjelp andre kunder</h3>
                <p className="text-puce-500 text-sm">
                  Din anmeldelse hjelper andre å finne kvalitetstjenester i Drammen-området
                </p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-puce-500 mb-2">Bygg tillit</h3>
                <p className="text-puce-500 text-sm">
                  Anmeldelser bygger tillit og hjelper oss å forbedre våre tjenester
                </p>
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-puce-500 mb-2">Lokal kunnskap</h3>
                <p className="text-puce-500 text-sm">
                  Del din lokale erfaring og hjelp naboer med å velge riktig entreprenør
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 bg-sand-500 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-puce-500 mb-2">Personvern</h3>
            <p className="text-puce-500 text-sm">
              Vi behandler dine personopplysninger i henhold til vår personvernpolicy. 
              Din anmeldelse kan publiseres på vår nettside, men vi vil aldri dele din e-postadresse 
              eller andre personlige opplysninger med tredjeparter uten ditt samtykke.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCollection;
