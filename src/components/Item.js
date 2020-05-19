import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    display: inline-block;
    margin: 5px;
    padding: 5px;
    background-color: #333;
    ${props => props.owned ? 'border: 1px solid green;' : 'border: 1px solid #333;'};

    :hover {
        cursor: pointer;
    }
`;

const Item = ({name, tier, type, onClick, owned={}}) => {
    let ownItem = owned[name] === true;
    return <StyledComp onClick={onClick} owned={ownItem}>{name}</StyledComp>
}

export default Item;