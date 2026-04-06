export const ActionOption = {
  VIEW: 'Visualizar',
  UPDATE: 'Editar',
  DELETE:  "Eliminar"
} as const

export type ActionOption = (typeof ActionOption)[keyof typeof ActionOption]

export const ActionOptionView = {
  VIEW: 'Visualizar',
} as const

export type ActionOptionView = (typeof ActionOption)[keyof typeof ActionOptionView]

export const Option = Object.entries(ActionOption).map(([key, label]) => ({
  value: key,
  label,
}))

export const Options = Object.entries(ActionOption).map(([key, label]) => ({
  value: key,
  label,
}))

export const ExportTypes = {
  PDF: 'pdf',
  // EXCEL: 'excel'
} as const;

export type ExportType = typeof ExportTypes[keyof typeof ExportTypes];

