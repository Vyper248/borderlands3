import React, { useState } from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import Button from './components/Button';
import TierHeading from './components/TierHeading';
import BankTypeList from './components/BankTypeList';

import { getTypes } from './items';

const StyledComp = styled.div`

`;

const BankPage = ({onClickBack}) => {

    const [bankItems, setBankItems] = useState([
        {
            name: 'Cutsman',
            type: 'SMG',
            level: 57,
            element1: 'Shock',
        },
        {
            name: 'Cutsman',
            type: 'SMG',
            level: 57,
            element1: 'Corrosive',
        },
        {
            name: 'Cutsman',
            type: 'SMG',
            level: 53,
            element1: 'Fire',
        },
        {
            name: 'Cutsman',
            type: 'SMG',
            level: 57,
            element1: 'Cryo',
        },
        {
            name: 'Laser-Sploder',
            type: 'AR',
            level: 57,
            element1: 'Radiation',
        },
        {
            name: 'Recursion',
            type: 'Shotgun',
            level: 57,
            element1: 'Fire',
            element2: 'Shock',
        }
    ]);

    const types = getTypes();

    const getItemsByType = (type) => {
        return bankItems.filter(item => item.type === type);
    }

    const onClickItem = (item) => () => {
        
    }

    return (
        <StyledComp>
            <Header/>
            <Button onClick={onClickBack}>Go Back</Button>
            <h3>Bank</h3>
            {
                types.map(type => {
                    return <BankTypeList key={'BankType-'+type} type={type} items={getItemsByType(type)} search={''} onClickItem={onClickItem}/>
                })
            }
        </StyledComp>
    );
};

export default BankPage;