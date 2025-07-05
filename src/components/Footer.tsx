import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  URBAN PROMO
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('footer.company.description')}
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  {t('footer.social.title')}
                </h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: '#', label: 'Facebook' },
                    { icon: Twitter, href: '#', label: 'Twitter' },
                    { icon: Instagram, href: '#', label: 'Instagram' },
                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                    { icon: Youtube, href: '#', label: 'YouTube' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-gray-800 hover:bg-yellow-400 flex items-center justify-center transition-all duration-300 hover:scale-110 rounded-lg group"
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">
                {t('footer.quickLinks.title')}
              </h4>
              <ul className="space-y-3">
                {[
                  { name: t('footer.quickLinks.about'), href: '#about' },
                  { name: t('footer.quickLinks.projects'), href: '#projects' },
                  { name: t('footer.quickLinks.showcase'), href: '#showcase' },
                  { name: t('footer.quickLinks.lifestyle'), href: '#lifestyle' },
                  { name: t('footer.quickLinks.contact'), href: '#contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">
                {t('footer.services.title')}
              </h4>
              <ul className="space-y-3">
                {[
                  { name: t('footer.services.development'), href: '#' },
                  { name: t('footer.services.investment'), href: '#' },
                  { name: t('footer.services.consulting'), href: '#' },
                  { name: t('footer.services.management'), href: '#' },
                  { name: t('footer.services.design'), href: '#' }
                ].map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">
                {t('footer.contact.title')}
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">
                      123 Urban Plaza, Downtown District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    +1 (234) 567-8900
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <a href="mailto:info@urbanpromo.com" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    info@urbanpromo.com
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="pt-4">
                <h5 className="text-md font-semibold text-white mb-3">
                  {t('footer.newsletter.title')}
                </h5>
                <div className="flex">
                  <input
                    type="email"
                    placeholder={t('footer.newsletter.placeholder')}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-white placeholder-gray-400 text-sm rounded-l-lg"
                  />
                  <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition-colors duration-200 rounded-r-lg">
                    {t('footer.newsletter.subscribe')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-sm">
                  © 2025 Urban Promo. {t('footer.copyright')}
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200">
                    {t('footer.legal.privacy')}
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200">
                    {t('footer.legal.terms')}
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200">
                    {t('footer.legal.cookies')}
                  </a>
                </div>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="group flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-all duration-200 hover:translate-y-1"
              >
                <span className="text-sm">{t('footer.backToTop')}</span>
                <div className="w-8 h-8 bg-gray-800 group-hover:bg-yellow-400 flex items-center justify-center transition-all duration-200 rounded-full">
                  <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-black" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;