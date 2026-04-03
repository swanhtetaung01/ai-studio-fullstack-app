import React, { useState } from "react";

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [quality, setQuality] = useState('low');
    const [n, setN] = useState('1');
    const [imageUrls, setImageUrls] = useState([]);

    const generateImage = async () => {
        try{
            const response = await fetch(`http://localhost:8080/generate-image-options?prompt=${prompt}&quality=${quality}&N=${n}`)
            const urls = await response.json();
            console.log(urls);
            setImageUrls(urls);
        } catch (error) {
            console.error("Error generating image: ", error)
        }
    };

    return (
        <div className="tab-content">
            <h2>Generate Image</h2>
            <input 
            type="text" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter desired details of the image"
            />
            <div className="option-container">
                <input 
                type="number" 
                class="number_images" 
                value={n} 
                onChange={(e) => setN(e.target.value)}/>
                <select 
                    name="quality"
                    value={quality} 
                    onChange={(e) => setQuality(e.target.value)} 
                    className="quality_choice">
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
            </div>
            <button onClick={generateImage}>Generate Image</button>
            <div className="image-grid">
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Generated ${index}`}/>
                ))}
                {[...Array(4 - imageUrls.length)].map((_, index) => (
                    <div key={index + imageUrls.length}
                    className="empty-image-slot"></div>
                ))}
            </div>
        </div>
    );
}

export default ImageGenerator;