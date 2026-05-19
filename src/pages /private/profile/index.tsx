// import { loginService } from "@/service/auth"
import { useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { User, Mail, Phone, Lock, Eye, EyeOff, Building, ShieldHalf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserStore } from "@/stores/useUserStore"

const profileSchema = z.object({
  name:     z.string().min(1, "Nome obrigatório"),
  email:    z.string().email("Email inválido"),
  phone:    z.string().min(1, "Telefone obrigatório"),
  company:  z.string().min(1, "Empresa obrigatória"),
  nif:      z.string().min(1, "NIF obrigatório"),
  password: z.string().optional(),
})

type ProfileTDO = z.infer<typeof profileSchema>

export function ProfilePage() {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isPending] = useState(false)

  const form = useForm<ProfileTDO>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name:     user?.name    ?? "",
      email:    user?.email   ?? "",
      phone:    user?.phone   ?? "",
      company:  user?.company ?? "",
      nif:      user?.nif     ?? "",
      password: "",
    }
  })

  const onSubmit = (data: ProfileTDO) => {
    console.log("Atualizar perfil:", data)
    // chamar o service de update quando estiver pronto
  }

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.avatar ?? ""} />
          <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input {...field} id="name" placeholder="Nome" autoComplete="off" className="pl-10" />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="company"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="company">Empresa</FieldLabel>
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
                <Input {...field} id="email" type="email" placeholder="email@exemplo.com" autoComplete="off" className="pl-10" />
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
              <FieldLabel htmlFor="password">Nova senha</FieldLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Deixe em branco para não alterar"
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

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? <Spinner /> : "Salvar alterações"}
          </Button>
          <Button type="button" className="bg-gray-500"  onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </div>

      </form>
    </div>
  )
}