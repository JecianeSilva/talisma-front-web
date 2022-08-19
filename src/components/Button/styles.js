import styled from "styled-components";

export const ButtonContainer = styled.button`
  width: ${(props) => (props.width ? `${props.width}rem` : `${100}%`)};
  height: ${(props) =>
    props.disabled ? 2 : props.height ? props.height : 3}rem;
  border-radius: 2rem;
  background-color: ${(props) => (props.isGoBack ? "#8E8E8E" : "#264AA4")};
  color: #fff;
  border: none;

  font-size: ${(props) => (props.font ? props.font : 1.3)}rem;
  font-family: "Calibri", sans-serif;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: ${(props) => (props.disabled ? 0 : 1)}rem;
  cursor: pointer;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

  &.hasIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0;
  }

  svg.icon {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 8px;
  }

  /* div */
`;
