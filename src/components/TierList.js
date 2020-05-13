import React, { useState } from 'react';
import styled from 'styled-components';

import TierHeading from './TierHeading';
import TypeList from './TypeList';

import getItems, { getTiers, getTypes } from '../items';

const StyledComp = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 10px auto;

    & table {
        width: 95%;
        margin: auto;
        border-collapse: collapse;
    }

    & tr > td {
        border-bottom: 1px solid gray;
        text-align: left;
    }

    & tr:first-child > td {
        border-top: 1px solid gray;
    }

    & tr > td:first-child {
        border-right: 1px solid gray;
    }
`;

const TierList = ({tier, search, onClickItem}) => {
    const [open, setOpen] = useState(false);

    let items = getItems();
    let tiers = getTiers();
    let types = getTypes();

    let tierObj = tiers.find(item => item.tier === tier);
    let filtered = items.filter(item => item.tier === tier);
    let searchFiltered = search.length === 0 ? filtered : filtered.filter(item => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) return true;
        if (item.dedicated.toLowerCase().includes(search.toLowerCase())) return true;
        if (item.location && item.location.toLowerCase().includes(search.toLowerCase())) return true;
        if (item.area && item.area.toLowerCase().includes(search.toLowerCase())) return true;
        return false;
    });

    let showList = search.length > 0 ? true : open;

    if (searchFiltered.length === 0) return null;

    const toggleList = () => {
        setOpen(!open);
    }

    const getItemsForType = (type, itemArr) => {
        let filtered = itemArr.filter(item => item.type === type);
        return filtered;
    }
    
    return (
        <StyledComp>
            <TierHeading value={tierObj.name} color={tierObj.color} onClick={toggleList}/>
            {
                showList ? (
                    <table>
                        <tbody>
                        {
                            types.map(type => {
                                let typeItems = getItemsForType(type, searchFiltered);
                                if (typeItems.length === 0) return null;
                                return (
                                    <TypeList key={tier+type} type={type} items={typeItems} onClickItem={onClickItem}/>
                                );
                            })
                        }
                        </tbody>                            
                    </table>
                ) : null
            }
           
        </StyledComp>
    );
}

export default TierList;