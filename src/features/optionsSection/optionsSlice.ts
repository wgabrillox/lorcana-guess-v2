import { createSlice, createSelector } from "@reduxjs/toolkit";
import { OptionsSliceState } from "../../types";
import { RootState } from "../../app/store";
import { Set } from "../../types";
import { Attributes } from "./attributeSection/attributes";

const initialState: OptionsSliceState = {
  sets: {},
  colors: {},
  types: {},
  attributes: {},
};

const optionsSlice = createSlice({
  name: "options",
  initialState: initialState,
  reducers: {
    setSets: (state, action) => {
      const sets = action.payload.reduce(
        (acc: { [key: string]: Set }, curr: Set) => {
          return {
            ...acc,
            [curr.setId]: curr,
          };
        },
        {}
      );
      state.sets = sets;
    },
    selectSet: (state, action) => {
      state.sets = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setAttributes: (state, action) => {
      state.attributes = action.payload;
    },
    selectAttribute: (state, action) => {
      state.attributes = {
        ...state.attributes,
        ...action.payload,
      };
    },
  },
});

export const {
  setSets,
  selectSet,
  setColors,
  setTypes,
  setAttributes,
  selectAttribute,
} = optionsSlice.actions;
export const getSets = (state: RootState) => state.options.sets;
export const getColors = (state: RootState) => state.options.colors;
export const getTypes = (state: RootState) => state.options.types;
export const getFilters = createSelector(
  [getSets, getColors, getTypes],
  (sets, colors, types) => {
    return {
      set: sets,
      color: colors,
      type: types,
    };
  }
);
// export const getFilters = filters((state: RootState) => state);
export const getAttributes = (state: RootState) => state.options.attributes;
export const getSelectedAttributes = createSelector(
  [getAttributes],
  (attributes) =>
    Object.keys(attributes).reduce<{ [key: string]: any }>((acc, curr) => {
      let val = attributes[curr];
      return val ? { ...acc, [curr]: val } : acc;
    }, {})
);

export default optionsSlice.reducer;
