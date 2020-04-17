import React, { useState } from 'react';
import './App.css';
import getItems from './items';

import ItemPage from './ItemPage';
import TierListPage from './TierListPage';

function App() {
    let items = getItems();

    const [item, setItem] = useState(null);

    const onClickItem = (name) => () => {
        let itemObj = items.find(item => item.name === name);
        setItem(itemObj);
    }

    const onClearItem = () => {
        setItem(null);
    }

    return (
        <div className="App">
            <TierListPage item={item} onClickItem={onClickItem}/>
            { item !== null ? <ItemPage item={item} onClearItem={onClearItem}/> : null }
        </div>
    );
}

export default App;
