import React from 'react';
import { MapPin, Phone, Mail, Clock, Award, Users } from 'lucide-react';

interface LocalBusinessInfoProps {
  location: string;
}

const LocalBusinessInfo: React.FC<LocalBusinessInfoProps> = ({ location }) => {
  const businessInfo = {
    'Drammen': {
      address: 'Jonas Lies vei 43, 3022 Drammen',
      phone: '+47 472 94 697',
      email: 'drammenbygg@gmail.com',
      hours: 'Søndag-Fredag: 08:00-20:00, Lørdag: Stengt',
      specialties: ['Våtromsrenovering', 'Kjøkkenrenovering', 'Tømrerarbeid', 'Elektriker'],
      areas: ['Drammen sentrum', 'Konnerud', 'Gulskogen', 'Åssiden', 'Bragernes']
    },
    'Lier': {
      address: 'Serviceområde: Lier, Lierbyen, Tranby',
      phone: '+47 472 94 697',
      email: 'drammenbygg@gmail.com',
      hours: 'Søndag-Fredag: 08:00-20:00, Lørdag: Stengt',
      specialties: ['Boligrenovering', 'Hyttebygging', 'Tømrerarbeid', 'Murerarbeid'],
      areas: ['Lierbyen', 'Tranby', 'Lierskogen', 'Reistad', 'Lierstranda']
    },
    'Svelvik': {
      address: 'Serviceområde: Svelvik og omkringliggende områder',
      phone: '+47 472 94 697',
      email: 'drammenbygg@gmail.com',
      hours: 'Søndag-Fredag: 08:00-20:00, Lørdag: Stengt',
      specialties: ['Villaer', 'Hytter', 'Våtromsrenovering', 'Tømrerarbeid'],
      areas: ['Svelvik sentrum', 'Svelvikstranda', 'Husvik', 'Krokstad']
    },
    'Holmestrand': {
      address: 'Serviceområde: Holmestrand og kystområder',
      phone: '+47 472 94 697',
      email: 'drammenbygg@gmail.com',
      hours: 'Søndag-Fredag: 08:00-20:00, Lørdag: Stengt',
      specialties: ['Kysthus', 'Renoveringer', 'Nybygg', 'Våtromsrenovering'],
      areas: ['Holmestrand sentrum', 'Hillestad', 'Ekeberg', 'Krokstad']
    }
  };

  const info = businessInfo[location as keyof typeof businessInfo] || businessInfo['Drammen'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-puce-500 mb-4">
        Drømme Huset AS i {location}
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gold-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-puce-500">Adresse</p>
            <p className="text-sm text-puce-500">{info.address}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5 text-gold-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-puce-500">Telefon</p>
            <a href={`tel:${info.phone}`} className="text-sm text-gold-500 hover:text-gold-400">
              {info.phone}
            </a>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-gold-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-puce-500">E-post</p>
            <a href={`mailto:${info.email}`} className="text-sm text-gold-500 hover:text-gold-400">
              {info.email}
            </a>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-gold-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-puce-500">Åpningstider</p>
            <p className="text-sm text-puce-500">{info.hours}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-sand-500">
        <h4 className="text-sm font-semibold text-puce-500 mb-2">Spesialiteter i {location}</h4>
        <div className="flex flex-wrap gap-2">
          {info.specialties.map((specialty, index) => (
            <span key={index} className="bg-gold-100 text-gold-700 px-2 py-1 rounded text-xs">
              {specialty}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-puce-500 mb-2">Serviceområder</h4>
        <div className="flex flex-wrap gap-2">
          {info.areas.map((area, index) => (
            <span key={index} className="bg-sand-500 text-puce-500 px-2 py-1 rounded text-xs">
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalBusinessInfo;
