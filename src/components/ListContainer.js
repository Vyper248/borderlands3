import styled from 'styled-components';

const ListContainer = styled.div`
    height: 100vh;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    top: ${props => props.hide ? '-5000px' : '0px'};
`;

export default ListContainer;