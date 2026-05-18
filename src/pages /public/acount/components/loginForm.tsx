import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, Building, Phone, User, ShieldHalf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema, type clientSchemaTDO } from '@/schemas/client'
import { useCreateClient } from '@/quereis/useClient'
import { Spinner } from '@/components/ui/spinner'
import { useNavigate } from 'react-router-dom'

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutateAsync, isPending } = useCreateClient()
  const navigate = useNavigate()


  const form = useForm<clientSchemaTDO>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      role: "Client",
      status: "Active",
      company: "",
      email: "",
      phone: "",
      nif: "",
      password: "",
    }
  })

  const onSubmit = (data: clientSchemaTDO) => {
    mutateAsync(data)
      .then(() => {
        form.reset()
        navigate('/')
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          form.setError("email", {
            type: "manual",
            message: err.response.data.message,
          })
        }
      })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

      <Controller
        name="company"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="company">Entidade</FieldLabel>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input {...field} id="company" placeholder="Empresa" autoComplete="off" className="pl-10" />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="nif"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="nif">NIF</FieldLabel>
            <div className="relative">
              <ShieldHalf className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input {...field} id="nif" placeholder="NIF" autoComplete="off" className="pl-10" />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Nome</FieldLabel>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input {...field} id="name" placeholder="Representante" autoComplete="off" className="pl-10" />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone">Telefone</FieldLabel>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input {...field} id="phone" placeholder="+244 9xx xxx xxx" autoComplete="off" className="pl-10" />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input {...field} id="email" type="email" placeholder="seu.email@exemplo.com" autoComplete="off" className="pl-10" />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                {...field}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="off"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword
                  ? <EyeOff className="w-5 h-5 text-yellow-600" />
                  : <Eye className="w-5 h-5 text-yellow-600" />
                }
              </button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Spinner /> : 'Entrar'}
      </Button>
    </form>
  )
}