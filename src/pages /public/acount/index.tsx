import {Leaf } from 'lucide-react'
import { LoginForm } from './components/loginForm'
import { Link } from 'react-router-dom'

export default function Acount() {
  return (
     <div className="w-full max-w-md space-y-8">
         {/* Mobile Logo */}
        <div className="md:hidden flex flex-col items-center gap-3 text-center">
           <div className="p-3 rounded-lg bg-primary text-primary-foreground">
              <Leaf className="w-6 h-6 text-white" />
            </div>
           <div>
               <h1 className="text-3xl font-bold text-foreground">Girassol</h1>
              <p className="text-sm text-muted-foreground">Gestão Agrícola</p>
           </div>
           </div>

          <div className="space-y-2 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
               Criar conta
             </h2>
            <p className="text-muted-foreground">
              Criar conta para acessar o dashboard
             </p>
           </div>

           <LoginForm />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">ou</span>
            </div>
          </div>

         <button className="w-full py-2.5 px-4 flex items-center justify-center gap-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground font-medium">
             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#1f2937"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc05"/>
             <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335"/>
             </svg>
            <span>Continuar com Google</span>
          </button>

           <p className="text-center text-sm text-muted-foreground">
            Já possui  uma conta?{' '}
            <Link to="/" className="font-semibold text-yellow-600 hover:underline">
             Login
            </Link>
          </p>
       </div>
  )
}
