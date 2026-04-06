import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Colheita de Girassóis',
    description: 'Processo natural de colheita dos nossos girassóis premium',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80',
    category: 'Produção',
  },
  {
    id: 2,
    title: 'Campos de Milho',
    description: 'Extensos campos de milho orgânico em pleno desenvolvimento',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    category: 'Cultivação',
  },
  {
    id: 3,
    title: 'Qualidade Premium',
    description: 'Produtos selecionados e inspecionados com rigor',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    category: 'Qualidade',
  },
  {
    id: 4,
    title: 'Sustentabilidade',
    description: 'Práticas agrícolas sustentáveis e respeitosas com o meio ambiente',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    category: 'Meio Ambiente',
  },
]

export const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)

  const currentItem = galleryItems[currentIndex];

  return (
    <section id="galeria" className="py-20 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          Nossa <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Galeria</span>
        </h2>

        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Conheça de perto o processo de cultivo, colheita e produção dos nossos produtos premium
        </p>

        {/* Main Gallery Display */}
        <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
          {/* Left Navigation */}
          <div className="hidden md:flex justify-end">
            <button
              onClick={prevSlide}
              className="p-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Center Image */}
          <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <p className="text-yellow-400 font-semibold text-sm mb-2">{currentItem.category}</p>
              <h3 className="text-2xl font-bold text-white">{currentItem.title}</h3>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex justify-start">
            <button
              onClick={nextSlide}
              className="p-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Description and Mobile Navigation */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 mb-8">
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            {currentItem.description}
          </p>

          {/* Mobile Navigation */}
          <div className="flex md:hidden gap-4 justify-center">
            <button
              onClick={prevSlide}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-all"
            >
              ← Anterior
            </button>
            <button
              onClick={nextSlide}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-all"
            >
              Próximo →
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-yellow-500 w-8'
                  : 'bg-slate-600 hover:bg-slate-500 w-3'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-yellow-500 scale-105'
                  : 'border-slate-700 hover:border-yellow-500/50'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};