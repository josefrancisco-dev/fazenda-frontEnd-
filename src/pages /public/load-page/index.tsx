import { Loader2 } from "lucide-react";

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message = "Carregando..." }: LoadingPageProps) {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-[rgb(220,149,56)]" />
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-lg font-medium text-foreground">{message}</h2>
          <p className="text-sm text-muted-foreground">
            Aguarde enquanto carregamos os dados...
          </p>
        </div>
      </div>
    </div>
  );
}