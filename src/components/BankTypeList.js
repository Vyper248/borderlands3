import React, { useState } from 'react';
import styled from 'styled-components';

import TierHeading from './TierHeading';
import BankItem from './BankItem';

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

const BankTypeList = ({type, items, search, onClickItem}) => {
    const [open, setOpen] = useState(false);

    let searchFiltered = search.length === 0 ? items : items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    let showList = search.length > 0 ? true : open;

    if (searchFiltered.length === 0) return null;

    const toggleList = () => {
        setOpen(!open);
    }
    
    return (
        <StyledComp>
            <TierHeading value={type + ' - ' + searchFiltered.length} color={'#BBB'} onClick={toggleList}/>
            {
                showList ? (
                    <div>
                        {
                            searchFiltered.map((item, i) => {
                                return <BankItem key={'bankItem-'+i} item={item} onClick={onClickItem}/>
                            })
                        }
                    </div>
                ) : null
            }
        </StyledComp>
    );
}

export default BankTypeList;