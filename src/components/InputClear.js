import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;

    & > input {
        text-align: center;
        margin-left: auto;
        border-radius: 0px;
    }

    & > div {
        display: inline-block;
        margin-right: auto;
    }

    & > div:hover {
        cursor: pointer;
    }

    & > * {
        background-color: white;
        color: black;
        border: 1px solid black;
        font-size: 1em;
        padding: 5px;
    }
`;

const Input = ({value, onChange, onClear}) => {
    return (
        <StyledComp>
            <input placeholder='Search' value={value} onChange={onChange}/>
            <div onClick={onClear}>Clear</div>
        </StyledComp>
    );
}

export default Input;