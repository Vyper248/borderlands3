import styled from 'styled-components';

const Input = styled.input`
    border: 1px solid white;
    border-radius: 0;
    height: 100%;
    min-height: 30px;
    width: ${props => props.width || '100%'};
    font-size: 1em;
    background-color: black;
    color: white;
    text-align: center;
    -webkit-appearance: none;

    &.open {
        border: 1px solid #07BDFB;
    }

    :focus {
        outline: none;
    }

    @media screen and (max-width: 700px) {
        font-size: 0.8em;
    }
`;

export default Input;