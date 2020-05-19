import React, { useState } from 'react';

import { getTiers } from './items';

import TierList from './components/TierList';
import InputClear from './components/InputClear';
import Header from './components/Header';
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

    const owned = getOwned();

    return (
        <ListContainer hide={item !== null ? true : false}>
            <Header onTierList={true} showBank={onClickBank} showInfo={onClickInfo}/>
            <Container>
                <InputClear placeholder="Search" value={search} onChange={onChangeSearch} onClear={onClearSearch}/>
                <div>
                    { tiers.map(tier => <TierList key={tier.tier} tier={tier.tier} search={search} onClickItem={onClickItem} owned={owned}/>) }
                </div>
            </Container>
        </ListContainer>
    );
};

const getOwned = () => {
    let bankArr = localStorage.getItem('bank');        
    if (bankArr !== null) bankArr = JSON.parse(bankArr);
    else bankArr = [];  
    
    let ownedList = {};
    bankArr.forEach(item => ownedList[item.name] = true);
    return ownedList;
}

export default TierListPage;