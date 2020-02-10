import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export const Main = styled.div` 
  background-color: black;
  display: flex;
  flex-direction: column; 
  font-family: monospace;
  height: 100%;
  margin: 0;
  width: 100%;

  @media (max-width: 610px) {
    width: max-content;

  }
`

export const TopBar = styled.div` 
  margin-left: auto;
  padding: 10px 10px 0 0;
`

export const Game = styled.div`
  align-self: center;
`

export const Board = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 600px;
  justify-content: flex-start;
  padding: 5% 0;
  width: 600px;
`
  
export const Square = styled.button`
  align-items: center;
  background-color: ${({ isOccupied }) => isOccupied ? 'red' : 'black'};
  border: 5px solid white;
  box-sizing: border-box;
  color: ${({ isWinning }) => isWinning ? 'green' : 'white'};
  display: flex;
  flex-direction: column;
  font-family: monospace;
  font-size: 5em;
  height: 200px;
  justify-content: center;
  position: relative;
  width: 200px;

    &:hover {
      cursor: pointer;
    }
`

export const ResetButton  = styled.button`
  align-items: center;
  background-color: #2080E4;
  border-radius: 3px;
  border: 2px solid #2080E4;
  display: flex;
  font-family: monospace;
  font-size: 25px;
  height: 60px;
  justify-content: center;
  width: 120px;

  &:active {
    background-color: blue;
    border: 2px solid blue;
  }

  &:focus {
    outline: none;
  }
`

export const Timer = styled.div`
  bottom: 0;
  color: white;
  font-family: monospace;
  font-size: 14px;
  padding: 5%;
  position: absolute;
  right: 0;
`;

export const BottomBar = styled.div`
  align-self: center;
  color: white;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  padding-bottom: 5%;
  text-transform: uppercase;
`;

export const ComputerContainer = styled.div`

`

export const PlayerContainer = styled.div`
  margin-right: 200px;
`;
