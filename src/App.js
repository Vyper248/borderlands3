import React, { useState } from 'react';
import './App.css';
import getItems from './items';

import ItemPage from './ItemPage';
import TierListPage from './TierListPage';
import BankPage from './BankPage';

function App() {
    let items = getItems();

    const [item, setItem] = useState(null);
    const [showBank, setShowBank] = useState(true);

    const onClickItem = (name) => () => {
        let itemObj = items.find(item => item.name === name);
        setItem(itemObj);
    }

    const onClearItem = () => {
        setItem(null);
    }

    const onClickBank = () => {
        setShowBank(true);
    }

    const onBackFromBank = () => {
        setShowBank(false);
    }
    
    if (showBank) {
        return (
            <div className="App">
                <BankPage onClickBack={onBackFromBank}/>
            </div>
        );
    }

    return (
        <div className="App">
            <TierListPage item={item} onClickItem={onClickItem} onClickBank={onClickBank}/>
            { item !== null ? <ItemPage item={item} onClearItem={onClearItem}/> : null }
        </div>
    );
}

export default App;
