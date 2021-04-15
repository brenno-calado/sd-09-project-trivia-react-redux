import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const ScoreContainer = styled.section`
  display: grid;
  margin: 2rem;

  p {
    margin-bottom: .5rem;
  }
  
`;

export const GravatarImage = styled.img`
  border-radius: 15rem;
`;

export const ButtonsAnswersContainer = styled.section`
  display: flex;
  min-width: 50%;
  max-width: 50%;
  flex-direction: column;
  justify-content: space-around;
  background-color: #555;
  padding: 1rem;

   @media screen and (max-width: 800px) {
    max-width: none;
  }
`;

export const ButtonAnswer = styled.button`
    margin-bottom: 1rem;
    padding: 1rem;
    font-size: 1rem;
    outline: none;
    border-radius: 3rem;
    border: none;
    background: ${(props) => props.backgroundAnswer};
    transition: background .6s;
    cursor: pointer;

`;

export const FlexConteiner = styled.section`
  display: flex;
  justify-content: space-between;
  height: 100%;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const QuestionConteiner = styled.section`
  height: 70vh;
  position: relative;
`;

export const TopBar = styled.section`
  background-color: blueviolet;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Timer = styled.span`
    background: ${(props) => props.backgroundTimer};
    padding: 1rem;
    border-radius: 5rem;
    color: black;
    animation: ${(props) => props.animation} infinite 0.82s 
    cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transition: background .6s;

  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  @keyframes seila {
    from {
        opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const TextQuestion = styled.p`
  display: flex;
  margin-top: 5rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  min-height: 60%;
  max-height: 60%;
  text-align: center;
  font-size: 27px;
`;

export const NextButtonContainer = styled.section`
  background: ${(props) => props.background};
  position: absolute;
  width: 100%;
  height: 117%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.zIndex};

  button {
    margin-bottom: 1rem;
    padding: 1rem;
    margin: 3rem;
    font-size: 1rem;

  }
`;

export const DynamicBar = styled.div`
  height: .8rem;
  background: blue;
  width: ${(props) => props.porcentageBar};
  transition: 1s;
`;
