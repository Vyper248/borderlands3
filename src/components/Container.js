import React from 'react';

const Container = ({children}) => {
    return (
        <div style={{maxWidth: '800px', margin: 'auto', position: 'relative'}}>
            { children }
        </div>
    );
};

export default Container;