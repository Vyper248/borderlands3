import styled from 'styled-components';

const Table = styled.table`
    margin: auto;
    border-collapse: collapse;
    width: 90%;
    max-width: 400px;
    margin-bottom: 10px;

    & td {
        border: 1px solid gray;
        padding: 5px;
    }

    & td:first-child {
        background-color: #333;
        width: ${props => props.col1Width ? props.col1Width : '100px'};
    }

    & td:last-child {
        background-color: black;
    }

    @media screen and (max-width: 700px) {
        & td {
            padding: 2px;
        }
    }
`;

export default Table;