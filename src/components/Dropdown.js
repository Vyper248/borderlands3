import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useOnclickOutside from 'react-cool-onclickoutside';

import Input from './Input';

const StyledComp = styled.div`
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;

    & > button:hover {
        cursor: pointer;
    }

    @media screen and (min-width: 700px) {
        position: relative;
    }
`;

const StyledMenu = styled.div`
    position: absolute;
    background-color: black;
    left: 0px;
    right: 0px;
    max-height: 300px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 5;

    & > div {
        border: 1px solid white;
        min-height: 30px;
        width: 90%;
        margin: 5px auto;
        display: flex;
        align-items: center;
        padding: 5px;
    }

    & > div:hover {
        cursor: pointer;
    }

    & > div.selected {
        background-color: #333;
    }

    & > div > span {
        width: 100%;
        text-align: center;
    }

    @media screen and (min-width: 700px) {
        top: 30px;
        border: 1px solid white;
    }

    @media screen and (max-width: 700px) {
        position: fixed;
        bottom: 0px;
        border-top: 1px solid white;
    }
`;

const Dropdown = ({value, items, onChange, placeholder='', width='100%'}) => {
    const [open, setOpen] = useState(false);
    const [subMenu, setSubMenu] = useState('');
    const ref = useRef();

    useOnclickOutside(ref, () => {
        setTimeout(() => {
            setOpen(false);
            setSubMenu('');
        }, 200);
    });

    const onClickItem = (item) => () => {
        onChange(item);
        setOpen(false);
        setSubMenu('');
    };

    const onClickDropdown = () => {
        setOpen(!open);
    }

    let objectItems = [];
    if (Array.isArray(items) === false && subMenu === '' && items !== undefined) {
        objectItems = Object.keys(items);
    } else if (subMenu.length > 0 && items !== undefined) {
        objectItems = items[subMenu];
    }

    const onClickSubMenu = (key) => (e) => {
        setSubMenu(key);
    }

    return (
        <StyledComp>
            <Input as="div" width={width} onClick={onClickDropdown} className={open ? 'open' : ''}>{String(value).length > 0 ? value : placeholder}</Input>
            {
                open ? (
                    <StyledMenu ref={ref}>
                    {   subMenu.length > 0 ? <div onClick={() => setSubMenu('')}><span>Back</span></div> : null   }
                    {   Array.isArray(items) === false && subMenu.length === 0 ? <div onClick={onClickItem('None')} className={value === 'None' ? 'selected' : ''}><span>None</span></div> : null   }
                    {
                        Array.isArray(items) 
                            ? items.map(item => <div key={`dropdown-${item}`} onClick={onClickItem(item)} className={item === value ? 'selected' : ''}><span>{item}</span></div>) 
                            : (
                                objectItems.map(item => <div key={`dropdown-${item}`} onClick={subMenu === '' ? onClickSubMenu(item) : onClickItem(item)}><span>{item}</span></div>)
                            )
                    }
                    </StyledMenu>
                ) : null
            }
        </StyledComp>
    );
}

export default Dropdown;