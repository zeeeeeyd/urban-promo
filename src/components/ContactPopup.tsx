import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Phone, MessageCircle, Instagram, ExternalLink } from 'lucide-react';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup = ({ isOpen, onClose }: ContactPopupProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const contactOptions = [
    {
      icon: Phone,
      title: t('contact.popup.phone.title'),
      description: t('contact.popup.phone.description'),
      action: () => window.open('tel:+1234567890', '_self'),
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      icon: MessageCircle,
      title: t('contact.popup.whatsapp.title'),
      description: t('contact.popup.whatsapp.description'),
      action: () => window.open('https://wa.me/1234567890', '_blank'),
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      icon: Instagram,
      title: t('contact.popup.instagram.title'),
      description: t('contact.popup.instagram.description'),
      action: () => window.open('https://instagram.com/urbanpromo', '_blank'),
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fade-in-scale">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <h3 className="text-xl font-bold text-white mb-2">
            {t('contact.popup.title')}
          </h3>
          <p className="text-white/90 text-sm">
            {t('contact.popup.subtitle')}
          </p>
        </div>

        {/* Contact Options */}
        <div className="p-6 space-y-4">
          {contactOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className={`w-full group relative overflow-hidden bg-gradient-to-r ${option.color} ${option.hoverColor} text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <option.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-lg mb-1">
                    {option.title}
                  </h4>
                  <p className="text-white/90 text-sm">
                    {option.description}
                  </p>
                </div>
                
                <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-gray-600 text-sm">
            {t('contact.popup.footer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;