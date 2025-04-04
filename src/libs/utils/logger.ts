const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
}

type messageType = string | object

const getTimestamp = () => {
  return new Date().toISOString()
}

const formatMessage = (level: string, color: string, message: messageType) => {
  return `${COLORS.dim}[${getTimestamp()}]${COLORS.reset} ${color}${level}:${COLORS.reset} ${message}`
}

export const logger = {
  log: (message: messageType) => {
    console.log(`${COLORS.dim}[${getTimestamp()}]${COLORS.reset} ${message}`)
  },

  info: (message: messageType) => {
    console.log(formatMessage('INFO', COLORS.green, message))
  },

  error: (message: messageType) => {
    console.error(formatMessage('ERROR', COLORS.red, message))
  },

  warn: (message: messageType) => {
    console.warn(formatMessage('WARN', COLORS.yellow, message))
  },

  debug: (message: messageType) => {
    console.debug(formatMessage('DEBUG', COLORS.cyan, message))
  },
}
