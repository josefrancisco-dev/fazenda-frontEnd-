import React from 'react';
import { Sprout, Truck, Package, Lightbulb } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: ComponentType<LucideProps>;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Produção Agrícola',
    description: 'Cultivo sustentável com técnicas modernas e respeito pelo meio ambiente',
    icon: Sprout,
  },
  {
    id: 2,
    title: 'Distribuição',
    description: 'Entrega rápida e confiável de produtos frescos para todo o país',
    icon: Truck,
  },
  {
    id: 3,
    title: 'Armazenamento',
    description: 'Infraestrutura moderna para preservar a qualidade dos nossos produtos',
    icon: Package,
  },
  {
    id: 4,
    title: 'Consultoria',
    description: 'Suporte técnico e orientação para agricultores locais',
    icon: Lightbulb,
  },
];

export const Services: React.FC = () => {
  return (
    <section id="servicos" className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-yellow-500 font-semibold text-sm uppercase tracking-widest mb-4">
            Soluções Completas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossos <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Serviços</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Soluções integradas para maximizar a sua produção agrícola com eficiência e qualidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50 hover:border-yellow-500/50 rounded-xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 hover:scale-105"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl"></div>

                <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl group-hover:from-yellow-500/30 group-hover:to-yellow-500/10 transition-all">
                  <IconComponent className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors mb-3">
                  {service.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-6 pt-6 border-t border-slate-700/50 group-hover:border-yellow-500/30 transition-colors">
                  <span className="inline-flex items-center text-yellow-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all gap-2">
                    Saiba mais →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
