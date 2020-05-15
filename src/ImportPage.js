import React from 'react';
import CSVReader from 'react-csv-reader'

import getItems, { getTypes, getTiers } from './items';

import Header from './components/Header';
import Input from './components/Input';

const ImportPage = ({onBack, onImport, bankItems}) => {
    const types = getTypes();
    const allItems = getItems();
    const tiers = getTiers();

    const papaparseOptions = {
        skipEmptyLines: true
    }

    const onExport = () => {
        let csvContent = "data:text/csv;charset=utf-8,";

        types.forEach(type => {
            let items = bankItems.filter(item => item.type === type);
            items.forEach(item => addTier(item));

            let firstItem = items[0];
            if (firstItem !== undefined) {
                let headings = Object.keys(firstItem).map(heading => convertHeading(heading));
                csvContent += headings.join(',') + '\n';
                items.forEach(item => {
                    let values = Object.values(item).map(item => '"'+item+'"');
                    csvContent += values.join(',') + '\n';
                });
                csvContent += '\n';
            }
        });

        const encodedUri = encodeURI(csvContent);
        // const file = new File([ encodedUri ], 'Borderlands3Bank.csv', {type: 'text/csv'});

        if (navigator.share) {
            navigator.share({
                text: csvContent
            });
        } else {
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute('target', '_blank');
            link.setAttribute("download", "Borderlands3Bank.csv");
            link.click();
        }
        
    }

    //convert camel case to normal
    const convertHeading = (heading) => {
        let addSpaces = heading.replace(/([A-Z0-9])/g, " $1" );
        let converted = addSpaces.charAt(0).toUpperCase() + addSpaces.slice(1);
        return converted;
    }

    //convert normal back to camel case
    const convertToCamel = (heading) => {
        let removeSpaces = heading.replace(/ /g, '');
        let converted = removeSpaces.charAt(0).toLowerCase() + removeSpaces.slice(1);
        return converted;
    }

    const addTier = (item) => {
        //get tier of item if can find it
        const itemObj = allItems.find(obj => obj.name === item.name);
        const tier = itemObj !== undefined ? itemObj.tier : 0;
        const tierObj= tiers.find(obj => obj.tier === tier);
        const tierName = tierObj !== undefined ? tierObj.name : 'Unknown';
        item.tier = tierName;
    }

    const onClickImport = (items) => {
        let currentHeadings = [];
        let objects = [];
        items.forEach(row => {
            if (row[0] === 'Name') {
                currentHeadings = row.map(heading => convertToCamel(heading));
                return;
            } else {
                if (currentHeadings.length === 0) return;
                let object = {};
                currentHeadings.forEach((heading, i) => {
                    object[heading] = row[i];    
                });
                objects.push(object);
            }
        });
        onImport(objects);
    }

    return (
        <div>
            <Header onBank={true}/>
            <h3>Import</h3>
            <CSVReader label='Select CSV file to import' onFileLoaded={onClickImport} parserOptions={papaparseOptions}/>
            <br/>
            <h3>Export</h3>
            <Input as='button' width='200px' onClick={onExport}>Export Bank Items</Input><br/><br/>
            <Input as='button' onClick={onBack} width='150px'>Cancel</Input>
        </div>
    );
}

export default ImportPage;