import { createSlice, createSelector } from "@reduxjs/toolkit";
import { MainSliceState, CardOptions, Card } from "../../types";
import { RootState } from "../../app/store";

const defaultGuessOptions = {
  inkable: true,
  cost: 1,
  type: "",
  strength: 0,
  willpower: 1,
  color: ["amber"],
  name: "",
  bodyText: "",
  lore: 0,
  moveCost: 0,
  showIncorrect: false,
  incorrectGuesses: {},
};

const defaultCardOptions: CardOptions = {
  type: [],
  color: [],
  name: [],
  bodyText: [],
};

const initialState: MainSliceState = {
  cards: [],
  cardOptions: defaultCardOptions,
  guessCount: 0,
  showIncorrect: false,
  incorrectGuesses: {},
  showCard: false,
  //Guess Values
  inkable: true,
  cost: 1,
  type: "",
  strength: 0,
  willpower: 1,
  color: ["amber"],
  name: "",
  bodyText: "",
  lore: 0,
  moveCost: 1,
  //Temp Guess Value
  isDual: false,
};

const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    resetGuessOptions: (state) => {
      state = {
        ...state,
        ...defaultGuessOptions,
        showIncorrect: false,
        incorrectGuesses: {},
        showCard: false,
        isDual: false,
      };
      return state;
    },
    setCardOptions: (state, action) => {
      state.cardOptions = action.payload;
    },
    setGuessOptions: (state, action) => {
      const {
        optionKey,
        value,
      }: { optionKey: string; value: string | string[] } = action.payload;
      state[optionKey] = value;
    },
    toggleShowIncorrect: (state) => {
      state.showIncorrect = !state.showIncorrect;
      return state;
    },
    checkGuess: (state, action) => {
      const { selectedCard, selectedAttributes } = action.payload;
      // const selectedAttributes = state.options.attributes;
      // console.log("selectedAttributes", selectedAttributes);
      const guesses = Object.keys(defaultGuessOptions).reduce<MainSliceState>(
        (acc, curr) => ({
          ...acc,
          [curr]:
            typeof state[curr] === "object" ? [...state[curr]] : state[curr],
        }),
        <MainSliceState>{}
      );
      const compareCount = Object.keys(guesses).reduce<{ [key: string]: any }>(
        (acc, curr) => {
          if (curr === "color" && selectedAttributes[curr]) {
            let guess = guesses[curr].join();
            let selected = selectedCard[curr].toLowerCase().replace(" ", "");
            if (guess === selected) {
              acc.correctCount++;
            } else {
              acc.incorrectGuesses[curr] = true;
            }
          } else if (selectedAttributes[curr]) {
            if (selectedCard[curr] !== undefined) {
              if (guesses[curr] === selectedCard[curr]) {
                acc.correctCount++;
              } else {
                acc.incorrectGuesses[curr] = true;
              }
            } else {
              acc.correctCount++;
            }
          }
          return acc;
        },
        {
          correctCount: 0,
          incorrectGuesses: {},
        }
      );
      state.guessCount = compareCount.correctCount++;
      state.incorrectGuesses = compareCount.incorrectGuesses;
      if (Object.keys(compareCount.incorrectGuesses).length === 0) {
        state.showCard = true;
      }
    },
    setDefaults: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    toggleShowCard: (state, action) => {
      const showCardState = action.payload;
      state.showCard = showCardState;
      return state;
    },
  },
});

export const {
  setCards,
  setGuessOptions,
  setCardOptions,
  checkGuess,
  resetGuessOptions,
  toggleShowIncorrect,
  setDefaults,
  toggleShowCard,
} = mainSlice.actions;
export const getCards = (state: RootState) => state.main.cards;
export const getCardOptions = (state: RootState) => state.main.cardOptions;
export const getGuessValue = (state: RootState, key: string | string[]) => {
  if (typeof key === "string") {
    return state.main[key];
  } else {
    // const results = key.map((keyStr) => state.main[keyStr]);
    const results = key.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: state.main[curr],
      }),
      {}
    );
    return results;
  }
};
export const getColor = (state: RootState) => state.main.color;
export const getDual = (state: RootState) => state.main.isDual;
export const getType = (state: RootState) => state.main.type;
export const getStrength = (state: RootState) => state.main.strength;
export const getWillpower = (state: RootState) => state.main.willpower;
export const getName = (state: RootState) => state.main.name;
export const getMoveCost = (state: RootState) => state.main.moveCost;
export const getInkable = (state: RootState) => state.main.inkable;
export const getCost = (state: RootState) => state.main.cost;
export const getBodyText = (state: RootState) => state.main.bodyText;
export const getLore = (state: RootState) => state.main.lore;
export const getGuessCount = (state: RootState) => state.main.guessCount;
export const getShowIncorrect = (state: RootState) => state.main.showIncorrect;
export const getIncorrectGuesses = (state: RootState) =>
  state.main.incorrectGuesses;
export const getShowCard = (state: RootState) => state.main.showCard;
export default mainSlice.reducer;
