import React from 'react';
import styled from 'styled-components';

import { AiFillFire as Fire } from 'react-icons/ai';
import { GiElectric as Shock } from 'react-icons/gi';
import { FaBiohazard as Corrosive, FaRegSnowflake as Cryo, FaRadiation as Radiation } from 'react-icons/fa';

const StyledComp = styled.div`
    display: inline-flex;
    margin: 5px;

    & > div {
        padding: 5px;
        background-color: #333;
        border-right: 1px solid black;
    }

    & > div:last-child {
        border-right: none;
    }

    & svg {
        position: relative;
        top: 2px;
    }

    :hover {
        cursor: pointer;
    }
`;

const BankItem = ({item, onClick}) => {
    return (
        <StyledComp onClick={onClick(item)}>
            <div>{item.level}</div>
            <div>{item.name}</div>
            { item.element1 && item.element1.length > 0 && item.element1 !== 'None' ? <div>{getElementIcon(item.element1)}</div> : null }
            { item.element2 && item.element2.length > 0 && item.element2 !== 'None' ? <div>{getElementIcon(item.element2)}</div> : null }
        </StyledComp>
    );
};

const getElementIcon = (element) => {
    if (element === 'Fire') return <Fire style={{color: '#FF1F07'}}/>;
    if (element === 'Shock') return <Shock style={{color: '#639FF4'}}/>;
    if (element === 'Corrosive') return <Corrosive style={{color: '#A2D17B'}}/>;
    if (element === 'Cryo') return <Cryo style={{color: '#07BDFB'}}/>;
    if (element === 'Radiation') return <Radiation style={{color: '#FDC00A'}}/>;
    else return null;
}

export default BankItem;