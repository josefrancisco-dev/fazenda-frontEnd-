import { LoginForm } from './components/loginForm'
import { Link } from 'react-router-dom'
import log from "@/assets/logo-girassol.png"

export default function LoginPage() {
  return (
     <div className="w-full max-w-md space-y-8">
         {/* Mobile Logo */}
        <div className="md:hidden flex flex-col items-center gap-3 text-center">
           <div className="p-3 rounded-lgtext-primary-foreground">
             <img 
              src= {log}
              className='w-auto h-16'
              />
            </div>
           </div>

          <div className="space-y-2 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
               Bem-vindo de volta
             </h2>
            <p className="text-muted-foreground">
              Entre com suas credenciais para acessar o dashboard
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


           <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link to="/acount" className="font-semibold text-[#d4e84a] hover:underline">
             Criar conta
            </Link>
          </p>
       </div>
  )
}
