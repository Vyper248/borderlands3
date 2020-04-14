import React, { useState } from 'react';
import './App.css';
import { getTiers } from './items';

import TierList from './components/TierList';
import Input from './components/Input';
import Header from './components/Header';

function App() {
    let tiers = getTiers();

    const [search, setSearch] = useState('');
    const [item, setItem] = useState(null);

    const onChangeSearch = (e) => {
        let value = e.target.value;
        setSearch(value);
    }

    const onClearSearch = () => {
        setSearch('');
    }

    return (
        <div className="App">
            <Header/>
            <Input placeholder="Search" value={search} onChange={onChangeSearch} onClear={onClearSearch}/>
            {
                tiers.map(tier => {
                    return (
                        <TierList key={tier.tier} tier={tier.tier} search={search}/>
                    );
                })
            }
        </div>
    );
}

export default App;
