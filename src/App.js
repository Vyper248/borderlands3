import React, { useState } from 'react';
import './App.css';
import getItems, { getTiers } from './items';

import TierList from './components/TierList';
import Input from './components/Input';
import Header from './components/Header';
import ItemPage from './ItemPage';

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
            <Header/>
            { item !== null ? <ItemPage item={item} onClearItem={onClearItem}/> : null }
            <Input placeholder="Search" value={search} onChange={onChangeSearch} onClear={onClearSearch}/>
            <div>
            {
                tiers.map(tier => {
                    return (
                        <TierList key={tier.tier} tier={tier.tier} search={search} onClickItem={onClickItem}/>
                    );
                })
            }
            </div>
        </div>
    );
}

export default App;
