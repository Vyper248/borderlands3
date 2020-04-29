import React from 'react';
import styled from 'styled-components';

import getItems from '../items';

import Input from './Input';

const StyledDropdown = styled.div`
    position: absolute;
    z-index: 5;
    top: 29px;
    left: 0px;
    right: 0px;
    max-height: 400px;
    overflow: scroll;
    background-color: black;
    border: 1px solid white;

    & > div {
        border: 1px solid white;
        height: 30px;
        width: 90%;
        margin: 5px auto;
        display: flex;
        align-items: center;
    }

    & > div > span {
        width: 100%;
        text-align: center;
    }

    @media screen and (min-width: 700px) {
        max-width: 300px;
        margin: auto;
    }
`;

const InputSuggest = ({value, placeholder, onChange, onClickSuggestion, type}) => {
    let items = getItems();

    let filtered = [];

    if (type === 'name') {
        filtered = items.filter(item => compare(item, 'name', value));
        filtered = value.length === 0 ? [] : filtered;
    }

    return (
        <div style={{position: 'relative', marginBottom: '10px'}}>
            <Input value={value} onChange={onChange} placeholder={placeholder} width="250px"/>
            {
                filtered.length > 0 ? (
                    <StyledDropdown>
                    { 
                        filtered.map(obj => {
                            return <div key={'suggest-'+obj.name} onClick={onClickSuggestion(obj)}><span>{obj.name}</span></div>
                        })
                    }
                    </StyledDropdown>
                ) : null
            }
        </div>
    );
}

const compare = (obj, key, value) => {
    return obj[key].toLowerCase().includes(value.toLowerCase()) && obj[key].toLowerCase() !== value.toLowerCase();
}

export default InputSuggest;