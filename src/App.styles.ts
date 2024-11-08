import styled, { createGlobalStyle } from "styled-components";

import BGImage from "./images/picture1.jpg";
import titleImage from "./images/cameroon-flag1.jpg";

export const GlobalStyle = createGlobalStyle`
html{
    height: 100%;
}

body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    place-content: center;
    user-select: none;
    height: 100dvh;
    width: 100vw;    
}

* {
    box-sizing: border-box;
    font-family: 'Raleway, sans-serif' ;
    margin: 0;
    padding: 0 ;
}

h1 {
  font-size: clamp(2rem, 2vw + 1.5rem, 3.5rem);
}
p {
  font-size: 1rem;
}
`;

// Container for the questions, make a blur effect

export const QuestionsContainer = styled.div`
  /*  */
  backdrop-filter: blur(35px);
  -webkit-backdrop-filter: blur(15px);
  padding: 4px 8px;
  color: whitesmoke;
`;

// Answers container

export const AnswersContainer = styled.div`
  /*  */

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  margin: 8px 4px;
`;

// Props for Answer buttons (for styling)

interface AnswerButtonProps {
  selected: boolean;
}

export const AnswerButton = styled.button<AnswerButtonProps>`
  background: ${(props) => (props.selected ? "green" : "#FFF")};
  color: black;
  margin: 10px 12px;
  padding: 0.4rem 0%.5;
  font-size: 1rem;
  word-spacing: 5px;
  letter-spacing: 1px;
  border: none;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    outline-offset: 1px;
    outline: 2.5px solid green;
  }
  &:focus {
    outline-offset: 1px;
    outline: 2.5px solid green;
  }
`;

export const Button = styled.button`
  background-color: gray;
  border: none;
  font-size: 1rem;
  border-radius: 16px;
  color: black;
  font-weight: 900;
  margin: 10px 12px;
  padding: 0.5rem 1rem;

  &:focus {
    outline-offset: 3px;
    outline: 2.5px solid skyblue;
  }
`;

// Container for Back, Next and Results

export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// Title

export const TitleWithBgImage = styled.h1`
  background-color: skyblue;
  background-image: url(${titleImage});
  background-repeat: no-repeat;
  background-size: cover;
  white-space: nowrap;

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(2rem, 2vw + 1.5rem, 3.5rem);
  text-align: center;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;

  padding: 4px 8px;
  margin-bottom: 12px;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: 600;
  word-spacing: 2px;
`;
