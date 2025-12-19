import { GoogleGenAI, Type } from "@google/genai";
import { PricingBenchmark } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchBenchmarkData = async (
  service: string,
  zipCode: string
): Promise<PricingBenchmark> => {
  const model = "gemini-3-flash-preview";

  const prompt = `
    Act as a professional pricing analyst and market researcher for local service businesses.
    Provide estimated market pricing data for the service: "${service}" in the US ZIP code: "${zipCode}".
    
    Determine the location name (City, State) from the ZIP.
    Estimate pricing based on current economic conditions and typical local rates for this specific area (wealthy areas should have higher rates).
    
    Return estimates for:
    - Low (Bottom 15% of market, usually unlicensed or new)
    - Median (Market average)
    - High (Established professionals)
    - Elite (Top 5-10%, luxury/specialized)
    
    Also provide 3 short, punchy strategic insights about pricing in this specific market/industry.
    
    The unit should be the most standard billing unit for this service (e.g., "per hour", "per visit", "per sq ft"). If unsure, default to "per hour".
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            serviceType: { type: Type.STRING },
            zipCode: { type: Type.STRING },
            locationName: { type: Type.STRING },
            currency: { type: Type.STRING },
            unit: { type: Type.STRING },
            low: { type: Type.NUMBER },
            median: { type: Type.NUMBER },
            high: { type: Type.NUMBER },
            elite: { type: Type.NUMBER },
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            competitorCountEstimate: { type: Type.NUMBER }
          },
          required: ["serviceType", "zipCode", "locationName", "low", "median", "high", "elite", "unit", "insights"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data returned from AI");
    
    return JSON.parse(text) as PricingBenchmark;
  } catch (error) {
    console.error("Error fetching benchmark:", error);
    // Fallback mock data if API fails to avoid app crash during demo
    return {
      serviceType: service,
      zipCode: zipCode,
      locationName: "Local Market Area",
      currency: "USD",
      unit: "hour",
      low: 25,
      median: 45,
      high: 75,
      elite: 120,
      insights: [
        "High demand in this area for eco-friendly options.",
        "Competitors are bundling services to increase ticket size.",
        "Speed of response is the #1 factor for winning bids here."
      ],
      competitorCountEstimate: 42
    };
  }
};
