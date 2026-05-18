import { useSearchParams } from "react-router-dom";

export function useSearchQuery(key: string = "q") {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(key) || "";

  const setValue = (newValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, newValue);
    setSearchParams(newParams);
  };

  return { value, setValue } as const;
}
