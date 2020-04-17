import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
    display: inline-block;
    font-size: 1.7em;
    width: 30px;
    height: 30px;
    margin-left: auto;
    padding: 2px;

    position: absolute;
    top: 0px;
    right: 5px;

    :hover {
        cursor: pointer;
    }

    & > svg {
        position: relative;
        top: 2px;
    }
`;

const IconButton = ({Icon, onClick}) => {
    return (
        <StyledButton onClick={onClick}><Icon/></StyledButton>
    );
};

export default IconButton;