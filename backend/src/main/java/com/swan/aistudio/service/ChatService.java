package com.swan.aistudio.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class ChatService {
    private final ChatModel chatModel;

    public ChatService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String getResponse(String prompt) {
        return chatModel.call(prompt);
    }

    public String getResponseOptions(String prompt) {
        ChatResponse response =  chatModel.call(
                new Prompt(
                        prompt,
                        OpenAiChatOptions.builder()
                                .temperature(0.4)
                                .maxTokens(30)
                                .build()
                ));
        return Objects.requireNonNull(response.getResult()).getOutput().getText();
    }
}
