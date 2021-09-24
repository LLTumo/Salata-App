import React, { useState } from "react";

function Ingredient({ ingredient, checked, updateIngredient }) {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <div
        onClick={() => {
          setSelected(!selected);
          updateIngredient(ingredient.id, !selected);
        }}
        className={`inline-flex transition mr-2 duration-200 ease-in-out text-center flex-col rounded-xl border mb-2 px-3 py-2 mr-2 border-primary-myGreen  ${
          checked.indexOf(ingredient.id) > -1 &&
          "border-primary-myGreen bg-primary-itemsBg "
          }`}
      >
        <img
          src={`/static/${ingredient.category.category}/${ingredient.name}.png`}
          className="w-16 h-16 mx-auto"
          alt={ingredient.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/static/harvest.png";
          }}
        />

      </div>
      <p className="text-txtColor break-normal ml-3 w-16 text-center text-xs">{ingredient.name}</p>
    </div>
  );
}
export default Ingredient;
