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

const Item = ({name, tier, type, onClick}) => {
    let bankArr = localStorage.getItem('bank');        
    if (bankArr !== null) bankArr = JSON.parse(bankArr);
    else bankArr = [];  
    let owned = bankArr.filter(item => item.name === name).length > 0 ? true : false;

    return <StyledComp onClick={onClick} owned={owned}>{name}</StyledComp>
}

export default Item;