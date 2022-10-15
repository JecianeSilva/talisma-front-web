import { TextField } from "@material-ui/core";
import styled from "styled-components";

export const ContentInput = styled(TextField)(({theme})=>({
  '.MuiOutlinedInput-input': {
    padding: '10px 14px',
  },
}))

