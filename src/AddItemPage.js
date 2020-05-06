import React, { useState, Fragment } from 'react';
import styled from 'styled-components';

import { getAnnointments, getModSkills } from './items';

import Header from './components/Header';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import InputSuggest from './components/InputSuggest';
import NumberInput from './components/NumberInput';
import Input from './components/Input';

const StyledTable = styled.table`
    margin: 0px auto 10px auto;
    border-collapse: collapse;
    width: 360px;
    max-width: 360px;
    min-width: 360px;

    & td {
        height: 30px;
        min-height: 30px;
        border: 1px solid #333;
    }
`;

const ModIcon = styled.img`
    height: 30px;
    display: inline-block;
    float: left;
    border: 1px solid ${props => props.color ? props.color : 'black'};
    background-color: ${props => props.color ? props.color : 'black'};
    margin-right: 5px;
`;

const FlexRow = styled.div`
    display: flex;
`;

const AddItemPage = ({onBack, onAddItem}) => {
    const [nameSuggest, setNameSuggest] = useState('');

    //general
    const [type, setType] = useState('Class Mod'); //auto set
    const [name, setName] = useState('Breaker'); //lookup
    const [level, setLevel] = useState(57);
    const [notes, setNotes] = useState('');
    const [annoint, setAnnoint] = useState('None'); //dropdown
    const [prefix, setPrefix] = useState(''); //dropdown

    //weapon specific
    const [damage, setDamage] = useState(0);
    const [damageMult, setDamageMult] = useState(1);
    const [element1, setElement1] = useState('None'); //dropdown
    const [element2, setElement2] = useState('None'); //dropdown
    const [elementDmg, setElementDmg] = useState(0);
    const [elementChance, setElementChance] = useState(0);
    const [elementEfficiency, setElementEfficiency] = useState(0);

    //shield specific
    const [capacity, setCapacity] = useState(0);
    const [rechargeDelay, setRechargeDelay] = useState(0);
    const [rechargeRate, setRechargeRate] = useState(0);
    const [shieldEffect1, setSheildEffect1] = useState('');
    const [shieldEffect2, setSheildEffect2] = useState('');
    const [shieldEffect3, setSheildEffect3] = useState('');

    //grenade specific
    const [radius, setRadius] = useState(0);
    const [grenadeEffect1, setGrenadeEffect1] = useState('');
    const [grenadeEffect2, setGrenadeEffect2] = useState('');
    const [grenadeEffect3, setGrenadeEffect3] = useState('');

    //mod specific
    const [modClass, setModClass] = useState(''); //auto
    const [ability1, setAbility1] = useState(0);
    const [ability2, setAbility2] = useState(0);
    const [ability3, setAbility3] = useState(0);

    //mod/artifact
    const [stat1, setStat1] = useState('');
    const [stat2, setStat2] = useState('');
    const [stat3, setStat3] = useState('');

    const isWeapon = type === 'Shotgun' || type === 'AR' || type === 'Sniper' || type === 'Rocket Launcher' || type === 'SMG' || type === 'Pistol';

    const onClickSuggestion = (obj) => () => {
        setName(obj.name);
        setNameSuggest('');
        setType(obj.type);        
        setModClass(obj.character);
    }

    const onClickAdd = () => {
        let item = {};
        if (isWeapon) item = {name, type, prefix, level, annoint, notes, damage, damageMult, element1, element2, elementDmg, elementChance, elementEfficiency};
        if (type === 'Grenade') item = {name, type, prefix, level, annoint, notes, damage, radius, element1, elementDmg, elementChance, elementEfficiency};
        if (type === 'Shield') item = {name, type, prefix, level, annoint, notes, capacity, rechargeDelay, rechargeRate, element1, elementChance};
        if (type === 'Class Mod') item = {name, type, modClass, level, notes, ability1, ability2, ability3, stat1, stat2, stat3};
        if (type === 'Artifact') item = {name, type, prefix, level, notes, stat1, stat2, stat3};

        onAddItem(item);        
    }

    const levels = new Array(57).fill(0).map((a,i) => i+1).reverse();
    const annointments = getAnnointments();
    const cryoOnly = (element1 === 'Cryo' && element2 === 'None') || (element2 === 'Cryo' && element1 === 'None') || (element1 === 'Cryo' && element2 === 'Cryo');
    const noElement = element1 === 'None' && element2 === 'None';
      

    const getWeaponLayout = () => {
        return (
            <div style={{padding: '10px'}}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td style={{minWidth: '150px', maxWidth: '150px', width: '150px'}}>Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{type}</td>
                        </tr>
                        <tr>
                            <td>Prefix</td>
                            <td><Input value={prefix} onChange={(e) => setPrefix(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td><Dropdown value={level} placeholder="Level" items={levels} onChange={(value) => setLevel(value)}/></td>
                        </tr>
                        <tr>
                            <td>Annointment</td>
                            <td><Dropdown value={annoint} items={annointments['Weapon']} onChange={(value) => setAnnoint(value)}/></td>
                        </tr>
                        <tr>
                            <td>Notes</td>
                            <td><Input value={notes} onChange={(e) => setNotes(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Damage</td>
                            <td><NumberInput value={damage} onChange={(value) => setDamage(value)} width='139px'/> x <NumberInput value={damageMult} onChange={(value) => setDamageMult(value)} width='50px' clearOnOpen={true}/></td>
                        </tr>
                        <tr>
                            <td>Element 1</td>
                            <td><Dropdown value={element1} placeholder="Element 1" items={['Fire', 'Cryo', 'Corrosive', 'Shock', 'Radiation', 'None']} onChange={(value) => setElement1(value)}/></td>
                        </tr>
                        <tr>
                            <td>Element 2</td>
                            <td><Dropdown value={element2} placeholder="Element 2" items={['Fire', 'Cryo', 'Corrosive', 'Shock', 'Radiation', 'None']} onChange={(value) => setElement2(value)}/></td>
                        </tr>
                        {
                            cryoOnly || noElement ? null : (
                                <Fragment>
                                    <tr>
                                        <td>Element Damage</td>
                                        <td><NumberInput value={elementDmg} onChange={(value) => setElementDmg(value)}/></td>
                                    </tr>
                                    <tr>
                                        <td>Element Chance</td>
                                        <td><NumberInput value={elementChance} onChange={(value) => setElementChance(value)} suffix='%'/></td>
                                    </tr>
                                </Fragment>
                            )
                        }
                        {
                            element1 === 'Cryo' || element2 === 'Cryo' ? (
                                <tr>
                                    <td>Cryo Efficiency</td>
                                    <td><NumberInput value={elementEfficiency} onChange={(value) => setElementEfficiency(value)} suffix='%'/></td>
                                </tr>
                            ) : null
                        }
                    </tbody>
                </StyledTable>
            </div>
        );
    }

    const getGrenadeLayout = () => {
        return (
            <div style={{padding: '10px'}}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td style={{minWidth: '150px', maxWidth: '150px', width: '150px'}}>Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{type}</td>
                        </tr>
                        <tr>
                            <td>Prefix</td>
                            <td><Input value={prefix} onChange={(e) => setPrefix(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td><Dropdown value={level} placeholder="Level" items={levels} onChange={(value) => setLevel(value)}/></td>
                        </tr>
                        <tr>
                            <td>Annointment</td>
                            <td><Dropdown value={annoint} items={annointments['Grenade']['Universal']} onChange={(value) => setAnnoint(value)}/></td>
                        </tr>
                        <tr>
                            <td>Notes</td>
                            <td><Input value={notes} onChange={(e) => setNotes(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Damage</td>
                            <td><NumberInput value={damage} onChange={(value) => setDamage(value)}/></td>
                        </tr>
                        <tr>
                            <td>Radius</td>
                            <td><NumberInput value={radius} onChange={(value) => setRadius(value)}/></td>
                        </tr>
                        <tr>
                            <td>Element</td>
                            <td><Dropdown value={element1} placeholder="Element 1" items={['Fire', 'Cryo', 'Corrosive', 'Shock', 'Radiation', 'None']} onChange={(value) => setElement1(value)}/></td>
                        </tr>
                        <tr>
                            <td>Element Damage</td>
                            <td><NumberInput value={elementDmg} onChange={(value) => setElementDmg(value)}/></td>
                        </tr>
                        {
                            element1 === 'Cryo' ? (
                                <tr>
                                    <td>Element Efficiency</td>
                                    <td><NumberInput value={elementEfficiency} onChange={(value) => setElementEfficiency(value)} suffix='%'/></td>
                                </tr>
                            ) : (
                                <tr>
                                    <td>Element Chance</td>
                                    <td><NumberInput value={elementChance} onChange={(value) => setElementChance(value)} suffix='%'/></td>
                                </tr>
                            )
                        }
                    </tbody>
                </StyledTable>
            </div>
        );
    }

    const getShieldLayout = () => {
        return (
            <div style={{padding: '10px'}}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td style={{minWidth: '150px', maxWidth: '150px', width: '150px'}}>Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{type}</td>
                        </tr>
                        <tr>
                            <td>Prefix</td>
                            <td><Input value={prefix} onChange={(e) => setPrefix(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td><Dropdown value={level} placeholder="Level" items={levels} onChange={(value) => setLevel(value)}/></td>
                        </tr>
                        <tr>
                            <td>Annointment</td>
                            <td><Dropdown value={annoint} items={annointments['Shield']} onChange={(value) => setAnnoint(value)}/></td>
                        </tr>
                        <tr>
                            <td>Notes</td>
                            <td><Input value={notes} onChange={(e) => setNotes(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Capacity</td>
                            <td><NumberInput value={capacity} onChange={(value) => setCapacity(value)}/></td>
                        </tr>
                        <tr>
                            <td>Recharge Delay</td>
                            <td><NumberInput value={rechargeDelay} onChange={(value) => setRechargeDelay(value)}/></td>
                        </tr>
                        <tr>
                            <td>Recharge Rate</td>
                            <td><NumberInput value={rechargeRate} onChange={(value) => setRechargeRate(value)}/></td>
                        </tr>
                        <tr>
                            <td>Element Res.</td>
                            <td><Dropdown value={element1} items={['Fire', 'Cryo', 'Corrosive', 'Shock', 'Radiation', 'None']} onChange={(value) => setElement1(value)}/></td>
                        </tr>
                        <tr>
                            <td>Resistance %</td>
                            <td><NumberInput value={elementChance} onChange={(value) => setElementChance(value)} suffix='%'/></td>
                        </tr>
                    </tbody>
                </StyledTable>
            </div>
        );
    }
    
    const getModLayout = () => {
        const modSkills = getModSkills();
        const relevantSkills = modSkills[name] || [];  

        return (
            <div style={{padding: '10px'}}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td style={{minWidth: '150px', maxWidth: '150px', width: '150px'}}>Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{type}</td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td>{modClass}</td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td><Dropdown value={level} placeholder="Level" items={levels} onChange={(value) => setLevel(value)}/></td>
                        </tr>
                        <tr>
                            <td>Notes</td>
                            <td><Input value={notes} onChange={(e) => setNotes(e.target.value)}/></td>
                        </tr>
                        {
                            relevantSkills.map((skill, i) => {
                                let [skillName, color] = skill.split(':');
                                let imageName = skillName.replace(/ /g, '') + '.png';
                                let variable, setVariable;
                                if (i === 0) {variable = ability1; setVariable = setAbility1;}
                                if (i === 1) {variable = ability2; setVariable = setAbility2;}
                                if (i === 2) {variable = ability3; setVariable = setAbility3;}
                                return (
                                    <tr key={'modSkill-'+i}>
                                        <td>{skillName}</td>
                                        <td><FlexRow><ModIcon src={require(`./abilityIcons/${imageName}`)} alt='Ability Icon' color={color}/><Dropdown value={variable} items={[0,1,2,3]} onChange={(value) => setVariable(value)}/></FlexRow></td>
                                    </tr>
                                );
                            })
                        }
                        <tr>
                            <td>Stat 1</td>
                            <td><Input value={stat1} onChange={(e) => setStat1(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Stat 2</td>
                            <td><Input value={stat2} onChange={(e) => setStat2(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Stat 3</td>
                            <td><Input value={stat3} onChange={(e) => setStat3(e.target.value)}/></td>
                        </tr>
                    </tbody>
                </StyledTable>
            </div>
        );
    }

    const getArtifactLayout = () => {
        return (
            <div style={{padding: '10px'}}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td style={{minWidth: '150px', maxWidth: '150px', width: '150px'}}>Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{type}</td>
                        </tr>
                        <tr>
                            <td>Prefix</td>
                            <td><Input value={prefix} onChange={(e) => setPrefix(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td><Dropdown value={level} placeholder="Level" items={levels} onChange={(value) => setLevel(value)}/></td>
                        </tr>
                        <tr>
                            <td>Notes</td>
                            <td><Input value={notes} onChange={(e) => setNotes(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Stat 1</td>
                            <td><Input value={stat1} onChange={(e) => setStat1(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Stat 2</td>
                            <td><Input value={stat2} onChange={(e) => setStat2(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Stat 3</td>
                            <td><Input value={stat3} onChange={(e) => setStat3(e.target.value)}/></td>
                        </tr>
                    </tbody>
                </StyledTable>
            </div>
        );
    }

    return (
        <div>
            <Header onBank={true}/>
            <h3>Add Item</h3>
            <InputSuggest type="name" placeholder="Search" value={nameSuggest} onChange={(e) => setNameSuggest(e.target.value)} onClickSuggestion={onClickSuggestion}/>
            { isWeapon ? getWeaponLayout() : null }
            { type === 'Grenade' ? getGrenadeLayout() : null }
            { type === 'Shield' ? getShieldLayout() : null }
            { type === 'Class Mod' ? getModLayout() : null }
            { type === 'Artifact' ? getArtifactLayout() : null }
            <Input as='button' onClick={onBack} width='150px'>Cancel</Input> { name.length > 0 ? <Input as='button' onClick={onClickAdd} width='150px'>Add</Input> : null }
        </div>
    );
};

export default AddItemPage;