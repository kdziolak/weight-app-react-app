import React from 'react'

const ImageContainer = ({ children, classes }) => {
    return (
        <div className={classes}>
            {children}
        </div>
    );
}

export default ImageContainer;