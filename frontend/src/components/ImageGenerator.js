import React, { useState } from "react";
import { generateImage } from "../services/apiService";

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [quality, setQuality] = useState('low');
    const [n, setN] = useState('1');
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (!prompt.trim()) return;
        try {
            setLoading(true);
            const urls = await generateImage(prompt, quality, n);
            setImageUrls(urls);
        } catch (error) {
            console.error("Error generating image: ", error);
        } finally {
            setLoading(false);
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
                min="1"
                max="2" 
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
            <button 
            onClick={handleClick}
            disabled={loading}
            >{loading ? "Generating..." : "Generate Image"}</button>
            <div className="image-grid">
                {loading ? (
                    [...Array(4)].map((_, index) => (
                        <div key={index} className="loading-slot">
                            <div className="spinner"></div>
                        </div>
                    ))
                ) : (
                    <>
                        {imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Generated ${index}`}/>
                        ))}
                        {[...Array(4 - imageUrls.length)].map((_, index) => (
                            <div key={index + imageUrls.length}
                            className="empty-image-slot"></div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default ImageGenerator;