import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    display: inline-block;
    margin: 5px;
    padding: 5px;
    background-color: #333;
`;

const Item = ({name, tier, type}) => {
    return <StyledComp>{name}</StyledComp>
}

export default Item;