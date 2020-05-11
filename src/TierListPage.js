import React, { useState } from 'react';
import styled from 'styled-components';
import { GiLockedChest } from 'react-icons/gi';

import { getTiers } from './items';

import TierList from './components/TierList';
import InputClear from './components/InputClear';
import Header from './components/Header';
import IconButton from './components/IconButton';
import Container from './components/Container';
import ListContainer from './components/ListContainer';

const TierListPage = ({item, onClickItem, onClickBank, onClickInfo}) => {
    let tiers = getTiers();

    const [search, setSearch] = useState('');

    const onChangeSearch = (e) => {
        let value = e.target.value;
        setSearch(value);
    }

    const onClearSearch = () => {
        setSearch('');
    }

    return (
        <ListContainer hide={item !== null ? true : false}>
            <Header onTierList={true} showBank={onClickBank} showInfo={onClickInfo}/>
            <Container>
                <InputClear placeholder="Search" value={search} onChange={onChangeSearch} onClear={onClearSearch}/>
                <div>
                    { tiers.map(tier => <TierList key={tier.tier} tier={tier.tier} search={search} onClickItem={onClickItem}/>) }
                </div>
            </Container>
        </ListContainer>
    );
};

export default TierListPage;