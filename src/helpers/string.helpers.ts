
export function toTitleCase(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') return ''
  return fullName
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function pdfName(name?: string): string {
  const timestamp = Date.now()
  const baseName = name?.trim().replace(/\s+/g, '_') || 'documento'
  return `${baseName}_${timestamp}.pdf`
}

export function getUserInitials(fullName: string): string {
  return fullName
    .split(' ')
    .map((name) => name.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
