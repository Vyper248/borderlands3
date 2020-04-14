import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    background-color: gray;
    padding: 10px;
    margin-bottom: 10px;

    & > h1 {
        margin-top: 0px;
        margin-bottom: 0px;
    }

    & > span {
        font-style: italic;
    }
`;

const Header = () => {
    return (
        <StyledComp>
            <h1>Borderlands 3</h1>
            <span>Tier List</span>
        </StyledComp>
    )
}

export default Header;