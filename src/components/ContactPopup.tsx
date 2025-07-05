import { useTranslation } from 'react-i18next';
import { X, Phone, MessageCircle, Instagram } from 'lucide-react';

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
      bgColor: 'bg-gray-100 hover:bg-gray-200',
      iconColor: 'text-gray-700'
    },
    {
      icon: MessageCircle,
      title: t('contact.popup.whatsapp.title'),
      description: t('contact.popup.whatsapp.description'),
      action: () => window.open('https://wa.me/1234567890', '_blank'),
      bgColor: 'bg-gray-100 hover:bg-gray-200',
      iconColor: 'text-gray-700'
    },
    {
      icon: Instagram,
      title: t('contact.popup.instagram.title'),
      description: t('contact.popup.instagram.description'),
      action: () => window.open('https://instagram.com/urbanpromo', '_blank'),
      bgColor: 'bg-gray-100 hover:bg-gray-200',
      iconColor: 'text-gray-700'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 overflow-hidden animate-popup-fade-in">
        {/* Header */}
        <div className="bg-gray-50 p-4 text-center relative border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {t('contact.popup.title')}
          </h3>
          <p className="text-gray-600 text-sm">
            {t('contact.popup.subtitle')}
          </p>
        </div>

        {/* Contact Options */}
        <div className="p-4 space-y-3">
          {contactOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className={`w-full group ${option.bgColor} p-4 rounded-lg transition-all duration-200 hover:scale-105`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${option.bgColor} rounded-lg flex items-center justify-center`}>
                  <option.icon className={`w-5 h-5 ${option.iconColor}`} />
                </div>
                
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {option.title}
                  </h4>
                  <p className="text-gray-600 text-xs">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 text-center border-t border-gray-200">
          <p className="text-gray-500 text-xs">
            {t('contact.popup.footer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;