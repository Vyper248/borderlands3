import React from 'react';
import styled from 'styled-components';
import { MdHelpOutline } from 'react-icons/md';
const headerImage = require('../header.jpeg');

const StyledComp = styled.div`
    background-color: gray;
    height: 70px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url(${headerImage});
    background-position: center;
    
    & > h1 {
        margin-top: 0px;
        margin-bottom: 0px;
        color: #FFE417;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }

    & > div > span {
        font-style: italic;
        text-shadow: 1px 1px 2px black;
        ${'' /* text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */}
    }

    & span.selected {
        color: #00FFFF;
    }
`;

const StyledInfo = styled.div`
    width: 100vw;
    position: absolute;
    top: 0px;
    left: 0px;

    & > div {
        max-width: 800px;
        margin: auto;
        position: relative;
    }

    & > div > svg {
        position: absolute;
        right: 10px;
        top: 17px;
        font-size: 1.5em;
    }
`;

const Header = ({showTierList=()=>{}, showBank=()=>{}, showInfo=()=>{}, onTierList=false, onBank=false}) => {
    return (
        <StyledComp>
            <h1>Borderlands 3</h1>
            <div><span className={onTierList ? 'selected' : ''} onClick={showTierList}>Tier List</span> / <span className={onBank ? 'selected' : ''} onClick={showBank}>Bank</span></div>
            <StyledInfo><div><MdHelpOutline onClick={showInfo}/></div></StyledInfo>
        </StyledComp>
    )
}

export default Header;