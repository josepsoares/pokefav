import { extendTheme } from '@chakra-ui/react'
import globalStyles from 'styles/globalStyles'

import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '600px',
  md: '768px',
  lg: '1080px',
  xl: '1920px'
})

const themeProps = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  breakpoints,
  colors: {
    red: {
      50: '#ffe8e3',
      100: '#febcb5',
      200: '#f88d87',
      300: '#f35b58',
      400: '#ef3b29',
      500: '#d62f10',
      600: '#a72d0c',
      700: '#782607',
      800: '#4a1a02',
      900: '#1f0c00'
    },
    blue: {
      50: '#dbf8ff',
      100: '#b4e6fb',
      200: '#88d4f3',
      300: '#5cc2ed',
      400: '#32b0e7',
      500: '#1897cd',
      600: '#0975a1',
      700: '#005474',
      800: '#003348',
      900: '#00131d'
    },
    yellow: {
      50: '#fff7db',
      100: '#ffebaf',
      200: '#ffe17e',
      300: '#ffdb4d',
      400: '#ffc11e',
      500: '#e69907',
      600: '#b36a00',
      700: '#804400',
      800: '#4d2300',
      900: '#1d0800'
    },
    primary: '#f24643',
    secondary: '#ffe066',
    tertiary: '#1688b9',
    transparent: 'transparent',
    black: '#000',
    white: '#fff'
  },
  fonts: {
    heading: '"Rubik", sans-serif',
    body: '"Roboto", sans-serif',
    mono: 'Menlo, monospace'
  },
  fontSizes: {
    xxs: '0.60rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    none: 'none'
  },
  opacity: {
    0: '0',
    25: '0.25',
    50: '0.5',
    75: '0.75',
    100: '1'
  },
  globalStyles
}

const pokeFavTheme = extendTheme(themeProps)

export default pokeFavTheme
