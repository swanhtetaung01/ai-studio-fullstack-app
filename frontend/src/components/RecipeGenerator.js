import React, { useState } from "react";
import { generateRecipe } from "../services/apiService";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('any');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipe, setRecipe] = useState('');

    const handleClick = async () => {
        try {
            const data = await generateRecipe(ingredients, cuisine, dietaryRestrictions);
            console.log(data);
            setRecipe(data);
        } catch (error) {
            console.error("Error generating recipe: ", error);
        }
    }

    return (
        <div>
            <h2>Generate Recipe</h2>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients (comma seperated)"
            />
            <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Enter preferred cuisine type"
            />
            <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Enter dietary restrictions if any"
            />
            <button onClick={handleClick}>Generate</button>
            <div className="output">
                <pre className="recipe-text">{recipe}</pre>
            </div>
        </div>
    );
}

export default RecipeGenerator;