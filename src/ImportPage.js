import React from 'react';
import CSVReader from 'react-csv-reader'

import Header from './components/Header';
import Input from './components/Input';

const ImportPage = ({onBack, onImport, bankItems}) => {
    const papaparseOptions = {
        header: true,
        skipEmptyLines: true
    }

    const onExport = () => {
        let csvContent = "data:text/csv;charset=utf-8,";

        bankItems.forEach(item => {
            
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        link.click();
    }

    return (
        <div>
            <Header onBank={true}/>
            <h3>Import</h3>
            <CSVReader label='Select CSV file to import' onFileLoaded={onImport} parserOptions={papaparseOptions}/>
            <br/>
            <h3>Export</h3>
            <Input as='button' width='200px' onClick={onExport}>Export Bank Items</Input><br/><br/>
            <Input as='button' onClick={onBack} width='150px'>Cancel</Input>
        </div>
    );
}

export default ImportPage;