import { DebugRequest } from "@/src/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
const apiKey = process.env.GEMINI_API_KEY;
if(!apiKey){
    throw new Error("GEMINI API Key is not set in environment variables")
}
const genAI = new GoogleGenerativeAI(apiKey)

export const POST = async(req:NextRequest) => {
   try {
    const {code, error: errorMessage}: DebugRequest = await req.json()
     if(!code){
        return NextResponse.json({error: "Code is required"}, {status:400})
     }
     const model = genAI.getGenerativeModel({model: "gemini-2.5-flash",
      //  generationConfig: {
      //    maxOutputTokens:300,
      //    // temperature: 0.4
      // }
     })
     let prompt= `Please debug the following code: \n\n${code}\n\n`;
     if(errorMessage){
        prompt += `The error I am getting is : ${errorMessage}\n\n`
     }
     prompt += `Debugging suggestion: `;
     const result = await model.generateContent(prompt)
     const response = await result.response;
     const debugging=response.text()

     return NextResponse.json({data: {debugging}},{status:200});
   } catch {
      return NextResponse.json({error: "Failed to debugging suggestion"}, {status:500})
   }
}