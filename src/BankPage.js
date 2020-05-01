import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';

import Header from './components/Header';
import Button from './components/Button';
import BankTypeList from './components/BankTypeList';
import IconButton from './components/IconButton';
import Container from './components/Container';
import ListContainer from './components/ListContainer';
import BankItemDetails from './components/BankItemDetails';

import AddItemPage from './AddItemPage';

import { getTypes } from './items';

const BankPage = ({onClickBack}) => {

    const [showAddPage, setShowAddPage] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bankItems, setBankItems] = useState([
        {
            name: 'Cutsman',
            type: 'SMG',
            level: 57,
            element1: 'Shock',
        },
        {
            name: 'Cutsman',
            type: 'SMG',
            level: 57,
            element1: 'Corrosive',
        },
        {
            name: 'Cutsman',
            type: 'SMG',
            level: 53,
            element1: 'Fire',
        },
        {
            name: 'Cutsman',
            type: 'SMG',
            level: 57,
            element1: 'Cryo',
        },
        {
            name: 'Laser-Sploder',
            type: 'AR',
            level: 57,
            element1: 'Radiation',
        },
        {
            name: 'Recursion',
            type: 'Shotgun',
            level: 57,
            element1: 'Fire',
            element2: 'Shock',
        }
    ]);

    useEffect(() => {
        let bankArr = localStorage.getItem('bank');        
        if (bankArr !== null) bankArr = JSON.parse(bankArr);
        else bankArr = [];        
        setBankItems(bankArr);
    }, []);

    const types = getTypes();

    const saveBankToStorage = (arr) => {
        let str = JSON.stringify(arr);
        localStorage.setItem('bank', str);
    }

    const getItemsByType = (type) => {        
        return bankItems.filter(item => item.type === type);
    }

    const onClickAdd = () => {
        setShowAddPage(true);
        setSelectedItem(null);
    }

    const onClickItem = (item) => () => {
        setSelectedItem(item);
    }

    const onCloseItem = () => {
        setSelectedItem(null);
    }

    const onDeleteItem = () => {
        let newItems = bankItems.filter(item => item !== selectedItem);
        setBankItems(newItems);
        saveBankToStorage(newItems);
        setSelectedItem(null);
    }

    const onClickCancelAdd = () => {
        setShowAddPage(false);
    }

    const onAddItem = (item) => {
        let newItems = [...bankItems, item];
        newItems.sort((a,b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        setBankItems(newItems);
        setShowAddPage(false); 
        saveBankToStorage(newItems);       
    }

    if (showAddPage) return <AddItemPage onBack={onClickCancelAdd} onAddItem={onAddItem}/>

    return (
        <ListContainer>
            <Header/>
            <Container>
                <Button onClick={onClickBack}>Go Back</Button>
                <IconButton Icon={FiPlus} onClick={onClickAdd}/>
                <h3>Owned</h3>
                {
                    types.map(type => {
                        return <BankTypeList key={'BankType-'+type} type={type} items={getItemsByType(type)} search={''} onClickItem={onClickItem}/>
                    })
                }
            </Container>
            { selectedItem !== null ? <div style={{height: '400px'}}></div> : null }
            { selectedItem !== null ? <BankItemDetails item={selectedItem} onClose={onCloseItem} onDelete={onDeleteItem}/> : null }
        </ListContainer>
    );
};

export default BankPage;