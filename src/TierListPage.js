import React, { useState } from 'react';
import styled from 'styled-components';
import { GiLockedChest } from 'react-icons/gi';

import { getTiers } from './items';

import TierList from './components/TierList';
import InputClear from './components/InputClear';
import Header from './components/Header';
import IconButton from './components/IconButton';
import Container from './components/Container';

const StyledComp = styled.div`
    height: 100vh;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    top: ${props => props.hide ? '-5000px' : '0px'};
`;

const TierListPage = ({item, onClickItem, onClickBank}) => {
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
        <StyledComp hide={item !== null ? true : false}>
            <Header/>
            <Container>
                <InputClear placeholder="Search" value={search} onChange={onChangeSearch} onClear={onClearSearch}/>
                <IconButton Icon={GiLockedChest} onClick={onClickBank}/>
                <div>
                    { tiers.map(tier => <TierList key={tier.tier} tier={tier.tier} search={search} onClickItem={onClickItem}/>) }
                </div>
            </Container>
        </StyledComp>
    );
};

export default TierListPage;