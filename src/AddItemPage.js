import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';

import { getAnnointments, getModSkills, getGrenadeEffects, getShieldEffects, getTypes } from './items';

import Header from './components/Header';
import Dropdown from './components/Dropdown';
import InputSuggest from './components/InputSuggest';
import NumberInput from './components/NumberInput';
import Input from './components/Input';
import IconButton from './components/IconButton';
import Container from './components/Container';

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

const AddItemPage = ({onBack, onAddItem, showTierList, showInfo}) => {
    const [nameSuggest, setNameSuggest] = useState('');
    const [customMode, setCustomMode] = useState(false);

    //general
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [level, setLevel] = useState(57);
    const [notes, setNotes] = useState('');
    const [annoint, setAnnoint] = useState('None');
    const [prefix, setPrefix] = useState('');

    //weapon specific
    const [damage, setDamage] = useState(0);
    const [damageMult, setDamageMult] = useState(1);
    const [element1, setElement1] = useState('None');
    const [element2, setElement2] = useState('None');
    const [elementDmg, setElementDmg] = useState(0);
    const [elementChance, setElementChance] = useState(0);
    const [elementEfficiency, setElementEfficiency] = useState(0);

    //shield specific
    const [capacity, setCapacity] = useState(0);
    const [rechargeDelay, setRechargeDelay] = useState(0);
    const [rechargeRate, setRechargeRate] = useState(0);
    const [shieldEffect1, setShieldEffect1] = useState('None');
    const [shieldEffect2, setShieldEffect2] = useState('None');
    const [shieldEffect3, setShieldEffect3] = useState('None');

    //grenade specific
    const [radius, setRadius] = useState(0);
    const [grenadeEffect1, setGrenadeEffect1] = useState('None');
    const [grenadeEffect2, setGrenadeEffect2] = useState('None');
    const [grenadeEffect3, setGrenadeEffect3] = useState('None');

    //mod specific
    const [modClass, setModClass] = useState('');
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

    const onSelectNew = () => {
        setName('');
        setType('');
    }

    const onClickAdd = () => {
        let item = {};
        if (isWeapon) item = {name, type, prefix, level, annoint, notes, damage, damageMult, element1, element2, elementDmg, elementChance, elementEfficiency};
        if (type === 'Grenade') item = {name, type, prefix, level, annoint, notes, damage, radius, element1, elementDmg, elementChance, elementEfficiency, grenadeEffect1, grenadeEffect2, grenadeEffect3};
        if (type === 'Shield') item = {name, type, prefix, level, annoint, notes, capacity, rechargeDelay, rechargeRate, element1, elementChance, shieldEffect1, shieldEffect2, shieldEffect3};
        if (type === 'Class Mod') item = {name, type, modClass, level, notes, ability1, ability2, ability3, stat1, stat2, stat3};
        if (type === 'Artifact') item = {name, type, prefix, level, notes, stat1, stat2, stat3};

        onAddItem(item);        
    }

    const levels = new Array(57).fill(0).map((a,i) => i+1).reverse();
    const annointments = getAnnointments();
    const types = getTypes();
    const cryoOnly = (element1 === 'Cryo' && element2 === 'None') || (element2 === 'Cryo' && element1 === 'None') || (element1 === 'Cryo' && element2 === 'Cryo');
    const noElement = element1 === 'None' && element2 === 'None';
      
    const getBasicLayout = () => {
        return (
            <div style={{padding: '10px'}}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td style={{minWidth: '150px', maxWidth: '150px', width: '150px'}}>Name</td>
                            <td><Input value={name} onChange={(e) => setName(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td><Dropdown value={type} items={types} onChange={(value) => setType(value)}/></td>
                        </tr>
                    </tbody>
                </StyledTable>
            </div>
        );
    }

    const getWeaponLayout = () => {
        return (
            <div style={{padding: '10px'}}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td style={{minWidth: '150px', maxWidth: '150px', width: '150px'}}>Name</td>
                            <td>{customMode ? <Input value={name} onChange={(e) => setName(e.target.value)}/> : name }</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{customMode ? <Dropdown value={type} items={types} onChange={(value) => setType(value)}/> : type }</td>
                        </tr>
                        <tr>
                            <td>Prefix</td>
                            <td><Input value={prefix} onChange={(e) => setPrefix(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td><Dropdown value={level} items={levels} onChange={(value) => setLevel(value)}/></td>
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
                            <td><Dropdown value={element1} placeholder="Element 1" items={['Incendiary', 'Cryo', 'Corrosive', 'Shock', 'Radiation', 'None']} onChange={(value) => setElement1(value)}/></td>
                        </tr>
                        <tr>
                            <td>Element 2</td>
                            <td><Dropdown value={element2} placeholder="Element 2" items={['Incendiary', 'Cryo', 'Corrosive', 'Shock', 'Radiation', 'None']} onChange={(value) => setElement2(value)}/></td>
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
        const grenadeEffects = getGrenadeEffects();

        return (
            <div style={{padding: '10px'}}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td style={{minWidth: '150px', maxWidth: '150px', width: '150px'}}>Name</td>
                            <td>{customMode ? <Input value={name} onChange={(e) => setName(e.target.value)}/> : name }</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{customMode ? <Dropdown value={type} items={types} onChange={(value) => setType(value)}/> : type }</td>
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
                            <td><Dropdown value={annoint} items={annointments['Grenade']} onChange={(value) => setAnnoint(value)}/></td>
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
                            <td><Dropdown value={element1} placeholder="Element 1" items={['Incendiary', 'Cryo', 'Corrosive', 'Shock', 'Radiation', 'None']} onChange={(value) => setElement1(value)}/></td>
                        </tr>
                        {
                            element1 === 'None' ? null : (
                                <tr>
                                    <td>Element Damage</td>
                                    <td><NumberInput value={elementDmg} onChange={(value) => setElementDmg(value)}/></td>
                                </tr>
                            )
                        }
                        {
                            element1 === 'Cryo' ? (
                                <tr>
                                    <td>Element Efficiency</td>
                                    <td><NumberInput value={elementEfficiency} onChange={(value) => setElementEfficiency(value)} suffix='%'/></td>
                                </tr>
                            ) : null
                         }
                         {
                            element1 !== 'Cryo' && element1 !== 'None' ? (
                                <tr>
                                    <td>Element Chance</td>
                                    <td><NumberInput value={elementChance} onChange={(value) => setElementChance(value)} suffix='%'/></td>
                                </tr>
                            ) : null
                        }
                        <tr>
                            <td>Effect 1</td>
                            <td><Dropdown value={grenadeEffect1} items={grenadeEffects} onChange={(value) => setGrenadeEffect1(value)}/></td>
                        </tr>
                        {
                            grenadeEffect1 !== 'None' ? (
                                <tr>
                                    <td>Effect 2</td>
                                    <td><Dropdown value={grenadeEffect2} items={grenadeEffects} onChange={(value) => setGrenadeEffect2(value)}/></td>
                                </tr>
                            ) : null
                        }
                        {
                            grenadeEffect2 !== 'None' ? (
                                <tr>
                                    <td>Effect 3</td>
                                    <td><Dropdown value={grenadeEffect3} items={grenadeEffects} onChange={(value) => setGrenadeEffect3(value)}/></td>
                                </tr>
                            ) : null
                        }
                    </tbody>
                </StyledTable>
            </div>
        );
    }

    const getShieldLayout = () => {
        const shieldEffects = getShieldEffects();
        return (
            <div style={{padding: '10px'}}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td style={{minWidth: '150px', maxWidth: '150px', width: '150px'}}>Name</td>
                            <td>{customMode ? <Input value={name} onChange={(e) => setName(e.target.value)}/> : name }</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{customMode ? <Dropdown value={type} items={types} onChange={(value) => setType(value)}/> : type }</td>
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
                            <td><Dropdown value={element1} items={['Incendiary', 'Cryo', 'Corrosive', 'Shock', 'Radiation', 'None']} onChange={(value) => setElement1(value)}/></td>
                        </tr>
                        <tr>
                            <td>Resistance %</td>
                            <td><NumberInput value={elementChance} onChange={(value) => setElementChance(value)} suffix='%'/></td>
                        </tr>
                        <tr>
                            <td>Effect 1</td>
                            <td><Dropdown value={shieldEffect1} items={shieldEffects} onChange={(value) => setShieldEffect1(value)}/></td>
                        </tr>
                        {
                            shieldEffect1 !== 'None' ? (
                                <tr>
                                    <td>Effect 2</td>
                                    <td><Dropdown value={shieldEffect2} items={shieldEffects} onChange={(value) => setShieldEffect2(value)}/></td>
                                </tr>
                            ) : null
                        }
                        {
                            shieldEffect2 !== 'None' ? (
                                <tr>
                                    <td>Effect 3</td>
                                    <td><Dropdown value={shieldEffect3} items={shieldEffects} onChange={(value) => setShieldEffect3(value)}/></td>
                                </tr>
                            ) : null
                        }
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
                            <td>{customMode ? <Input value={name} onChange={(e) => setName(e.target.value)}/> : name }</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{customMode ? <Dropdown value={type} items={types} onChange={(value) => setType(value)}/> : type }</td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td>{customMode ? <Dropdown value={modClass} items={['Amara', 'Fl4k', 'Moze', 'Zane']} onChange={(value) => setModClass(value)}/> : modClass}</td>
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
                            <td>{customMode ? <Input value={name} onChange={(e) => setName(e.target.value)}/> : name }</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{customMode ? <Dropdown value={type} items={types} onChange={(value) => setType(value)}/> : type }</td>
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
            <Header onBank={true} showTierList={showTierList} showInfo={showInfo}/>
            <Container>
            <h3>Add Item</h3>
            { name !== '' && customMode === false ? <IconButton Icon={GoSearch} onClick={onSelectNew} position='right'/> : null }
            </Container>
            { name === '' && customMode === false ? <InputSuggest type="name" placeholder="Search" value={nameSuggest} onChange={(e) => setNameSuggest(e.target.value)} onClickSuggestion={onClickSuggestion}/> : null }
            { name === '' && customMode === false ? <div><Input as='button' onClick={() => setCustomMode(true)} width='150px'>Custom</Input><br/><br/></div> : null }
            { isWeapon ? getWeaponLayout() : null }
            { type === 'Grenade' ? getGrenadeLayout() : null }
            { type === 'Shield' ? getShieldLayout() : null }
            { type === 'Class Mod' ? getModLayout() : null }
            { type === 'Artifact' ? getArtifactLayout() : null }
            { type === '' && customMode ? getBasicLayout() : null }
            <Input as='button' onClick={onBack} width='150px'>Cancel</Input> { name.length > 0 && type.length > 0 ? <Input as='button' onClick={onClickAdd} width='150px'>Add</Input> : null }
        </div>
    );
};

export default AddItemPage;