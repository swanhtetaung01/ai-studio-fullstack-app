import React, { useState } from "react";
import { getChatResponse } from "../services/apiService";

function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatResponse, setChatResponse] = useState('');

    const askAI = async () => {
        if (!prompt.trim()) return;

        try {
            setLoading(true);
            setChatResponse('');
            const data = await getChatResponse(prompt);
            setChatResponse(data);
        } catch(error) {
            console.error("Error generating response: ", error);
            setChatResponse("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Talk to AI</h2>
            <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") askAI();
            }}
            placeholder="Enter a prompt to chat."
            />
            <button 
            onClick={askAI}
            disabled={loading}
            >{loading ? "Thinking..." : "Send"}</button>
            <div className="output">
                {loading ? (
                    <div className="spinner"></div>
                ) : (
                    <p>{chatResponse}</p>
                )}
            </div>
        </div>
    );
}

export default ChatComponent;