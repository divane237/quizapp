import styled from "styled-components";

export const SettingContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  column-gap: 2rem;
`;

export const QuestionNumInput = styled.input`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  border: none;
  text-align: center;
  background-color: gray;
  color: black;
  font-weight: 900;
  font-size: medium;
  &:focus {
    outline-offset: 3px;
    outline: 2.5px solid skyblue;
  }
`;

export const SelectInput = styled.select`
  padding: 0.5rem 1rem;
  background-color: gray;
  color: black;
  border-radius: 99px;
  border: none;
  font-weight: 900;
  font-size: medium;
  &:focus {
    outline-offset: 3px;
    outline: 2.5px solid skyblue;
  }
`;

export const Option = styled.option`
  font-weight: 900;
`;
