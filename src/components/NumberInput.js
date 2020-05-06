import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useMediaQuery } from 'react-responsive';

import Input from './Input';

const StyledComp = styled.div`
    display: inline-block;
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
        margin: 3px;
    }

    & > div.selected {
        background-color: #333;
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

const NumberInput = ({value, onChange, width='100%', suffix='', clearOnOpen=false}) => {
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

    const onClickNumber = (number) => () => {
        let newValue = value + '' + number;
        newValue = Number(newValue);
        onChange(newValue);
    }

    const onRemoveNumber = () => {
        let newValue = String(value).split('');
        newValue.pop();
        newValue = newValue.join('');
        newValue = Number(newValue);
        onChange(newValue);
    }

    const onCloseMenu = () => {
        setOpen(false);
    }

    return (
        <StyledComp width={width}>
        {
            isMobile 
                ? <Input as="button" className={open ? 'open' : ''} onClick={onClickInput}>{value+suffix}</Input> 
                : <Input className={open ? 'open' : ''} type="number" value={value} onChange={onChangeInput}/>
        }            
        {
            open ? (
                <StyledMenu ref={ref}>
                    <div><span>{value}</span></div>
                    <div onTouchStart={onClickNumber(1)}><span>1</span></div>
                    <div onTouchStart={onClickNumber(2)}><span>2</span></div>
                    <div onTouchStart={onClickNumber(3)}><span>3</span></div>
                    <div onTouchStart={onClickNumber(4)}><span>4</span></div>
                    <div onTouchStart={onClickNumber(5)}><span>5</span></div>
                    <div onTouchStart={onClickNumber(6)}><span>6</span></div>
                    <div onTouchStart={onClickNumber(7)}><span>7</span></div>
                    <div onTouchStart={onClickNumber(8)}><span>8</span></div>
                    <div onTouchStart={onClickNumber(9)}><span>9</span></div>
                    <div onTouchStart={onRemoveNumber}><span>{'<'}</span></div>
                    <div onTouchStart={onClickNumber(0)}><span>0</span></div>
                    <div onTouchStart={onCloseMenu}><span>X</span></div>
                </StyledMenu>
            ) : null
        }
        </StyledComp>
    );
}

export default NumberInput;