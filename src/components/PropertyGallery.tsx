import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Eye } from 'lucide-react';

const PropertyGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const properties = [
    {
      id: 1,
      title: "Griya Asri Tamansari",
      location: "Yogyakarta, Indonesia",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Villa Sunset Paradise",
      location: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Cozy Garden House",
      location: "Bandung, Indonesia",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Modern Minimalist Home",
      location: "Surabaya, Indonesia",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Beachfront Villa",
      location: "Lombok, Indonesia",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop&crop=center"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, properties.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, properties.length - 2)) % Math.max(1, properties.length - 2));
  };

  return (
    <div className="w-full bg-gradient-to-b from-white/90 to-white/50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Explore Our Projects
          </h2>
          <p className="text-gray-600 text-md max-w-3xl mx-auto leading-relaxed">
            From cozy apartments to spacious family homes, our diverse listings cater to various needs and preferences.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <button className="flex items-center gap-2 bg-white text-gray-700 hover:text-orange-300 py-2 px-4 rounded-full border border-gray-200">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Mostaganem, Algeria</span>
          </button>
        </div>

        {/* Property Cards Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out m-4"
              style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
            >
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="w-1/3 flex-shrink-0 px-3"
                >
                  <div className="group relative bg-white rounded-md shadow-lg transition-transform duration-300 transform hover:scale-[1.15] hover:m-5 hover:shadow-2xl overflow-hidden">
                    
                    {/* Property Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Overlay with Black Circular Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                        <button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                      <h3 className="text-md font-bold text-gray-900 ">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600 ">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        <span className="text-sm font-medium">{property.location}</span>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-end mt-8 gap-3">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full bg-white hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= properties.length - 3}
              className="w-12 h-12 rounded-full bg-white hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
