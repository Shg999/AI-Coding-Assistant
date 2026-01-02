import { GenerateRequest } from "@/src/types";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
const apiKey = process.env.GEMINI_API_KEY;
if(!apiKey){
    throw new Error("GEMINI API Key is not set in environment variables")
}
const genAI = new GoogleGenerativeAI(apiKey)

export const POST = async(req:NextRequest) => {
   try {
   const {description, language}: GenerateRequest = await req.json()
     if(!description){
        return NextResponse.json({error: "description is required"}, {status:400})
     }
     const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"})
     const prompt= `Generate ${language || "Javascript"} code for : ${description} \n\nCode `;
   
     const result = await model.generateContent(prompt)
     const response = await result.response;
     const generatedCode =response.text()

     return NextResponse.json({data: {generatedCode}},{status:200});
   } catch (error) {
      console.error("Error:", error)
      return NextResponse.json({error: "Failed to debugging suggestion"}, {status:500})
   }
}