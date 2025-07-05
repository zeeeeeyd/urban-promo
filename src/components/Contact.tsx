import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
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

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-yellow-600 text-sm font-semibold tracking-wider uppercase border border-yellow-400/30 px-6 py-2 backdrop-blur-sm bg-yellow-400/10 rounded-full">
              {t('contact.subtitle')}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
            {t('contact.title')}
          </h2>
          
          <p className="text-md text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-8">
                {t('contact.info.title')}
              </h3>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="group flex items-start space-x-4 p-6 bg-white border border-gray-200 hover:border-yellow-400/50 hover:shadow-xl transition-all duration-300 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 rounded-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-1">
                      {t('contact.info.phone.title')}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t('contact.info.phone.description')}
                    </p>
                    <a href="tel:+1234567890" className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-6 bg-white border border-gray-200 hover:border-yellow-400/50 hover:shadow-xl transition-all duration-300 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-1">
                      {t('contact.info.email.title')}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t('contact.info.email.description')}
                    </p>
                    <a href="mailto:info@urbanpromo.com" className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
                      info@urbanpromo.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-6 bg-white border border-gray-200 hover:border-yellow-400/50 hover:shadow-xl transition-all duration-300 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-1">
                      {t('contact.info.address.title')}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t('contact.info.address.description')}
                    </p>
                    <p className="text-yellow-600 font-medium text-sm">
                      123 Urban Plaza, Downtown District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="bg-white p-8 border border-gray-200 shadow-xl rounded-lg">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg"
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg"
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg"
                        placeholder={t('contact.form.phonePlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.subject')}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg"
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full group flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-4 font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 rounded-lg"
                  >
                    <span>{t('contact.form.submit')}</span>
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-6 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t('contact.success.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('contact.success.message')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;