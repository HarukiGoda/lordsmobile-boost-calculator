export function normalizeInputNumber(value: string) {
  return value
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[．。、]/g, ".")
}

export function isValidDecimal(value: string) {
  return /^\d*\.?\d*$/.test(value)
}
