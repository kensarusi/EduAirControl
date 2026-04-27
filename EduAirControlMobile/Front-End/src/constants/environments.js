export const STATUS = {
  NORMAL: 'statusNormal',
  WARNING: 'statusWarning',
  ALERT: 'statusAlert',
}

export const QUALITY = {
  GOOD: 'qualityGood',
  REGULAR: 'qualityRegular',
  BAD: 'qualityBad',
}

export const IDEAL_RANGES = {
  temperature: '18–24°C',
  humidity: '40–60%',
  co2: '< 1000 ppm',
  noise: '< 50 dB',
}

export const STATUS_COLORS = {
  [STATUS.NORMAL]: '#4CAF50',
  [STATUS.WARNING]: '#FFC107',
  [STATUS.ALERT]: '#F44336',
}

export const QUALITY_COLORS = {
  [QUALITY.GOOD]: '#4CAF50',
  [QUALITY.REGULAR]: '#FFC107',
  [QUALITY.BAD]: '#F44336',
}

export const STATUS_LABELS = {
  [STATUS.NORMAL]: 'Normal',
  [STATUS.WARNING]: 'Advertencia',
  [STATUS.ALERT]: 'Alerta',
}

export const QUALITY_LABELS = {
  [QUALITY.GOOD]: 'Buena',
  [QUALITY.REGULAR]: 'Regular',
  [QUALITY.BAD]: 'Mala',
}