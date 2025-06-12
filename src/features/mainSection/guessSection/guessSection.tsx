import { useState } from "react";
import { Card } from "../../../types";
import Button from "@mui/material/Button";
import { AutocompleteComponent } from "./components/autocompleteComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  checkGuess,
  getGuessCount,
  toggleShowIncorrect,
  getShowIncorrect,
  toggleShowCard,
  getShowCard,
  resetGuessOptions,
} from "../mainSlice";
import { getSelectedAttributes } from "../../optionsSection/optionsSlice";
import { LeftColumn } from "./guessLeftColumn";
import { RightColumn } from "./guessRightColumn";

type Props = {
  selectedCard: Card;
  selectCard: () => void;
};

export const formLabelProps = {
  color: "text.primary",
  fontWeight: "bold",
};

export const GuessSection = (props: Props) => {
  const { selectedCard, selectCard } = props;
  const dispatch = useDispatch();

  let correctCount = useSelector(getGuessCount);
  const showCard = useSelector(getShowCard);
  let selectedAttributes = useSelector(getSelectedAttributes);
  let attributeCount = Object.keys(selectedAttributes).length;
  const [guessSubmitted, setGuessSubmitted] = useState<boolean>(false);
  const showIncorrect = useSelector(getShowIncorrect);

  const resetCardGuesses = () => {
    setGuessSubmitted(false);
    dispatch(resetGuessOptions());
    selectCard();
  };

  const isLocation = selectedCard.type === "Location";
  // const isLocation = false;

  return (
    <div className="sticky border-t lg:border-t-0 bottom-0 sm:bottom-auto sm:relative flex justify-center w-full md:w-fit z-[15] bg-white">
      <div
        className="p-2 h-fit w-full md:w-fit
      "
      >
        <div className="mb-2">
          <div className="flex flex-col py-1">
            <div className="flex">
              <AutocompleteComponent
                label="Name"
                id="card-name"
                width={{ xs: 1, sm: 1, md: 312 }}
                showIncorrect={showIncorrect}
                disabled={!selectedAttributes.name || showCard}
                styles="mr-2"
              />
              <AutocompleteComponent
                label="Type"
                id="card-type"
                width={{ xs: 1, sm: 1, md: 190 }}
                disabled={
                  selectedCard.type === "Location" ||
                  !selectedAttributes.type ||
                  showCard
                }
                showIncorrect={showIncorrect}
                disableOption={true}
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col flex-1 w-full mr-1">
                <LeftColumn
                  showCard={showCard}
                  selectedAttributes={selectedAttributes}
                  showIncorrect={showIncorrect}
                />
              </div>
              <div className="flex flex-1 flex-col align-center w-full">
                <RightColumn
                  showCard={showCard}
                  selectedAttributes={selectedAttributes}
                  showIncorrect={showIncorrect}
                />
              </div>
            </div>
          </div>
          <AutocompleteComponent
            label="Description"
            id="card-description"
            keyLabel="bodyText"
            width={1}
            showIncorrect={showIncorrect}
            disabled={!selectedAttributes.bodyText || showCard}
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1">
            <div className="flex-1 md:flex-none">
              <Button
                variant="contained"
                onClick={() => {
                  setGuessSubmitted(true);
                  dispatch(
                    checkGuess({
                      selectedCard,
                      selectedAttributes,
                    })
                  );
                }}
                disabled={showCard}
              >
                Submit
              </Button>
            </div>
            {guessSubmitted && (
              <div className="font-bold my-2 sm:flex-none md:flex-1 ml-2">
                Correct: {correctCount}/{attributeCount}
              </div>
            )}
          </div>
          <div>
            {showCard ? (
              <Button
                variant="contained"
                onClick={() => resetCardGuesses()}
                sx={{
                  marginTop: { xs: 0.5, sm: 0.5, md: 0 },
                }}
              >
                Change Card
              </Button>
            ) : (
              guessSubmitted && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => dispatch(toggleShowIncorrect())}
                    disabled={showCard}
                    sx={{
                      marginRight: 1,
                    }}
                  >
                    {!showIncorrect ? "Show " : "Hide "}
                    Incorrect
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      dispatch(toggleShowCard(true));
                    }}
                  >
                    Show Card
                  </Button>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
