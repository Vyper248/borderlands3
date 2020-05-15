import React from 'react';
import CSVReader from 'react-csv-reader'

import getItems, { getTypes, getTiers } from './items';

import Header from './components/Header';
import Input from './components/Input';
import Container from './components/Container';

const ImportPage = ({onBack, onImport, bankItems}) => {
    const types = getTypes();
    const allItems = getItems();
    const tiers = getTiers();

    const papaparseOptions = {
        skipEmptyLines: true
    }

    const createCSV = (csvContent='') => {
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
        return csvContent;
    }

    const onExport = () => {
        let csvContent = createCSV('data:text/csv;charset=utf-8,');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute('target', '_blank');
        link.setAttribute("download", "Borderlands3Bank.csv");
        link.click();        
    }

    const onShare = () => {
        let csvContent = createCSV();

        if (navigator.share) {
            navigator.share({
                title: 'Borderlands3Bank',
                text: csvContent
            });
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
            <Container>
                <h3>Import</h3>
                <p style={{padding: '0px 10px'}}>Imported items will be added to the bank along with the existing items.</p>
                <CSVReader label='Select CSV file to import' onFileLoaded={onClickImport} parserOptions={papaparseOptions}/>
                <br/>
                <h3>Export</h3>
                <p style={{padding: '0px 10px'}}>If exporting opens in a new tab instead of downloading, then try the share button if there is one. This will let you share the data as a txt file which can be renamed to .csv and opened in a spreadsheet app.</p>
                <Input as='button' width='200px' onClick={onExport}>Export Bank Items</Input>
                { navigator.share ? <div><br/><Input as='button' width='200px' onClick={onShare}>Share Bank Items</Input></div> : null }
                <br/><br/>
                <Input as='button' onClick={onBack} width='150px'>Cancel</Input>
            </Container>
        </div>
    );
}

export default ImportPage;