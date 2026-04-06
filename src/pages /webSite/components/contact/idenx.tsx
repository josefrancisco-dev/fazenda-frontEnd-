import React, { useState } from 'react';
import { Phone, MapPin, Mail, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    quantity: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    alert('Obrigado pela sua encomenda! Entraremos em contacto em breve.');
    setFormData({ name: '', email: '', product: '', quantity: '', message: '' });
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de fazer uma encomenda na Fazenda Girassol.`
  );
  const whatsappLink = `https://wa.me/244123456789?text=${whatsappMessage}`;

  return (
    <section id="contacto" className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-yellow-500 font-semibold text-sm uppercase tracking-widest mb-4">
            Vamos Conversar
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Entre em <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Contacto</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Faça sua encomenda agora e receba nossos produtos frescos diretamente em casa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phone */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                  <Phone className="w-6 h-6 text-yellow-500" />
                </div>
                <span className="font-bold text-slate-100">Telefone</span>
              </div>
              <p className="text-white font-semibold text-lg mb-1">+244 (912) 345-678</p>
              <p className="text-slate-400 text-sm">Disponível 8h-17h (Angola)</p>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                  <Mail className="w-6 h-6 text-yellow-500" />
                </div>
                <span className="font-bold text-slate-100">Email</span>
              </div>
              <p className="text-white font-semibold text-lg mb-1">info@fazendagirassol.ao</p>
              <p className="text-slate-400 text-sm">Resposta em 24h</p>
            </div>

            {/* WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-all duration-300 hover:scale-105 shadow-lg"
            >
             WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 h-10">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-yellow-500/50 transition-colors duration-300 shadow-xl "
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:bg-slate-700 transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:bg-slate-700 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Product */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Produto
                  </label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-yellow-500 focus:bg-slate-700 transition-colors"
                  >
                    <option value="">Selecione um produto</option>
                    <option value="milho">Milho Orgânico</option>
                    <option value="feijao">Feijão Carioca</option>
                    <option value="tomate">Tomate Cherry</option>
                    <option value="alface">Alface Crespa</option>
                    <option value="cenoura">Cenoura Roxa</option>
                    <option value="mel">Mel Natural</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Quantidade (kg)
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:bg-slate-700 transition-colors"
                    placeholder="50"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-slate-300 font-semibold mb-2">
                  Mensagem Adicional
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:bg-slate-700 transition-colors resize-none"
                  placeholder="Informações adicionais sobre sua encomenda..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/50 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Enviar Encomenda
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
