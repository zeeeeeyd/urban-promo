import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock, Users } from 'lucide-react';
import ContactPopup from './ContactPopup';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const stats = [
    { icon: MessageSquare, value: '24/7', label: t('contact.stats.support') },
    { icon: Clock, value: '<1h', label: t('contact.stats.response') },
    { icon: Users, value: '500+', label: t('contact.stats.clients') }
  ];

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase border border-yellow-400/30 px-6 py-2 backdrop-blur-sm bg-yellow-400/10 rounded-full">
              {t('contact.subtitle')}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {t('contact.title')}
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-8">
                {t('contact.info.title')}
              </h3>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-yellow-400/50 p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-start space-x-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 rounded-xl">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {t('contact.info.phone.title')}
                      </h4>
                      <p className="text-gray-400 mb-3">
                        {t('contact.info.phone.description')}
                      </p>
                      <a href="tel:+1234567890" className="text-yellow-400 hover:text-yellow-300 font-medium text-lg transition-colors duration-200">
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-yellow-400/50 p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-start space-x-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 rounded-xl">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {t('contact.info.email.title')}
                      </h4>
                      <p className="text-gray-400 mb-3">
                        {t('contact.info.email.description')}
                      </p>
                      <a href="mailto:info@urbanpromo.com" className="text-yellow-400 hover:text-yellow-300 font-medium text-lg transition-colors duration-200">
                        info@urbanpromo.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-yellow-400/50 p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-start space-x-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 rounded-xl">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {t('contact.info.address.title')}
                      </h4>
                      <p className="text-gray-400 mb-3">
                        {t('contact.info.address.description')}
                      </p>
                      <p className="text-yellow-400 font-medium text-lg">
                        123 Urban Plaza, Downtown District<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Button */}
              <div className="pt-8">
                <button
                  onClick={() => setIsContactPopupOpen(true)}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-6 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25 rounded-2xl"
                >
                  <span className="relative z-10">{t('contact.quickContact')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-8 shadow-2xl rounded-2xl">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-400 transition-all duration-200 rounded-lg"
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-400 transition-all duration-200 rounded-lg"
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-400 transition-all duration-200 rounded-lg"
                        placeholder={t('contact.form.phonePlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('contact.form.subject')}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-white transition-all duration-200 rounded-lg"
                      >
                        <option value="">{t('contact.form.subjectPlaceholder')}</option>
                        <option value="general">{t('contact.form.subjects.general')}</option>
                        <option value="investment">{t('contact.form.subjects.investment')}</option>
                        <option value="partnership">{t('contact.form.subjects.partnership')}</option>
                        <option value="media">{t('contact.form.subjects.media')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-400 transition-all duration-200 rounded-lg resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full group flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 rounded-lg"
                  >
                    <span>{t('contact.form.submit')}</span>
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 flex items-center justify-center mx-auto mb-6 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('contact.success.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('contact.success.message')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
      />
    </section>
  );
};

export default Contact;