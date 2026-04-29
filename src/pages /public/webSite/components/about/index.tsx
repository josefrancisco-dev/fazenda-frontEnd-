import React, { useState, useEffect } from 'react';

interface Counter {
  label: string;
  value: number;
  suffix: string;
}

const counters: Counter[] = [
  { label: 'Anos de Experiência', value: 25, suffix: '+' },
  { label: 'Hectares Cultivados', value: 500, suffix: '+' },
  { label: 'Produtos Disponíveis', value: 6, suffix: '' },
  { label: 'Clientes Satisfeitos', value: 1200, suffix: '+' },
];

const AnimatedCounter: React.FC<{ counter: Counter }> = ({ counter }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(counter.value / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= counter.value) {
        setCount(counter.value);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [counter.value]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">
        {count.toLocaleString('pt-AO')}
        {counter.suffix}
      </div>
      <p className="text-slate-400">{counter.label}</p>
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 px-4 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-yellow-500 font-semibold text-sm uppercase tracking-widest mb-4">
            Conheca nossa história
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sobre a <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Fazenda Girassol</span>
          </h2>
        </div>

        {/* History Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              A Fazenda Girassol é uma instituição de referência na agricultura angolana, 
              localizada em Malanje, que se dedica ao cultivo de produtos agrícolas de qualidade 
              premium com respeito total ao meio ambiente.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Com mais de 25 anos de experiência, nossa missão é alimentar Angola com produtos 
              frescos e nutritivos, enquanto promovemos práticas agrícolas sustentáveis que 
              beneficiem as gerações futuras.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Somos comprometidos com a excelência, inovação e responsabilidade social, 
              transformando a agricultura em Malanje através de técnicas modernas e dedicação.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-slate-900 border-2 border-yellow-500/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">Nossos Valores</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold text-xl mt-1">✓</span>
                <span className="text-slate-300">Qualidade premium em cada produto</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold text-xl mt-1">✓</span>
                <span className="text-slate-300">Sustentabilidade e respeito ambiental</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold text-xl mt-1">✓</span>
                <span className="text-slate-300">Inovação constante em técnicas agrícolas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold text-xl mt-1">✓</span>
                <span className="text-slate-300">Responsabilidade social comunitária</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Animated Counters */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-yellow-500/30 rounded-xl py-16 px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {counters.map((counter, index) => (
              <div key={index} className="p-6 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all">
                <AnimatedCounter counter={counter} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
