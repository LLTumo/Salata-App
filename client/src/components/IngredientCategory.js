import React, { useState } from "react";
import Ingredient from "./Ingredient";
import { ChevronLeft } from "./Icons";

// TODO: fix toggling

const IngredientCategory = ({
  name,
  uid,
  ingredients,
  checkedIngredients,
  number,
  category,
  addIngredient,
  removeIngredient,
}) => {
  const [showContent, updateContent] = useState(number === 0 ? true : false);
  return (
    <div className="mt-5 mb-2">
      <h2
        className="text-xl mb-2 transition-all active:text-green-500 active:"
        onClick={() => {
          updateContent(!showContent);
        }}
      >
        <div
          className="inline-block transition-all duration-300 transform"
          style={{
            transform: showContent ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <ChevronLeft />
        </div>
        {name}
      </h2>

      <div
        className={`transition-opacity flex flex-wrap duration-1000 ${
          showContent ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        {ingredients.map((ingredient, index) => {
          return (
            <Ingredient
              key={uid + index}
              ingredient={ingredient}
              checked={checkedIngredients}
              updateIngredient={(id, selected) => {
                if (selected) addIngredient(id);
                else removeIngredient(id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IngredientCategory;
