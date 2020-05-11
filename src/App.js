import React, { useState } from 'react';
import './App.css';
import getItems from './items';

import ItemPage from './ItemPage';
import TierListPage from './TierListPage';
import BankPage from './BankPage';
import InfoPage from './InfoPage';

function App() {
    let items = getItems();

    const [item, setItem] = useState(null);
    const [showBank, setShowBank] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const onClickItem = (name) => () => {
        let itemObj = items.find(item => item.name === name);
        if (itemObj !== undefined) setItem(itemObj);
    }

    const onClearItem = () => {
        setItem(null);
    }

    const onClickBank = () => {
        setShowBank(true);
        setShowInfo(false);
        setItem(null);
    }

    const onBackFromBank = () => {
        setShowBank(false);
        setShowInfo(false);
        setItem(null);
    }

    const onClickInfo = () => {
        setShowInfo(true);
    }

    const onBackFromInfo = () => {
        setShowInfo(false);
    }

    if (showInfo) {
        return (
            <div className="App">
                <InfoPage onClickBack={onBackFromInfo} onClickInfo={onClickInfo} onClickBank={onClickBank} onClickTierList={onBackFromBank}/>
            </div>
        );
    }
    
    if (showBank) {
        return (
            <div className="App">
                <BankPage onClickBack={onBackFromBank} onClickInfo={onClickInfo} onShowItem={onClickItem}/>
                { item !== null ? <ItemPage item={item} onClearItem={onClearItem} onClickInfo={onClickInfo} onClickTierList={onBackFromBank} onBank={true}/> : null }
            </div>
        );
    }

    return (
        <div className="App">
            <TierListPage item={item} onClickItem={onClickItem} onClickBank={onClickBank} onClickInfo={onClickInfo}/>
            { item !== null ? <ItemPage item={item} onClearItem={onClearItem} onClickInfo={onClickInfo} onClickBank={onClickBank}/> : null }
        </div>
    );
}

export default App;
