import { useMemo } from 'react'

type FormatType = 'short' | 'long' | 'relative'

interface Options {
  type?: FormatType
  locale?: string
}

export function useFormatDate(date: string | Date, options?: Options) {
  const { type = 'short', locale = 'pt-PT' } = options || {}

  const formattedDate = useMemo(() => {
    const parsedDate = new Date(date)

    if (type === 'relative') {
      const diff = Date.now() - parsedDate.getTime()
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)

      if (minutes < 1) return 'agora mesmo'
      if (minutes < 60) return `há ${minutes} min`
      if (hours < 24) return `há ${hours} h`
      return `há ${days} dias`
    }

    if (type === 'long') {
      return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(parsedDate)
    }

    // default: short
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(parsedDate)
  }, [date, type, locale])

  return formattedDate
}