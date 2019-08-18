import styled from 'styled-components';

export const StyledCell = styled.div`
  width: auto;
  background: rgba(${props => props.color}, 0.8);
  border: ${props => (props.type === 0 ? '0px solid' : '4px solid')}; //if we have no tetrominos on the cell it equals 0 if yes 4px
  border-bottom-color: rgba(${props => props.color}, 0.1); //these props makes shadows on tetrominos and cell
  border-right-color: rgba(${props => props.color}, 1);
  border-top-color: rgba(${props => props.color}, 1);
  border-left-color: rgba(${props => props.color}, 0.3);
`;