import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay) // aguarda o delay
    return () => clearTimeout(timer) // cancela se o valor mudar antes do tempo
  }, [value, delay])

  return debounced
}