import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    background-color: gray;
    height: 70px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > h1 {
        margin-top: 0px;
        margin-bottom: 0px;
    }

    & > div > span {
        font-style: italic;
    }

    & span.selected {
        color: #00FFFF;
    }
`;

const Header = ({showTierList=()=>{}, showBank=()=>{}, onTierList=false, onBank=false}) => {
    return (
        <StyledComp>
            <h1>Borderlands 3</h1>
            <div><span className={onTierList ? 'selected' : ''} onClick={showTierList}>Tier List</span> / <span className={onBank ? 'selected' : ''} onClick={showBank}>Bank</span></div>
        </StyledComp>
    )
}

export default Header;