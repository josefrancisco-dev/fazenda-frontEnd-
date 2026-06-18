export const ActionOption = {
  VIEW: 'Visualizar',
  UPDATE: 'Editar',
} as const

export type ActionOption = (typeof ActionOption)[keyof typeof ActionOption]

export const ActionOptionView = {
  VIEW: 'Visualizar',
} as const

export type ActionOptionView = (typeof ActionOptionView)[keyof typeof ActionOptionView]

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
} as const;

export type ExportType = typeof ExportTypes[keyof typeof ExportTypes];
