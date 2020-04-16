import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';

import { getTiers } from './items';

const StyledPage = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: black;
`;

const StyledTable = styled.table`
    margin: auto;
    border-collapse: collapse;
    width: 90%;
    max-width: 400px;
    margin-bottom: 10px;

    & td {
        border: 1px solid gray;
        padding: 5px;
    }

    & td:first-child {
        background-color: #333;
        width: 100px;
    }
`;

const StyledButton = styled.div`
    padding: 5px;
    background-color: #333;
    max-width: 120px;
    margin: auto;

    :hover {
        cursor: pointer;
    }
`;

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

const ItemPage = ({item, onClearItem}) => {
    const {name, type, tier, m4, redText, ability, elements} = item;

    const tiers = getTiers();
    let tierObj = tiers.find(obj => obj.tier === tier);

    let dedicatedDrops = getDedicatedDrops(item);

    return (
        <StyledPage>
            <Header/>
            <StyledButton onClick={onClearItem}>Go Back</StyledButton>
            <h3>{name}</h3>
            <StyledTable>
                <tbody>
                    <tr>
                        <td colSpan="2" style={{backgroundColor: tierObj.color, color: 'black', fontWeight: 'bold'}}>{tierObj.name}</td>
                    </tr>
                    <TableRow label="Type" value={type}/>
                    {
                        m4 ? (
                            <tr>
                                <td>Requires M4</td>
                                <td>{m4 ? "Yes" : "No"}</td>
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
            </StyledTable>

            <h4>Dedicated Drop{dedicatedDrops.length > 1 ? 's' : ''}</h4>

            {
                dedicatedDrops.map(obj => {
                    return (
                        <StyledTable>
                            <tbody>
                                <TableRow label="Source" value={obj.dedicated}/>
                                <TableRow label="Quest" value={obj.quest}/>
                                <TableRow label="Location" value={obj.location}/>
                                <TableRow label="Area" value={obj.area}/>
                            </tbody>
                        </StyledTable>
                    );
                })
            }
        </StyledPage>
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