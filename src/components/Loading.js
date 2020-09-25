import React from 'react';

const Loading = (props) => {
    return (
        <div style={{ height: `${props.height}` }} className='d-flex justify-content-center align-items-center'>
            <div className="pokeball poke animated infinite swing">
                <div className="pokeball-btn"></div>
            </div>
        </div>
    )
}

export default Loading;