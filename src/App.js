import React, { useState } from 'react';
import './App.css';
import getItems, { getTiers } from './items';
import styled from 'styled-components';

import TierList from './components/TierList';
import Input from './components/Input';
import Header from './components/Header';
import ItemPage from './ItemPage';

const TierListPage = styled.div`
    height: 100vh;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    padding-top: 5px;
    position: relative;
    top: ${props => props.hide ? '-5000px' : '0px'};
`;

function App() {
    let tiers = getTiers();
    let items = getItems();

    const [search, setSearch] = useState('');
    const [item, setItem] = useState(null);

    const onChangeSearch = (e) => {
        let value = e.target.value;
        setSearch(value);
    }

    const onClearSearch = () => {
        setSearch('');
    }

    const onClickItem = (name) => () => {
        let itemObj = items.find(item => item.name === name);
        setItem(itemObj);
    }

    const onClearItem = () => {
        setItem(null);
    }

    return (
        <div className="App">
            <TierListPage hide={item !== null ? true : false}>
                <Header/>
                <Input placeholder="Search" value={search} onChange={onChangeSearch} onClear={onClearSearch}/>
                <div>
                    { tiers.map(tier => <TierList key={tier.tier} tier={tier.tier} search={search} onClickItem={onClickItem}/>) }
                </div>
            </TierListPage>
            { item !== null ? <ItemPage item={item} onClearItem={onClearItem}/> : null }
        </div>
    );
}

export default App;
