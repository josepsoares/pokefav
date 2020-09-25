import React from 'react'

const HighlightText = props => {
    const { header, text } = props

    return (
        <p>
            <b>
                {header}
            </b>
            {` - `}{text}
        </p>
    )
}

export default HighlightText
