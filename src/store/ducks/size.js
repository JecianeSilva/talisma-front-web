import { createActions, createReducer } from "reduxsauce";
import uuid from 'react-uuid';

export const { Types, Creators } = createActions({
  addSize: ["description"],
  removeSize:['id']
});

const INITIAL_STATE = {
  size: [],
};

const addSize = (state = INITIAL_STATE, action) => {
    const item = {
        id: uuid(),
        description: action.description,
        tam: 0,
        status: true
    };
  return {
    size: [...state.size, item],
  };
};

const removeSize = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    size: state.size.filter((item) => item.id !== action.id)
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_SIZE]: addSize,
  [Types.REMOVE_SIZE]: removeSize,
});