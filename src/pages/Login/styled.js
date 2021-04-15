import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 300px;
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0px 5px 16px 10px rgba(0, 0, 0, .4);
  position: absolute;


  input {
  outline: none;
    margin-left: 5px;
    padding: 5px;

    &:focus{
      border: 2px solid #00BFFF;
    }
  }
`;

export const ButtonsContainer = styled.section`
  display: flex;
  justify-content: space-around;
  width: 90%;

  button{
    padding: 12px;
  }
  `;

export const AnimationContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #555;
  width: 100%;
  height: 100vh;
  animation: ${(props) => props.animation} 1s;

   @keyframes slide {
     from {
       transform: translateX(0%);
     }
     to {
      transform: translateX(100%);
     }
   }
  `;
