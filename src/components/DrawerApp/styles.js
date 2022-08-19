import styled from "styled-components";
import { List } from "@material-ui/core";

export const ListContainer = styled(List)`
  span {
    flex: 1;
    font-family: "Calibri";
    font-style: normal;
    margin-left: 16px;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    color: #8c8c8c;
  }
  svg {
    fill: #8c8c8c;
  }

  a.Mui-selected {
    span {
      color: #70163a;
      font-weight: bold;
    }
    svg {
      fill: #70163a;
    }
    transition: color 0.2s;
    transition: fill 0.2s;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px 0px 10px;
`;

export const Logo = styled.img`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
