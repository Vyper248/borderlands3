import styled from 'styled-components';

const ItemPageContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: black;
    overflow: scroll;
    z-index: 6;

    & h3, & h4 {
        margin: 10px;
    }
`;

export default ItemPageContainer;