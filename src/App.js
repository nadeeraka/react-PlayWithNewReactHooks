import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "dotenv/config";
import { ID, API_KEY } from "./dist/key";
import RecipeComponent from "./components/Recipe";
import axios from "axios";
import uuid from "uuid";

const App = () => {
  //${Input}
  const [recipe, setRecipe] = useState([]);
  const [Value, setValue] = useState("");
  const [Input, setInput] = useState("chicken");

  useEffect(() => {
    getData();
  }, [Input]);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onFourm = e => {
    e.preventDefault();
    const data = Value;
    setInput(data);
    setValue("");
  };

  const getData = async () => {
    const data = await axios.get(
      `https://api.edamam.com/search?q=${Input}&app_id=${ID}&app_key=${API_KEY}`
    );

    if (data.status === 200) {
      console.log(data);
      return setRecipe(data.data.hits);
    }
    alert("not found 404 !");
  };

  return (
    <div className="App">
      <h1> Recipes for the search </h1>
      <div className="form" onSubmit={onFourm}>
        <form>
          <input type="text" value={Value} onChange={e => onChange(e)} />
          <button type="submit">Search</button>
        </form>
      </div>
      <ul>
        {recipe.length > 0 &&
          recipe.map(res => (
            <li key={uuid()}>
              <RecipeComponent
                ng={res.recipe.ingredientLines}
                label={res.recipe.label}
                img={res.recipe.image}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
