package com.swan.aistudio.controller;

import com.swan.aistudio.service.ChatService;
import com.swan.aistudio.service.ImageService;
import com.swan.aistudio.service.RecipeService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
public class GenAIController {

    private final ChatService chatService;

    private final ImageService imageService;

    private final RecipeService recipeService;

    public GenAIController(ChatService chatService, ImageService imageService, RecipeService recipeService) {
        this.chatService = chatService;
        this.imageService = imageService;
        this.recipeService = recipeService;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt) {
        return chatService.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt) {
        return chatService.getResponseOptions(prompt);
    }

    @GetMapping("generate-image")
    public void generateImage(HttpServletResponse response, @RequestParam String prompt) throws IOException {

        ImageResponse imageResponse = imageService.generateImage(prompt);

        String imageUrl = Objects.requireNonNull(imageResponse.getResult()).getOutput().getUrl();
        response.sendRedirect(imageUrl);
    }

    @GetMapping("generate-image-options")
    public List<String> generateImageOptions(@RequestParam String prompt,
                                             @RequestParam(defaultValue = "low") String quality,
                                             @RequestParam(defaultValue = "1") int N,
                                             @RequestParam(defaultValue = "1024") int width,
                                             @RequestParam(defaultValue = "1024") int height) {

        ImageResponse imageResponse = imageService.generateImageOptions(prompt, quality, N, width, height);

        return imageResponse.getResults().stream()
                .map(result -> "data:image/png;base64," + result.getOutput().getB64Json())
                .toList();
    }

//    For Testing Purpose
//    @GetMapping(value = "generate-image-options", produces = "image/png")
//    public byte[] generateImageOptions(@RequestParam String prompt) {
//
//        ImageResponse imageResponse = imageService.generateImageOptions(prompt);
//
//        String base64 = imageResponse.getResults().get(0).getOutput().getB64Json();
//
//        return Base64.getDecoder().decode(base64);
//    }

    @GetMapping("generate-recipe")
    public String generateRecipe(@RequestParam String ingredients,
                                       @RequestParam (defaultValue = "any") String cuisine,
                                       @RequestParam (defaultValue = "none") String dietaryRestrictions) {
        return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
    }
}
