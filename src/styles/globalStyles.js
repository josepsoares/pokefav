const globalStyles = {
  styles: {
    components: {
      Input: {
        variants: {
          'with-shadow': {
            bg: 'red.400',
            boxShadow: '0 0 2px 2px #efdfde'
          },
          // 4. We can override existing variants
          solid: props => ({
            bg: 'red.400'
          })
        }
      },
      Button: {
        baseStyle: {
          letterSpacing: '0.080em',
          fontWeight: 'normal'
        }
      }
    }
  }
}

export default globalStyles
