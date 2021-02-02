import React from 'react'
import { Helmet } from 'react-helmet'

const SEO = ({ description, title }) => {
  return (
    <Helmet
      title={title}
      titleTemplate={`${title} - Pokéfav`}
      htmlAttributes={{ lang: 'en' }}
      meta={[
        {
          name: `description`,
          content: description
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: description
        },
        {
          property: `og:type`,
          content: `website`
        }
      ]}
    />
  )
}

SEO.defaultProps = {
  description: `Pokéfav is a small hub where you can create your own favorite Pokémon list, your favorite Pokémon Team or your predilect Pokémon Cards`
}

export default SEO
