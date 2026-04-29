import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  emoji: string;
  category: string;
  price: number;
  stock: number;
  gradient: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Milho Orgânico',
    emoji: '🌽',
    category: 'Cereais',
    price: 2500,
    stock: 150,
    gradient: 'from-yellow-500 via-yellow-400 to-slate-800',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80',
  },
  {
    id: 2,
    name: 'Feijão Carioca',
    emoji: '🫘',
    category: 'Legumes',
    price: 3500,
    stock: 85,
    gradient: 'from-red-500 via-orange-400 to-slate-800',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
  },
  {
    id: 3,
    name: 'Tomate Cherry',
    emoji: '🍅',
    category: 'Hortaliças',
    price: 4200,
    stock: 120,
    gradient: 'from-red-600 via-red-400 to-slate-800',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=600&q=80',
  },
  {
    id: 4,
    name: 'Alface Crespa',
    emoji: '🥬',
    category: 'Vegetais',
    price: 1800,
    stock: 200,
    gradient: 'from-green-600 via-green-400 to-slate-800',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&q=80',
  },
  {
    id: 5,
    name: 'Cenoura Roxa',
    emoji: '🥕',
    category: 'Raízes',
    price: 2100,
    stock: 175,
    gradient: 'from-purple-600 via-orange-400 to-slate-800',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80',
  },
  {
    id: 6,
    name: 'Mel Natural',
    emoji: '🍯',
    category: 'Apícola',
    price: 5500,
    stock: 45,
    gradient: 'from-amber-500 via-amber-400 to-slate-800',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
  },
]

export const Products: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section id="produtos" className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-yellow-500 font-semibold text-sm uppercase tracking-widest mb-4">
            Produtos Certificados
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossos <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Produtos Premium</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Variedade cuidadosamente selecionada de produtos agrícolas cultivados com excelência e dedicação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700/50 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-105"
            >
            
            <div className="relative h-40 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                {/* <span className="absolute bottom-3 right-3 text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                    {product.emoji}
                </span> */}
                <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/50">
                    {product.category}
                </span>
             </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">{product.category}</p>
                </div>

                <div className="border-t border-slate-700/50 py-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Preço</span>
                    <span className="text-2xl font-bold text-yellow-500">
                      {product.price.toLocaleString('pt-AO')} Kz
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">Disponibilidade</span>
                    <span className={`text-sm font-bold ${
                      product.stock > 100 ? 'text-green-400' : product.stock > 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {product.stock} em stock
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all rounded-full ${
                        product.stock > 100 ? 'bg-green-500' : product.stock > 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((product.stock / 200) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <button 
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg hover:shadow-yellow-500/50"
                onClick={() =>navigate("/login")}
                > 
                 Encomendar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};