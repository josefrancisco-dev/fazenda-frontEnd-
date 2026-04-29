import { Products } from "./components/products";
import { About } from "./components/about";
import { Gallery } from "./components/gallery";
import { Hero } from "./components/hero";
import { Navbar } from "./components/navBar";
import { Services } from "./components/services";
import { Contact } from "./components/contact/idenx";


export default function Home() {
  return (
    <main className="bg-slate-900 text-slate-100">
      <Navbar />
      <Hero />
      <Products />
      <Services />
      <About />
      <Gallery />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-950 to-slate-900 border-t border-yellow-500/30 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-yellow-500 font-bold mb-3">Fazenda Girassol</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Produtos agrícolas premium cultivados com dedicação em Malanje, Angola.
              </p>
            </div>
            <div>
              <h3 className="text-yellow-500 font-bold mb-3">Contacte-nos</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>📞 +244 (912) 345-678</li>
                <li>✉️ info@fazendagirassol.ao</li>
                <li>📍 Malanje, Angola</li>
              </ul>
            </div>
            <div>
              <h3 className="text-yellow-500 font-bold mb-3">Horário</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>Seg-Sex: 8h-17h</li>
                <li>Sábado: 9h-14h</li>
                <li>Domingo: Fechado</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-400 mb-2">
              © 2026 Fazenda Girassol. Todos os direitos reservados.
            </p>
            <p className="text-slate-500 text-sm">
              Cultivando o Futuro de Angola 
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
