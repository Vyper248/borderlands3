import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useMediaQuery } from 'react-responsive';

import Input from './Input';

const StyledComp = styled.div`
    display: inline-block;
    min-height: 30px;
    width: ${props => props.width};
`;

const StyledMenu = styled.div`
    position: absolute;
    background-color: black;
    left: 0px;
    right: 0px;
    max-height: 300px;
    overflow: scroll;
    z-index: 5;
    padding-bottom: 50px;

    & > div:first-child {
        width: 200px;
        display: flex;
        margin: 5px auto;
    }

    & > div {
        border: 1px solid white;
        height: 35px;
        width: 30%;
        margin: 5px auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 3px;
    }

    & > div > span {
        width: 100%;
        text-align: center;
    }

    @media screen and (max-width: 700px) {
        bottom: 0px;
        border-top: 1px solid white;
    }
`;

const NumberInput = ({value, onChange, width='100%', suffix='', clearOnOpen=false, isFloat=false}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const isMobile = useMediaQuery({ maxWidth: 700 });

    useOnclickOutside(ref, () => {
        setTimeout(() => {
            setOpen(false);
        }, 200);
    });

    const onClickInput = () => {
        if (clearOnOpen) onChange(0);
        setOpen(!open);
    }

    const onChangeInput = (e) => {        
        onChange(e.target.value);
    }

    const onClickNumber = (number) => (e) => {
        e.preventDefault();
        let newValue = value + '' + number;
        if (number !== '.') newValue = parseFloat(newValue);
        onChange(newValue);
    }

    const onRemoveNumber = (e) => {
        e.preventDefault();
        let newValue = String(value).split('');
        newValue.pop();
        newValue = newValue.join('');
        newValue = parseFloat(newValue);
        onChange(newValue);
    }

    const onCloseMenu = (e) => {
        e.preventDefault();
        setOpen(false);
    }

    return (
        <StyledComp width={width}>
        {
            isMobile 
                ? <Input as="div" className={open ? 'open' : ''} onClick={onClickInput}>{value+suffix}</Input> 
                : <Input className={open ? 'open' : ''} type="number" value={value} onChange={onChangeInput}/>
        }            
        {
            open ? (
                <StyledMenu ref={ref}>
                    <div><span>{value}</span></div>
                    <div onTouchStart={onClickNumber(1)}>1</div>
                    <div onTouchStart={onClickNumber(2)}>2</div>
                    <div onTouchStart={onClickNumber(3)}>3</div>
                    <div onTouchStart={onClickNumber(4)}>4</div>
                    <div onTouchStart={onClickNumber(5)}>5</div>
                    <div onTouchStart={onClickNumber(6)}>6</div>
                    <div onTouchStart={onClickNumber(7)}>7</div>
                    <div onTouchStart={onClickNumber(8)}>8</div>
                    <div onTouchStart={onClickNumber(9)}>9</div>
                    <div onTouchStart={onRemoveNumber}>{'<'}</div>
                    <div onTouchStart={onClickNumber(0)}>0</div>
                    { isFloat ? <div onTouchStart={onClickNumber('.')}>.</div> : null }
                    <div onTouchEnd={onCloseMenu}>Done</div>
                </StyledMenu>
            ) : null
        }
        </StyledComp>
    );
}

export default NumberInput;