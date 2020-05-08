import React, { useState } from 'react';
import './App.css';
import getItems from './items';

import ItemPage from './ItemPage';
import TierListPage from './TierListPage';
import BankPage from './BankPage';

/*
Credits to Add:
Tier List: https://docs.google.com/spreadsheets/d/1-Uv7rBP_MD_khcTunos9Xv4N4ezYmrTGftlkzaTguF8/edit#gid=1163577598
Author: DanSkinnyYo

Item Details: https://docs.google.com/spreadsheets/d/1fkCwu0zeX1BBGcNEzWGZDr2kQ0IOPSoZQK2FD-zpw1M/htmlview?pru=AAABcg5ugY4*nnRUpY7QV_ZNcPP6SlK1bA#gid=0

Class Mod Icons: https://borderlands.fandom.com/wiki/Class_Mod_(Borderlands_3)

Grenade Effects: https://forums.gearboxsoftware.com/t/grenade-features-in-bl3/4064626

Shield Effects: https://docs.google.com/spreadsheets/d/e/2PACX-1vRJ8R2-nBod9Y3nUmDW1uH_j7v0hq9dpQcSozGk1BuBuEvyqa8zKJxdFtKReL3WisUT2_ojPluqhBLi/pubhtml#

Annointments: https://borderlands.fandom.com/wiki/Anointed_(item_bonus)
*/

function App() {
    let items = getItems();

    const [item, setItem] = useState(null);
    const [showBank, setShowBank] = useState(false);

    const onClickItem = (name) => () => {
        let itemObj = items.find(item => item.name === name);
        setItem(itemObj);
    }

    const onClearItem = () => {
        setItem(null);
    }

    const onClickBank = () => {
        setShowBank(true);
        setItem(null);
    }

    const onBackFromBank = () => {
        setShowBank(false);
        setItem(null);
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
