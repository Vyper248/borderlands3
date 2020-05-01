import React from 'react';
import styled from 'styled-components';

import Table from './Table';
import Button from './Button';

const StyledComp = styled.div`
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    max-height: 400px;
    overflow: scroll;
    border-top: 1px solid white;
    padding-top: 5px;
    background-color: black;
    z-index: 5;
`;

const TableRow = ({label, value, suffix=''}) => {    
    if (typeof value === 'string' && value.length === 0) return null;
    if (value === 'None') return null;
    if (value !== undefined) {
        return (
            <tr>
                <td>{label}</td>
                <td>{value+suffix}</td>
            </tr>
        );
    } else {
        return null;
    }
}

const getWeaponLayout = (item) => {
    const {name, type, level, annoint, notes, prefix, damage, element1, element2, elementDmg, elementChance, elementEfficiency} = item;   
    const showChance =(element1 !== 'None' || element2 !== 'None') && (element1 !== 'Cryo' && element2 !== 'Cryo');

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label="Type" value={type}/>
            <TableRow label="Prefix" value={prefix}/>
            <TableRow label="Level" value={level}/>
            <TableRow label="Notes" value={notes}/>
            <TableRow label="Damage" value={damage}/>
            <TableRow label={element2 !== 'None' ? "Element 1" : 'Element'} value={element1}/>
            <TableRow label="Element 2" value={element2}/>
            { element1 !== 'None' || element2 !== 'None' ? <TableRow label="Element Damage" value={elementDmg}/> : null }
            { showChance ? <TableRow label="Element Chance" value={elementChance} suffix='%'/> : null }
            { element1 === 'Cryo' || element2 === 'Cryo' ? <TableRow label="Cryo Efficiency" value={elementEfficiency} suffix='%'/> : null }
            <TableRow label="Annointment" value={annoint}/>
        </tbody>
    );
}

const getShieldLayout = (item) => {
    const {name, type, prefix, level, annoint, notes, capacity, rechargeDelay, rechargeRate, element1, elementChance} = item;   

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label="Type" value={type}/>
            <TableRow label="Prefix" value={prefix}/>
            <TableRow label="Level" value={level}/>
            <TableRow label="Notes" value={notes}/>
            <TableRow label="Capacity" value={capacity}/>
            <TableRow label="Recharge Delay" value={rechargeDelay}/>
            <TableRow label="Recharge Rate" value={rechargeRate}/>
            { element1 !== 'None' ? <TableRow label="Element Res." value={element1}/> : null }
            { element1 !== 'None' ? <TableRow label="Resistance %" value={elementChance} suffix='%'/> : null }
            <TableRow label="Annointment" value={annoint}/>
        </tbody>
    );
}

const getGrenadeLayout = (item) => {
    const {name, type, prefix, level, annoint, notes, damage, radius, element1, elementDmg, elementChance} = item;   

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label="Type" value={type}/>
            <TableRow label="Prefix" value={prefix}/>
            <TableRow label="Level" value={level}/>
            <TableRow label="Notes" value={notes}/>
            <TableRow label="Damage" value={damage}/>
            <TableRow label="Radius" value={radius}/>
            <TableRow label="Element" value={element1}/>
            { element1 !== 'None' ? <TableRow label="Element Damage" value={elementDmg}/> : null }
            { element1 !== 'None' ? <TableRow label="Element Chance" value={elementChance} suffix='%'/> : null }
            <TableRow label="Annointment" value={annoint}/>
        </tbody>
    );
}

const BankItemDetails = ({item, onClose, onDelete}) => {    
    const {type} = item;    
    const isWeapon = type === 'Shotgun' || type === 'AR' || type === 'Sniper' || type === 'Rocket Launcher' || type === 'SMG' || type === 'Pistol';    
    
    return (
        <StyledComp>
            <div>
                <Button onClick={onDelete} style={{display: 'inline-block', float: 'left', marginLeft: '20px'}}>Delete</Button> 
                <Button onClick={onClose} style={{display: 'inline-block', float: 'right', marginRight: '20px', marginBottom: '5px'}}>Close</Button>
            </div>
            <Table col1Width='150px'>
                { isWeapon ? getWeaponLayout(item) : null }
                { type === 'Shield' ? getShieldLayout(item) : null }
                { type === 'Grenade' ? getGrenadeLayout(item) : null }
            </Table>
        </StyledComp>
    );
}

export default BankItemDetails;