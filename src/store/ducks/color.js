import { createActions, createReducer } from "reduxsauce";
import uuid from 'react-uuid';

export const { Types, Creators } = createActions({
  addColor: ["description"],
  removeColor:['id'],
  updateColor:["id","value"],
});

const INITIAL_STATE = {
  color: [],
  status: 0,
  id: ''
};

const addColor = (state = INITIAL_STATE, action) => {
    const item = {
        id: uuid(),
        description: action.description,
        tam: 0,
        status: true
    };
  return {
    color: [...state.color, item],
  };
};

const updateColor = (state = INITIAL_STATE, action) => {
  return {
      color: state.color.map(item => ({ ...item, tam: item.id === action.id ? action.value : action.tam}))
  };
}

const removeColor = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    color: state.color.filter((item) => item.id !== action.id)
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_COLOR]: addColor,
  [Types.REMOVE_COLOR]: removeColor,
  [Types.UPDATE_COLOR]: updateColor,
});