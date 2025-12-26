
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ResearchResult, ImageSize } from "../types";

// Helper to get fresh AI instance right before API calls to ensure it uses the latest process.env.API_KEY
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const performMarketResearch = async (query: string): Promise<ResearchResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Conduct a detailed industrial design market research for: ${query}. 
    Focus on current trends, user needs, material innovations, and competitors.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return {
    text: response.text || "No analysis generated.",
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const analyzeSketch = async (base64Image: string): Promise<string> => {
  const ai = getAI();
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image.split(',')[1],
    },
  };
  const textPart = {
    text: "Analyze this industrial design sketch. Describe its form, function, and target aesthetic in detail so it can be rendered accurately."
  };
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [imagePart, textPart] },
  });

  return response.text || "";
};

/**
 * Fix: Added imageSize parameter to match the call in StoryboardGenerator.
 * Automatically selects the appropriate model based on resolution requirements.
 */
export const generateDesignVisual = async (
  prompt: string, 
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" = "1:1",
  base64Image?: string,
  imageSize: ImageSize = '1K'
): Promise<string> => {
  const ai = getAI();
  
  // Use gemini-3-pro-image-preview for high quality images (2K/4K).
  // This model requires the user to have selected an API key via window.aistudio.openSelectKey().
  const isHighQuality = imageSize === '2K' || imageSize === '4K';
  const modelName = isHighQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  
  const contents: any = {
    parts: [{ text: prompt }]
  };

  if (base64Image) {
    contents.parts.unshift({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image.split(',')[1]
      }
    });
  }

  const response = await ai.models.generateContent({
    model: modelName,
    contents,
    config: {
      imageConfig: {
        aspectRatio,
        // imageSize is only supported for gemini-3-pro-image-preview.
        ...(isHighQuality ? { imageSize } : {})
      }
    }
  });

  let imageUrl = '';
  // Guidelines: Iterate through candidates and parts to find the image part.
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  }
  
  if (!imageUrl) throw new Error("Image generation failed");
  return imageUrl;
};
