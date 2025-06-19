import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    
    const { conversation } = await req.json();
    const FINAL_PROMPT1 = FEEDBACK_PROMPT.replace("{{conversation}}", JSON.stringify(conversation));
    console.log(process.env.OPEN_ROUTER_API_KEY);
    try{
    
        const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY1,
      
    })
    const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          { role: "user", content: FINAL_PROMPT1 }
        ],
        
      })
      console.log(completion.choices[0].message)
      return NextResponse.json(completion.choices[0].message)
    }
    catch(e){
        console.log(e)
        return NextResponse.json(e)
    }   
    

}