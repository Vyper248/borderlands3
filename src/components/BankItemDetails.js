import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import getItems, { getModSkills, getTiers } from '../items';

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

const StyledSideComp = styled.div`
    position: fixed;
    top: 90px;
    right: 0px;
    width: 400px;
    bottom: 0px;
    background-color: black;
    z-index: 5;
`;

const ModIcon = styled.div`
    display: inline-block;
    position: relative;
    margin-right: 5px;
    border: 1px solid ${props => props.color ? props.color : 'black'};
    background-color: ${props => props.color ? props.color : 'black'};
    height: 62px;

    & > img {
        height: 60px;
        opacity: 0.9;
    }

    & > span {
        position: absolute;
        top: -1px;
        right: 3px;
        color: #FFE417;
        font-weight: bold;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
        font-size: 1.2em;
    }
`;

const TableRow = ({label, value, suffix='', single=false}) => {    
    if (typeof value === 'string' && value.length === 0) return null;
    if (label === 'Recharge Delay' && value === 0) return null;
    if (label === 'Recharge Rate' && value === 0) return null;
    if (label === undefined) return null;
    
    if (value === 'None') return null;
    if (value !== undefined) {
        return (
            <tr>
                { !single ? <td>{label}</td> : null }
                <td colSpan={single ? '2' : '1'}>{value+suffix}</td>
            </tr>
        );
    } else {
        return null;
    }
}

const getWeaponLayout = (item) => {
    let {name, type, level, annoint, notes, prefix, damage, damageMult, element1, element2, elementDmg, elementChance, elementEfficiency, tier} = item;   
    const showChance = (element1 !== 'Cryo' && element1 !== 'None') || (element2 !== 'Cryo' && element2 !== 'None');
    let damageStr = damage;
    if (damageMult !== undefined && damageMult !== 1 && damageMult !== '') damageStr += ' x ' + damageMult;
    if (element1 === 'Fire') element1 = 'Incendiary';
    if (element2 === 'Fire') element2 = 'Incendiary';

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label='Tier' value={tier}/>
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
    let {name, tier, type, prefix, level, annoint, notes, capacity, rechargeDelay, rechargeRate, element1, elementChance, shieldEffect1, shieldEffect2, shieldEffect3} = item;   
    if (element1 === 'Fire') element1 = 'Incendiary';

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label='Tier' value={tier}/>
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
            <TableRow label="Effect 1" value={shieldEffect1}/>
            <TableRow label="Effect 2" value={shieldEffect2}/>
            <TableRow label="Effect 3" value={shieldEffect3}/>
        </tbody>
    );
}

const getGrenadeLayout = (item) => {
    let {name, tier, type, prefix, level, annoint, notes, damage, radius, element1, elementDmg, elementChance, grenadeEffect1, grenadeEffect2, grenadeEffect3} = item;  
    if (element1 === 'Fire') element1 = 'Incendiary'; 

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label='Tier' value={tier}/>
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
    const {name, tier, type, modClass, level, notes, ability1, ability2, ability3, stat1, stat2, stat3} = item;   
    const modSkills = getModSkills();
    const relevantSkills = modSkills[name] || [];
    const skillNames = relevantSkills.map(skill => skill.split(':')[0]);
    const skills = relevantSkills.map(skill => {
        let [skillName, color] = skill.split(':');
        let imageName = skillName.replace(/ /g, '') + '.png';
        return {skillName, color, imageName};
    });


    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label='Tier' value={tier}/>
            <TableRow label="Type" value={type}/>
            <TableRow label="Class" value={modClass}/>
            <TableRow label="Level" value={level}/>
            <TableRow label="Notes" value={notes}/>
            <tr>
                <td colSpan='2'>
                {
                    skills.map((skill, i) => {
                        let value = 0;
                        if (i === 0) value = ability1;
                        if (i === 1) value = ability2;
                        if (i === 2) value = ability3;
                        if (value === 0) return null;
                        return (<ModIcon key={skill.skillName} color={skill.color}>
                                    <img src={require(`../abilityIcons/${skill.imageName}`)} alt='Ability Icon'/>
                                    <span>+{value}</span>
                                </ModIcon>);
                    })
                }
                </td>
            </tr>
            <TableRow label="Stat 1" value={stat1} single={true}/>
            <TableRow label="Stat 2" value={stat2} single={true}/>
            <TableRow label="Stat 3" value={stat3} single={true}/>
        </tbody>
    );
}

const getArtifactLayout = (item) => {
    const {name, tier, type, prefix, level, notes, stat1, stat2, stat3} = item;   

    return (
        <tbody>
            <TableRow label="Name" value={name}/>
            <TableRow label='Tier' value={tier}/>
            <TableRow label="Type" value={type}/>
            <TableRow label="Prefix" value={prefix}/>
            <TableRow label="Level" value={level}/>
            <TableRow label="Notes" value={notes}/>
            <TableRow label="Stat 1" value={stat1} single={true}/>
            <TableRow label="Stat 2" value={stat2} single={true}/>
            <TableRow label="Stat 3" value={stat3} single={true}/>
        </tbody>
    );
}

const ResponsiveComp = ({isLargeScreen, children}) => {
    if (isLargeScreen) {
        return <StyledSideComp>{children}</StyledSideComp>;
    } else {
        return <StyledComp>{children}</StyledComp>;
    }
}

const BankItemDetails = ({item, onClose, onDelete, onShowItem}) => {    
    const isLargeScreen = useMediaQuery({ minWidth: 1700 });

    const {type} = item;    
    const isWeapon = type === 'Shotgun' || type === 'AR' || type === 'Sniper' || type === 'Rocket Launcher' || type === 'SMG' || type === 'Pistol';    

    //get tier of item if can find it
    const items = getItems();
    const tierNames = getTiers();
    const itemObj = items.find(obj => obj.name === item.name);
    const tier = itemObj !== undefined ? itemObj.tier : 0;
    const tierObj= tierNames.find(obj => obj.tier === tier);
    const tierName = tierObj !== undefined ? tierObj.name : 'Unknown';
    item.tier = tierName;

    return (
        <ResponsiveComp isLargeScreen={isLargeScreen}>
            <Container>
                <div>
                    <Button onClick={onDelete} style={{display: 'inline-block', float: 'left', marginLeft: '20px', marginBottom: '5px'}}>Delete</Button> 
                    <Button onClick={onClose} style={{display: 'inline-block', float: 'right', marginRight: '20px', marginBottom: '5px'}}>Close</Button>
                </div>
                <Table col1Width='150px'>
                    { isWeapon ? getWeaponLayout(item) : null }
                    { type === 'Shield' ? getShieldLayout(item) : null }
                    { type === 'Grenade' ? getGrenadeLayout(item) : null }
                    { type === 'Class Mod' ? getModLayout(item) : null }
                    { type === 'Artifact' ? getArtifactLayout(item) : null }
                </Table>
                { itemObj !== undefined ? <Button onClick={onShowItem(item.name)} style={{marginBottom: '5px'}}>Show Details</Button> : null }
            </Container>
        </ResponsiveComp>
    );
}

export default BankItemDetails;