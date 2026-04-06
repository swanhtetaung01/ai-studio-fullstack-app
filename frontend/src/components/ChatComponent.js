import React, { useState } from "react";
import { getChatResponse } from "../services/apiService";

function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');

    const askAI = async () => {
        try {
            const data = await getChatResponse(prompt);
            setChatResponse(data);
        } catch(error) {
            console.error("Error generating response: ", error);
        }
    }

    return (
        <div>
            <h2>Talk to AI</h2>
            <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt to chat."
            />
            <button onClick={askAI}>Send</button>
            <div className="output">
                <p>{chatResponse}</p>
            </div>
        </div>
    );
}

export default ChatComponent;