import React from 'react';
import styled from 'styled-components';

import { getModSkills } from '../items';

import Table from './Table';
import Button from './Button';
import Container from './Container';

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
    if (label === 'Recharge Delay' && value === 0) return null;
    if (label === 'Recharge Rate' && value === 0) return null;
    if (label === undefined) return null;
    
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
    const {name, type, level, annoint, notes, prefix, damage, damageMult, element1, element2, elementDmg, elementChance, elementEfficiency} = item;   
    const showChance = (element1 !== 'Cryo' && element1 !== 'None') || (element2 !== 'Cryo' && element2 !== 'None');
    let damageStr = damage;
    if (damageMult !== undefined && damageMult !== 1 && damageMult !== '') damageStr += ' x ' + damageMult;

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label="Type" value={type}/>
            <TableRow label="Prefix" value={prefix}/>
            <TableRow label="Level" value={level}/>
            <TableRow label="Notes" value={notes}/>
            <TableRow label="Damage" value={damageStr}/>
            <TableRow label={element2 !== 'None' && element2 !== '' ? "Element 1" : 'Element'} value={element1}/>
            <TableRow label="Element 2" value={element2}/>
            { showChance ? <TableRow label="Element Damage" value={elementDmg}/> : null }
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
    const {name, type, prefix, level, annoint, notes, damage, radius, element1, elementDmg, elementChance, grenadeEffect1, grenadeEffect2, grenadeEffect3} = item;   

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
            <TableRow label="Effect 1" value={grenadeEffect1}/>
            <TableRow label="Effect 2" value={grenadeEffect2}/>
            <TableRow label="Effect 3" value={grenadeEffect3}/>
        </tbody>
    );
}

const getModLayout = (item) => {
    const {name, type, modClass, level, notes, ability1, ability2, ability3, stat1, stat2, stat3} = item;   
    const modSkills = getModSkills();
    const relevantSkills = modSkills[name] || [];
    const skillNames = relevantSkills.map(skill => skill.split(':')[0]);

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label="Type" value={type}/>
            <TableRow label="Class" value={modClass}/>
            <TableRow label="Level" value={level}/>
            <TableRow label="Notes" value={notes}/>
            <TableRow label={skillNames[0]} value={ability1}/>
            <TableRow label={skillNames[1]} value={ability2}/>
            <TableRow label={skillNames[2]} value={ability3}/>
            <TableRow label="Stat 1" value={stat1}/>
            <TableRow label="Stat 2" value={stat2}/>
            <TableRow label="Stat 3" value={stat3}/>
        </tbody>
    );
}

const getArtifactLayout = (item) => {
    const {name, type, prefix, level, notes, stat1, stat2, stat3} = item;   

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label="Type" value={type}/>
            <TableRow label="Prefix" value={prefix}/>
            <TableRow label="Level" value={level}/>
            <TableRow label="Notes" value={notes}/>
            <TableRow label="Stat 1" value={stat1}/>
            <TableRow label="Stat 2" value={stat2}/>
            <TableRow label="Stat 3" value={stat3}/>
        </tbody>
    );
}

const BankItemDetails = ({item, onClose, onDelete}) => {    
    const {type} = item;    
    const isWeapon = type === 'Shotgun' || type === 'AR' || type === 'Sniper' || type === 'Rocket Launcher' || type === 'SMG' || type === 'Pistol';    
    
    return (
        <StyledComp>
            <Container>
                <div>
                    <Button onClick={onDelete} style={{display: 'inline-block', float: 'left', marginLeft: '20px'}}>Delete</Button> 
                    <Button onClick={onClose} style={{display: 'inline-block', float: 'right', marginRight: '20px', marginBottom: '5px'}}>Close</Button>
                </div>
                <Table col1Width='150px'>
                    { isWeapon ? getWeaponLayout(item) : null }
                    { type === 'Shield' ? getShieldLayout(item) : null }
                    { type === 'Grenade' ? getGrenadeLayout(item) : null }
                    { type === 'Class Mod' ? getModLayout(item) : null }
                    { type === 'Artifact' ? getArtifactLayout(item) : null }
                </Table>
            </Container>
        </StyledComp>
    );
}

export default BankItemDetails;