import styled from 'styled-components';

const Input = styled.input`
    border: 1px solid white;
    min-height: 30px;
    width: ${props => props.width || '100%'};
    font-size: 1em;
    background-color: white;
    text-align: center;

    &.open {
        border: 1px solid #07BDFB;
    }

    :focus {
        outline: none;
    }
`;

export default Input;