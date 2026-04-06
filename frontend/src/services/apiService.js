import API_BASE_URL from "../config/api";

export const getChatResponse = async (prompt) => {
    const response = await fetch(`${API_BASE_URL}/ask-ai-options?prompt=${prompt}`)
    return response.text();
}

export const generateImage = async (prompt, quality, n) => {
    const response = await fetch(
        `${API_BASE_URL}/generate-image-options?prompt=${prompt}&quality=${quality}&N=${n}`
    );
    return response.json();
}

export const generateRecipe = async (ingredients, cuisine, dietaryRestrictions) => {
    const response = await fetch(
        `${API_BASE_URL}/generate-recipe?ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`
    )
    return response.text();
}