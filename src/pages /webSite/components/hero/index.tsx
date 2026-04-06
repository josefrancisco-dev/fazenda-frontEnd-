import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="pt-24 pb-0 px-0 bg-slate-900 min-h-screen flex flex-col"
    >
      {/* Banner com imagem */}
      <div className="relative w-full h-screen flex items-end overflow-hidden">
        <img
  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80"
  alt="Agricultor em campo de girassol"
  className="absolute inset-0 w-full h-full object-cover"
/>
        
        {/* Overlay escuro com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        {/* Conteúdo sobreposto */}
        <div className="relative z-10 w-full pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Cultivamos o <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Futuro</span> de Angola
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Produtos agrícolas de qualidade premium, cultivados com dedicação e amor pela terra
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-xl">
                Ver Produtos
              </button>
              <button className="px-8 py-4 bg-slate-700/80 hover:bg-slate-600 text-yellow-300 font-bold rounded-lg border-2 border-yellow-500 transition-all duration-300 hover:scale-105">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
