import { useState, useMemo } from "react"

interface UsePaginationProps<T> {
  data: T[]
  itemsPerPage?: number
}

export function usePagination<T>({
  data,
  itemsPerPage = 5,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const safeData = Array.isArray(data) ? data : [] 

  const totalPages = Math.ceil(safeData.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return safeData.slice(start, end)
  }, [safeData, currentPage, itemsPerPage])

  const nextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    )
  }

  const prevPage = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    )
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    setCurrentPage,
  }
}