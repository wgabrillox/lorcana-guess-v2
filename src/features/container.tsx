import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCards } from "./mainSection/mainSlice";
import { lowercase } from "../utils/lowercase.js";
import { OptionsScreen } from "./optionsSection/optionsScreen";
import { MainScreen } from "./mainSection/mainScreen";
import { CardOptions, Card } from "../types";
import { setCardOptions } from "./mainSection/mainSlice";

export default function () {
  const dispatch = useDispatch();
  const [showGame, setShowGame] = useState(false);

  const fetchCards = async () => {
    try {
      const response = await fetch("https://api.lorcana-api.com/bulk/cards");
      if (response.ok) {
        const baseCards = await response.json();
        const cards = baseCards.map(lowercase);
        dispatch(setCards(cards));

        let cardTypes: string[] = [];
        const cardOptions = cards.reduce(
          (acc: CardOptions, card: Card) => {
            const { type, name, bodyText } = card;
            if (!cardTypes.includes(type)) {
              cardTypes = [...cardTypes, type];
              acc["type"] = [...acc["type"], { value: type, label: type }];
            }

            acc["name"] = [...acc["name"], { value: name, label: name }];
            acc["bodyText"] = bodyText
              ? [...acc["bodyText"], { value: bodyText, label: bodyText }]
              : acc["bodyText"];
            return acc;
          },
          {
            type: [],
            color: [
              { value: "Amber", label: "Amber" },
              { value: "Amethyst", label: "Amethyst" },
              { value: "Emerald", label: "Emerald" },
              { value: "Ruby", label: "Ruby" },
              { value: "Sapphire", label: "Sapphire" },
              { value: "Steel", label: "Steel" },
              { value: "Dual", label: "Dual" },
            ],
            name: [],
            bodyText: [],
          }
        );

        dispatch(setCardOptions(cardOptions));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    ///h-dvh
    <div className="w-full xl:w-10/12 mx-auto overflow-auto">
      {!showGame ? (
        <OptionsScreen setShowGame={() => setShowGame(true)} />
      ) : (
        <MainScreen setShowGame={() => setShowGame(false)} />
      )}
    </div>
  );
}
