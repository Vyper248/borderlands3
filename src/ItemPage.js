import React from 'react';

import Header from './components/Header';
import Button from './components/Button';
import ItemPageContainer from './components/ItemPageContainer';
import Table from './components/Table';

import { getTiers } from './items';

const TableRow = ({label,value}) => {
    if (value !== undefined && value.length > 0) {
        return (
            <tr>
                <td>{label}</td>
                <td>{value}</td>
            </tr>
        );
    } else {
        return null;
    }
}

const ItemPage = ({item, onClearItem, onClickInfo, onClickBank}) => {
    const {name, type, character, tier, m4, m6, redText, ability, elements} = item;

    const tiers = getTiers();
    let tierObj = tiers.find(obj => obj.tier === tier);

    let dedicatedDrops = getDedicatedDrops(item);

    return (
        <ItemPageContainer>
            <Header onTierList={true} showInfo={onClickInfo} showBank={onClickBank}/>
            <Button onClick={onClearItem}>Go Back</Button>
            <h3>{name}</h3>
            <Table col1Width='100px'>
                <tbody>
                    <tr>
                        <td colSpan="2" style={{backgroundColor: tierObj.color, color: 'black', fontWeight: 'bold'}}>{tierObj.name}</td>
                    </tr>
                    <TableRow label="Type" value={type}/>
                    <TableRow label="Class" value={character}/>
                    {
                        m4 ? (
                            <tr>
                                <td>Requires M4+</td>
                                <td>{m4 ? "Yes" : "No"}</td>
                            </tr>
                        ) : null
                    }
                    {
                        m6 ? (
                            <tr>
                                <td>Requires M6+</td>
                                <td>{m6 ? "Yes" : "No"}</td>
                            </tr>
                        ) : null
                    }
                    <tr>
                        <td>Red Text</td>
                        <td style={{color: 'red'}}>{redText}</td>
                    </tr>
                    <TableRow label="Ability" value={ability}/>
                    <TableRow label="Elements" value={parseElements(elements)}/>
                </tbody>
            </Table>

            <h4>Dedicated Drop{dedicatedDrops.length > 1 ? 's' : ''}</h4>

            {
                dedicatedDrops.map((obj, i) => {
                    return (
                        <Table key={'ded-'+i} col1Width='100px'>
                            <tbody>
                                <TableRow label="Source" value={obj.dedicated}/>
                                <TableRow label="Quest" value={obj.quest}/>
                                <TableRow label="Location" value={obj.location}/>
                                <TableRow label="Area" value={obj.area}/>
                            </tbody>
                        </Table>
                    );
                })
            }
        </ItemPageContainer>
    );
}

const getDedicatedDrops = (item) => {
    let {dedicated, location, area, quest} = item;
    if (quest === undefined) quest = '';
    if (location === undefined) location = '';
    if (area === undefined) area = '';

    let dedicatedDrops = [];
    if (dedicated.includes(',')) {
        let dedicatedArr = dedicated.split(',');
        let locationArr = location.split(',');
        let areaArr = area.split(',');
        let questArr = quest.split(',');

        dedicatedArr.forEach((item, i) => {
            let dedicatedObj = {
                dedicated: item,
                location: locationArr[i],
                area: areaArr[i],
                quest: questArr[i]
            }
            dedicatedDrops.push(dedicatedObj);
        });
    } else {
        dedicatedDrops.push({dedicated, location, area, quest});
    }

    return dedicatedDrops;
}

const parseElements = (elements) => {
    if (elements === undefined) return '';
    return elements.split(' ').map(element => {
        if (element === 'F') return 'Incendiary';
        if (element === 'S') return 'Shock';
        if (element === 'C') return 'Corrosive';
        if (element === 'R') return 'Radiation';
        if (element === 'O') return 'Cryo';
        if (element === 'N') return 'None';
        return element;
    }).join(', ');
}

export default ItemPage;