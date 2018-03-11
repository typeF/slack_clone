import React from 'react';
import styled from 'styled-components';

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = styled.li`
  align-items: center;
  background-color: #676066;
  border-radius: 11px;
  color: #fff;
  display: flex;
  font-size: 24px;
  height: 50px;
  justify-content: center;
  margin: auto;
  margin-bottom: 10px;
  width: 50px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const team = ({id, letter}) => (
  <TeamListItem key={`team-${id}`}>
    {letter}
  </TeamListItem>
);

export default ({teams}) => (
  <TeamWrapper>
    <TeamList>
      {teams.map(team)}
    </TeamList>
  </TeamWrapper>
);


