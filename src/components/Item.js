import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    display: inline-block;
    margin: 5px;
    padding: 5px;
    background-color: #333;

    :hover {
        cursor: pointer;
    }
`;

const Item = ({name, tier, type, onClick}) => {
    return <StyledComp onClick={onClick}>{name}</StyledComp>
}

export default Item;