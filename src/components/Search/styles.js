import styled from "styled-components";

export const Container = styled("div")(({ theme }) => ({   
  ".MuiInputBase-root": {
    color: '#8c8c8c',
    minWidth: '400px',
    borderRadius: '24px',
    border: 'none',
    backgroundColor: '#FFFFFF',
  },

  ".MuiPaper-root, .MuiAutocomplete-paper":{
    backgroundColor: '#FFFFFF',
  },

  '.MuiOutlinedInput-input': {
    padding:' 15.5px 14px 15.5px 0px',
  },
  '.MuiOutlinedInput-input::placeholder': {
    color: '#000',
  },
  '.MuiInputAdornment-positionStart': {
    margin: 0,
  },
  '.MuiOutlinedInput-adornedStart': {
    padding: 0
  }
}))