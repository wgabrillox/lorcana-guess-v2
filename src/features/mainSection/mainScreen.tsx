import { CardContainer } from "./cardSection/card";
// import { GuessSection } from "./guessSection/guessSection";
import { GuessSection } from "./guessSection/guessSection";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Card } from "../../types";
import { getFilters, getAttributes } from "../optionsSection/optionsSlice";
import { getCards, resetGuessOptions, setDefaults } from "./mainSlice";
import { useSelector, useDispatch } from "react-redux";
type MainProps = {
  setShowGame: () => void;
};

export const MainScreen = (props: MainProps) => {
  const { setShowGame } = props;
  const [selectedCard, setSelectedCard] = useState<Card>();
  const [isCardSelected, setIsCardSelected] = useState(false);
  const dispatch = useDispatch();
  const cards = useSelector(getCards);
  const filters = useSelector(getFilters);
  const attributes = useSelector(getAttributes);

  const selectCard = () => {
    const filteredCards = cards.filter((card: Card) => {
      const setSelected = filters.set[card.setId].selected;

      const colors = card.color.split(",");
      const colorSelected =
        colors.length === 1
          ? filters.color[colors[0].toLowerCase()].selected
          : filters.color.dual.selected;

      const isSong = card.type === "Action - Song";
      const typeSelected = isSong
        ? filters.type["Song"].selected
        : filters.type[card.type].selected;

      if (setSelected && colorSelected && typeSelected) {
        return card;
      }
    });
    const randomCard =
      filteredCards[Math.floor(Math.random() * filteredCards.length)];
    setSelectedCard(randomCard);

    let defaultVals = Object.keys(attributes).reduce<{ [key: string]: any }>(
      (acc, curr) => {
        if (!attributes[curr]) {
          acc =
            curr === "color"
              ? {
                  ...acc,
                  [curr]: randomCard[curr]
                    .split(",")
                    .map((color) => color.toLowerCase().trim()),
                }
              : { ...acc, [curr]: randomCard[curr] };
        }
        return acc;
      },
      {}
    );

    if (randomCard.type === "Location") {
      defaultVals.type = "Location";
    }

    setIsCardSelected(true);
    dispatch(setDefaults(defaultVals));
  };

  if (!isCardSelected) {
    selectCard();
  }

  return (
    <div className="relative h-screen content-center flex flex-col lg:flex-row items-center">
      <div className="fixed top-0 right-0 z-10 mt-2 mr-2">
        <Button
          variant="contained"
          onClick={() => {
            setShowGame();
            dispatch(resetGuessOptions());
          }}
        >
          Back
        </Button>
      </div>
      <CardContainer selectedCard={selectedCard} />
      <GuessSection selectedCard={selectedCard} selectCard={selectCard} />
    </div>
  );
};
