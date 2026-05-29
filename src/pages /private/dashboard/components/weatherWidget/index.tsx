import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Loader2 } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity:    number;
  windSpeed:   number;
  description: string;
  code:        number;
}

interface WeatherWidgetProps {
  className?: string
}

export default function WeatherWidget({ className }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-8.8368&longitude=13.2343&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Africa%2FLuanda'
        );
        const data = await response.json();
        const current = data.current;

        setWeather({
          temperature: Math.round(current.temperature_2m),
          humidity:    current.relative_humidity_2m,
          windSpeed:   Math.round(current.wind_speed_10m),
          description: getWeatherDescription(current.weather_code),
          code:        current.weather_code,
        });
      } catch (error) {
        console.error('Erro ao buscar clima:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0)            return <Sun      size={32} className="text-yellow-400" />;
    if (code === 1 || code === 2) return <Cloud size={32} className="text-gray-400"  />;
    if (code >= 45)            return <CloudRain size={32} className="text-blue-400" />;
    return <Sun size={32} className="text-yellow-400" />;
  };

  const getWeatherDescription = (code: number): string => {
    const descriptions: Record<number, string> = {
      0:  'Céu Limpo',
      1:  'Parcialmente Nublado',
      2:  'Nublado',
      3:  'Muito Nublado',
      45: 'Névoa',
      48: 'Névoa com Geada',
      51: 'Chuva Leve',
      61: 'Chuva Moderada',
      80: 'Pancadas de Chuva',
      95: 'Tempestade',
    };
    return descriptions[code] ?? 'Sem dados';
  };

  if (loading) {
    return (
      <div className={`bg-card rounded-xl p-6 shadow-sm border border-border flex items-center justify-center h-32 ${className ?? ''}`}>
        <Loader2 size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 shadow-sm border border-border ${className ?? ''}`}>
      {/* ✅ Atualizado para Luanda */}
      <h3 className="text-sm font-semibold text-muted-foreground mb-4">Clima - Luanda</h3>

      {weather ? (
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-4xl font-bold text-foreground">{weather.temperature}°C</div>
              <p className="text-sm text-muted-foreground mt-1">{weather.description}</p>
            </div>
            <div className="flex-shrink-0">
              {getWeatherIcon(weather.code)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Droplets size={18} className="text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">Umidade</p>
                <p className="text-sm font-semibold text-foreground">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind size={18} className="text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Vento</p>
                <p className="text-sm font-semibold text-foreground">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Não foi possível carregar o clima.</p>
      )}
    </div>
  );
}