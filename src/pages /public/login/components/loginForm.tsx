import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/quereis/useAuth'

export function LoginForm() {
  const { mutate, isPending } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Preencha todos os campos')
      return
    }

    if (!email.includes('@')) {
      setError('Email inválido')
      return
    }

    mutate({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {error && (
        <div className="p-3 rounded-lg bg-red-100 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* EMAIL */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
            placeholder="email@exemplo.com"
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Senha</label>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border rounded-lg"
            placeholder="••••••••"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {/* BUTTON */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  )
}