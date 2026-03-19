import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-4 text-center">
      <span className="text-8xl font-bold text-slate-200">404</span>
      <h1 className="text-2xl font-bold text-slate-700">Página não encontrada</h1>
      <p className="text-slate-400">A página que procuras não existe ou foi removida.</p>
      <Link
        to="/"
        className="mt-2 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
      >
        Voltar ao início
      </Link>
    </div>
  );
}