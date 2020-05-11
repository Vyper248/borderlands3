import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { FaFileImport } from 'react-icons/fa';

import Header from './components/Header';
import Button from './components/Button';
import BankTypeList from './components/BankTypeList';
import IconButton from './components/IconButton';
import Container from './components/Container';
import ListContainer from './components/ListContainer';
import BankItemDetails from './components/BankItemDetails';
import InputClear from './components/InputClear';

import AddItemPage from './AddItemPage';
import ImportPage from './ImportPage';

import { getTypes } from './items';

const BankPage = ({onClickBack, onClickInfo, onShowItem}) => {

    const [showAddPage, setShowAddPage] = useState(false);
    const [showImportPage, setShowImportPage] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState('');
    const [bankItems, setBankItems] = useState([]);
    const isLargeScreen = useMediaQuery({ minWidth: 1700 });

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

    const onClickImport = () => {
        setShowImportPage(true);
    }

    const onClickCancelImport = () => {
        setShowImportPage(false);
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

    const sortItems = (items) => {
        items.sort((a,b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
    }

    const onAddItem = (item) => {
        let newItems = [...bankItems, item];
        sortItems(newItems);
        setBankItems(newItems);
        setShowAddPage(false); 
        saveBankToStorage(newItems);       
    }

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const onClearSearch = () => {
        setSearch('');
    }

    const onImportItems = (items) => {
        let newItems = [...bankItems, ...items];
        sortItems(newItems);
        setBankItems(newItems);
        setShowImportPage(false);
        saveBankToStorage(newItems);
    }

    if (showAddPage) return <AddItemPage onBack={onClickCancelAdd} onAddItem={onAddItem} showTierList={onClickBack} showInfo={onClickInfo}/>
    if (showImportPage) return <ImportPage onBack={onClickCancelImport} onImport={onImportItems} bankItems={bankItems}/>

    return (
        <ListContainer>
            <Header onBank={true} showTierList={onClickBack} showInfo={onClickInfo}/>
            <Container>
                <InputClear placeholder="Search" value={search} onChange={onChangeSearch} onClear={onClearSearch}/>
                <IconButton Icon={FiPlus} onClick={onClickAdd} position='right'/>
                {/* <IconButton Icon={FaFileImport} onClick={onClickImport} position='left'/> */}
                {
                    types.map(type => {
                        return <BankTypeList key={'BankType-'+type} type={type} items={getItemsByType(type)} search={search} onClickItem={onClickItem}/>
                    })
                }
            </Container>
            { selectedItem !== null && !isLargeScreen ? <div style={{height: '400px'}}></div> : null }
            { selectedItem !== null ? <BankItemDetails item={selectedItem} onClose={onCloseItem} onDelete={onDeleteItem} onShowItem={onShowItem}/> : null }
        </ListContainer>
    );
};

export default BankPage;