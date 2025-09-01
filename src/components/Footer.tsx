import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Tømrer', 'Graving', 'Våtrom', 'Murer', 'Maling', 'Elektriker', 'Rørlegger', 'Kjøkken', 'Arkitekt', 'Materialer'
  ];

  const quickLinks = [
    { path: '/', label: 'Hjem' },
    { path: '/about', label: 'Om oss' },
    { path: '/gallery', label: 'Prosjekter' },
    { path: '/contact', label: 'Kontakt' },
    { path: '/review', label: 'Skriv anmeldelse' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/1F8UL7tZqo/', label: 'Facebook' }
  ];

  return (
    <footer className="bg-puce-500 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
                         <div className="flex items-center space-x-3 mb-6">
               <div>
                 <img src="/logo.png" alt="Drømme Huset AS Logo" className="h-16 w-auto" />
               </div>
               <span className="text-lg font-bold">Drømme Huset AS</span>
             </div>
                                     <p className="text-gray-300 mb-6 leading-relaxed">
              Med over 25 års erfaring som tømrere og byggmestere leverer vi håndverk av høyeste kvalitet og pålitelighet, fra start til ferdig nøkkel, for både private og bedrifter.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-orange-500 hover:bg-gold-500 hover:text-puce-500 p-3 rounded-lg transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gold-500">Våre Tjenester</h3>
            <ul className="space-y-3">
              {services.map((service, index) => {
                const serviceSlug = service.toLowerCase()
                  .replace('æ', 'ae')
                  .replace('ø', 'o')
                  .replace('å', 'a')
                  .replace('våtrom', 'vatromsrenovering')
                  .replace('kjøkken', 'kjokkenrenovering')
                  .replace('rørlegger', 'rorlegger')
                  .replace('elektriker', 'elektriker')
                  .replace('murer', 'murerarbeid')
                  .replace('tømrer', 'tomrerarbeid');
                
                return (
                  <li key={index}>
                    <Link
                      to={`/services/${serviceSlug}`}
                      className="text-sand-500 hover:text-gold-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {service}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gold-500">Hurtiglenker</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sand-500 hover:text-gold-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gold-500">Kontaktinfo</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sand-500">
                    Jonas Lies vei 43<br />
                    Drammen 3022
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold-500 flex-shrink-0" />
                                 <a
                   href="tel:+4747294697"
                   className="text-sand-500 hover:text-gold-400 transition-colors duration-300"
                 >
                   +47 472 94 697
                 </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold-500 flex-shrink-0" />
                <a
                  href="mailto:drammenbygg@gmail.com"
                  className="text-sand-500 hover:text-gold-400 transition-colors duration-300"
                >
                  drammenbygg@gmail.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gold-500 flex-shrink-0" />
                <div>
                  <p className="text-sand-500">
                    Søndag–Fredag: 08:00–20:00<br />
                    Lørdag: Stengt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                         <div className="text-sand-500 text-sm">
               © {currentYear} Drømme Huset AS. Alle rettigheter forbeholdt.
             </div>
                         <div className="flex space-x-6 text-sm">
               <a href="#" className="text-sand-500 hover:text-gold-400 transition-colors duration-300">
                 Personvern
               </a>
               <a href="#" className="text-sand-500 hover:text-gold-400 transition-colors duration-300">
                 Brukervilkår
               </a>
               <a href="#" className="text-sand-500 hover:text-gold-400 transition-colors duration-300">
                 Cookie-policy
               </a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
