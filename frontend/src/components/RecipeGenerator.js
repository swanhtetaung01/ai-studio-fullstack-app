import React, { useState } from "react";
import { generateRecipe } from "../services/apiService";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('any');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState('');

    const handleClick = async () => {
        if (!ingredients.trim()) return;

        try {
            setLoading(true);
            setRecipe('');
            const data = await generateRecipe(ingredients, cuisine, dietaryRestrictions);
            console.log(data);
            setRecipe(data);
        } catch (error) {
            console.error("Error generating recipe: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Generate Recipe</h2>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleClick();
                }}
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
            <button 
            onClick={handleClick}
            disabled={loading}
            >{loading ? "Cooking..." : "Generate Recipe"}</button>
            <div className="output">
                {loading ? (
                    <p>Cooking your recipe...</p>
                ) : (
                    <pre className="recipe-text">{recipe}</pre>
                )}
            </div>
        </div>
    );
}

export default RecipeGenerator;