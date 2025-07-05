import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = t('faq.items', { returnObjects: true }) as FAQItem[];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-yellow-600 text-sm font-semibold tracking-wider uppercase border border-yellow-400/30 px-6 py-2 backdrop-blur-sm bg-yellow-400/10 rounded-full">
              {t('faq.subtitle')}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
            {t('faq.title')}
          </h2>
          
          <p className="text-md text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('faq.description')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 hover:border-yellow-400/50 transition-all duration-300 shadow-sm hover:shadow-xl rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-yellow-50/50 transition-colors duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 flex items-center justify-center transition-all duration-300 rounded-lg ${
                    openIndex === index 
                      ? 'bg-yellow-400 text-white' 
                      : 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200'
                  }`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors duration-200 pr-4">
                    {item.question}
                  </h3>
                </div>
                
                <div className={`w-8 h-8 flex items-center justify-center transition-all duration-300 rounded-full ${
                  openIndex === index 
                    ? 'bg-yellow-400 text-white rotate-180' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-yellow-100 group-hover:text-yellow-600'
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="pl-14">
                    <div className="w-full h-px bg-gradient-to-r from-yellow-400/30 to-transparent mb-4"></div>
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="inline-block p-8 bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t('faq.cta.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('faq.cta.description')}
            </p>
            <button className="group flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-3 font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/25 hover:scale-105 rounded-lg mx-auto">
              <span>{t('faq.cta.button')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;