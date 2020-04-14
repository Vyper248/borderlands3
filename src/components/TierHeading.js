import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.h2`
    background-color: ${props => props.color};
    color: black;
    padding: 5px;
    margin: 0px;
    margin-bottom: 10px;

    :hover {
        cursor: pointer;
    }
`;

const TierHeading = ({value, color, onClick}) => {
    return (
        <StyledComp color={color} onClick={onClick}>
            {value}
        </StyledComp>
    );
}

export default TierHeading;