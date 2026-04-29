import {Leaf } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export default function Auth() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-yellow-500 via-yellow-600 to-slate-800 border-r border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center font-bold text-white text-sm">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Girassol</h1>
            <p className="text-sm text-yellow-100">Gestão Agrícola</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Gerencie suas vendas com eficiência
            </h2>
            <p className="text-lg text-yellow-100">
              A plataforma completa para controlar seu negócio de produtos agrícolas com ferramentas modernas e intuitivas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: 'Rápido',
                desc: 'Processamento instantâneo de vendas',
                path: 'M13 10V3L4 14h7v7l9-11h-7z',
              },
              {
                title: 'Seguro',
                desc: 'Seus dados protegidos com criptografia',
                path: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
              },
              {
                title: 'Inteligente',
                desc: 'Relatórios e análises automáticas',
                path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/20">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.path} />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-yellow-100">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-yellow-100/60">
          © 2026 Girassol. Todos os direitos reservados.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 bg-background">
        <Outlet />
      </div>
    </main>
  )
}
