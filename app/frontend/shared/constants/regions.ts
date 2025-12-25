// source: https://flagdownload.com/flag-of-spain/
// import FR from '#/public/img/Flag_of_France.png'
// import IT from '#/public/img/Flag_of_Italy.png'
// import PL from '#/public/img/Flag_of_Poland.png'
// import PT from '#/public/img/Flag_of_Portugal.png'
// import RU from '#/public/img/Flag_of_Russia.png'
import ES from '#/public/img/Flag_of_Spain.png'
import UK from '#/public/img/Flag_of_UK.png'

export const REGIONS_SEARCH = [
  {
    value: 'es',
    label: 'Spain',
    link: 'spain',
    flag: ES,
    disabled: false,
  },
] as const

export const DEFAULT_REGION = {
  value: 'en',
  label: 'United Kingdom',
  flag: UK,
  disabled: false,
} as const

export const LANG_REGIONS = [
  DEFAULT_REGION,
  ...REGIONS_SEARCH.filter(
    (reg) => reg.value === 'es' || reg.value === 'it'
    // ? { ...reg, disabled: true } : reg
  ),
] as const
